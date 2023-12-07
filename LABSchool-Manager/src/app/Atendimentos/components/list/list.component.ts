import { Component, OnInit } from '@angular/core';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { map } from 'rxjs/operators';
import { Atendimento } from '../../model/atendimento.moel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  atendimentos: Atendimento[] = [];
  paginatedAtendimentos: Atendimento[] = [];
  filtroDescricao: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  totalPages: number[] = [];
  loadingError: boolean = false;
  searchError: boolean = false;

  constructor(private atendimentoService: AtendimentoService) { }

  ngOnInit() {
    this.obterAtendimentos();
  }

  obterAtendimentos() {
    this.atendimentoService.getAtendimentos().pipe(
      map((atendimentos: Atendimento[]) => {
        if (this.filtroDescricao.trim() === '') {
          this.searchError = false;
          return atendimentos;
        } else {
          let filtered = atendimentos.filter(atendimento =>
            atendimento.descricao.toLowerCase().includes(this.filtroDescricao.trim().toLowerCase())
          );
          this.searchError = filtered.length === 0;
          return filtered;
        }
      })
    ).subscribe((atendimentos: Atendimento[]) => {
      this.atendimentos = atendimentos;
      this.totalItems = this.atendimentos.length;
      this.setTotalPages();
      this.paginateAtendimentos();
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

  paginateAtendimentos(): void {
    let startItem = (this.currentPage - 1) * this.itemsPerPage;
    let endItem = this.currentPage * this.itemsPerPage;
    this.paginatedAtendimentos = this.atendimentos.slice(startItem, endItem);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.paginateAtendimentos();
  }

  filtrarAtendimentos() {
    this.currentPage = 1;
    this.obterAtendimentos();
  }
}
