import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../../model/avaliacoes.model';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];
  paginatedAvaliacoes: Avaliacao[] = [];
  filtroTitulo: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  totalPages: number[] = [];
  loadingError: boolean = false;
  searchError: boolean = false;

  constructor(private avaliacoesService: AvaliacoesService) { }

  ngOnInit() {
    this.obterAvaliacoes();
  }

  obterAvaliacoes() {
    this.avaliacoesService.getAvaliacoes().pipe(
      map((avaliacoes: Avaliacao[]) => {
        if (this.filtroTitulo.trim() === '') {
          this.searchError = false;
          return avaliacoes;
        } else {
          let filtered = avaliacoes.filter(avaliacao =>
            avaliacao.titulo.toLowerCase().includes(this.filtroTitulo.trim().toLowerCase())
          );
          this.searchError = filtered.length === 0;
          return filtered;
        }
      })
    ).subscribe((avaliacoes: Avaliacao[]) => {
      this.avaliacoes = avaliacoes;
      this.totalItems = this.avaliacoes.length;
      this.setTotalPages();
      this.paginateAvaliacoes();
    }, err => {
      this.loadingError = true;
    });
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  setTotalPages(): void {
    let numPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.totalPages = Array.from({length: numPages}, (_, i) => i + 1);
  }

  paginateAvaliacoes(): void {
    let startItem = (this.currentPage - 1) * this.itemsPerPage;
    let endItem = this.currentPage * this.itemsPerPage;
    this.paginatedAvaliacoes = this.avaliacoes.slice(startItem, endItem);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.paginateAvaliacoes();
  }

  filtrarAvaliacoes() {
    this.currentPage = 1;
    this.obterAvaliacoes();
  }
}
