import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciciosService } from 'src/app/services/exercicios.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  exercicioForm: FormGroup;
  alunos: any[] = [{ id: '', nome: 'Selecione um aluno' }];
  professores: any[] = [{ id: '', nome: 'Selecione um professor' }];
  formError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private exerciciosService: ExerciciosService,
    private router: Router
  ) {
    this.exercicioForm = this.formBuilder.group({
      alunoId: ['', Validators.required],
      codigoProfessor: ['', Validators.required],
      dataConclusao: [this.getCurrentDate(), Validators.required],
      titulo: ['', Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      descricao: ['', Validators.required, Validators.minLength(15), Validators.maxLength(255)],
      materia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAlunos();
    this.getProfessores();
  }

  getAlunos(): void {
    this.exerciciosService.getAlunos().subscribe(
      (alunos: any[]) => {
        this.alunos = alunos;
      },
      (error: any) => {
        console.error('Erro ao obter a lista de alunos', error);
      }
    );
  }

  getProfessores(): void {
    this.exerciciosService.getProfessores().subscribe(
      (professores: any[]) => {
        this.professores = professores;
      },
      (error: any) => {
        console.error('Erro ao obter a lista de professores', error);
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    
    // Ajustar o fuso horário para UTC-3 (como exemplo)
    currentDate.setHours(currentDate.getHours() - 3);

    return currentDate.toISOString().split('T')[0];
  }

  salvarExercicio(): void {
    if (this.exercicioForm.invalid) {
      this.formError = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.formError = ''; // Reset the form error message before saving

    const exercicio = {
      alunoId: this.exercicioForm.get('alunoId')?.value,
      codigoProfessor: this.exercicioForm.get('codigoProfessor')?.value,
      dataConclusao: this.exercicioForm.get('dataConclusao')?.value,
      titulo: this.exercicioForm.get('titulo')?.value,
      descricao: this.exercicioForm.get('descricao')?.value,
      materia: this.exercicioForm.get('materia')?.value,
    };

    this.exerciciosService.createExercicio(exercicio).subscribe(
      () => {
        console.log('Exercício salvo com sucesso.');
        alert('Exercício salvo com sucesso.');
        this.exercicioForm.reset();
        this.router.navigate(['/exercicios/list']); 
      },
      (error: any) => {
        console.error('Erro ao salvar o exercício', error);
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.exercicioForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }

  // Implementação da função para verificar se um campo está válido
  isFieldValid(field: string): boolean {
    const formControl = this.exercicioForm.get(field);
    return formControl ? formControl.valid && (formControl.dirty || formControl.touched) : false;
  }
}
