import { Component, OnInit } from '@angular/core';
import { Exercicio } from '../../model/exercicios.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciciosService } from 'src/app/services/exercicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, throwError } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  exercicio: Exercicio = {
    id: undefined,
    titulo: '',
    descricao: '',
    materia: '',
    codigoProfessor: 0,
    alunoId: 0,
    dataConclusao: ''
  };
  
  alunos: any[] = [];
  professores: any[] = [];
  formInvalid: boolean = false;
  exercicioForm: FormGroup;

  constructor(
    private exercicioService: ExerciciosService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
) {
    this.exercicioForm = this.fb.group({});
}

  ngOnInit() {
    this.exercicioForm = this.fb.group({
        alunoId: [null, Validators.required],
        codigoProfessor: [null, Validators.required],
        titulo: ['', Validators.required, Validators.minLength(8), Validators.maxLength(64)],
        descricao: ['', Validators.required, Validators.minLength(15), Validators.maxLength(255)],
        materia: ['', Validators.required],
        dataConclusao: ['', Validators.required],  
    });
    //  forkJoin para fazer múltiplas requisições simultâneas.
    const exercicioId = +this.route.snapshot.params['id'];
    forkJoin([
        this.exercicioService.getAlunos(),
        this.exercicioService.getProfessores()
    ]).subscribe((results) => {
        this.alunos = results[0];
        this.professores = results[1];
        this.getExercicio(exercicioId);
    });
  }

  getExercicio(id: number): void {
    this.exercicioService.getExercicio(id).pipe(catchError(this.handleError)).subscribe(
        (response: any) => {
            if (response && response.exercicio) {
                const exercicio = response.exercicio;
                exercicio.dataConclusao = this.convertToDateInputFormat(exercicio.dataConclusao);
                this.exercicio = exercicio;

                this.exercicioForm.patchValue(exercicio);
            } else {
                console.error('Exercício não encontrado.');
            }
        },
        (error: any) => {
            console.error('Erro ao obter o exercício', error);
        }
    );
  }

  //  converter data no formato correto para o input.
  convertToDateInputFormat(dateStr: string): string {
    if (dateStr.includes('-')) {
        return dateStr;
    }
    const parts = dateStr.split('/');
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }

  salvarExercicio(): void {
    if (!this.exercicio.descricao || !this.exercicio.titulo || !this.exercicio.alunoId || !this.exercicio.codigoProfessor) {
        this.formInvalid = true;
        return;
    }
    
    if (this.exercicio.id === undefined) {
        console.error('ID da avaliação não definido.');
        return;
    }

    this.exercicioService.updateExercicio(this.exercicio.id, this.exercicio).subscribe(
        () => {
            console.log('Exercício atualizado com sucesso.');
            alert('Exercício atualizado com sucesso.');
            this.router.navigate(['/exercicios/list']);
        },
        (error: any) => {
            console.error('Erro ao atualizar a avaliação', error);
        }
    );
}

  deletarExercicio(): void {
    if (confirm('Tem certeza que deseja excluir este Exercício?')) {
      if (this.exercicio.id !== undefined) {
        this.exercicioService.deleteExercicio(this.exercicio.id).subscribe(
          () => {
            console.log('Exercício excluído com sucesso.');
            alert('Exercício excluído com sucesso.');
            this.router.navigate(['/exercicios/list']);
          },
          (error: any) => {
            console.error('Erro ao excluir o exercício', error);
          }
        );
      } else {
        console.error('ID do exercício é undefined.');
      }
    }
  }
  // Método de tratamento de erro nas requisições HTTP.
  handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(error);
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.exercicioForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }
}
