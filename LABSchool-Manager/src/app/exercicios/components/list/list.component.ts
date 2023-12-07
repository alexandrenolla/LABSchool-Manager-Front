import { Component, OnInit } from '@angular/core';
import { Exercicio } from '../../model/exercicios.model';
import { ExerciciosService } from 'src/app/services/exercicios.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  exercicios: Exercicio[] = [];
  paginatedExercicios: Exercicio[] = [];
  filtroTitulo: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  totalPages: number[] = [];
  loadingError: boolean = false;
  searchError: boolean = false;

  constructor(private exercicioService: ExerciciosService) { }

  ngOnInit() {
    this.obterExercicios();
  }

  obterExercicios() {
    this.exercicioService.getExercicios().pipe(
      map((exercicios: Exercicio[]) => {
        if (this.filtroTitulo.trim() === '') {
          this.searchError = false;
          return exercicios;
        } else {
          let filtered = exercicios.filter(exercicio =>
            exercicio.titulo.toLowerCase().includes(this.filtroTitulo.trim().toLowerCase())
          );
          this.searchError = filtered.length === 0;
          return filtered;
        }
      })
    ).subscribe((exercicios: Exercicio[]) => {
      this.exercicios = exercicios;
      this.totalItems = this.exercicios.length;
      this.setTotalPages();
      this.paginateExercicios();
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

  paginateExercicios(): void {
    let startItem = (this.currentPage - 1) * this.itemsPerPage;
    let endItem = this.currentPage * this.itemsPerPage;
    this.paginatedExercicios = this.exercicios.slice(startItem, endItem);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.paginateExercicios();
  }

  filtrarExercicios() {
    this.currentPage = 1;
    this.obterExercicios();
  }
}
