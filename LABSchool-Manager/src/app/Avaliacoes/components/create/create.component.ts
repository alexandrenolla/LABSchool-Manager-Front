import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  avaliacaoForm: FormGroup;
  alunos: any[] = [{ id: '', nome: 'Selecione um aluno' }];
  professores: any[] = [{ id: '', nome: 'Selecione um professor' }];
  formError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private avaliacoesService: AvaliacoesService,
    private router: Router
  ) {
    this.avaliacaoForm = this.formBuilder.group({
      alunoId: ['', Validators.required],
      codigoProfessor: ['', Validators.required],
      dataRealizacao: [this.getCurrentDate(), Validators.required],
      titulo: ['', Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      descricao: ['', Validators.required, Validators.minLength(15), Validators.maxLength(255)],
      materia: ['', Validators.required],
      pontuacaoMaxima: ['', Validators.required],
      nota: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAlunos();
    this.getProfessores();
  }

  getAlunos(): void {
    this.avaliacoesService.getAlunos().subscribe(
      (alunos: any[]) => {
        this.alunos = alunos;
      },
      (error: any) => {
        console.error('Erro ao obter a lista de alunos', error);
      }
    );
  }

  getProfessores(): void {
    this.avaliacoesService.getProfessores().subscribe(
      (professores: any[]) => {
        this.professores = professores;
      },
      (error: any) => {
        console.error('Erro ao obter a lista de pedagogos', error);
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    
    // Ajustar o fuso horário para UTC-3 (como exemplo)
    currentDate.setHours(currentDate.getHours() - 3);

    return currentDate.toISOString().split('T')[0];
  }

  salvarAvaliacao(): void {
    if (this.avaliacaoForm.invalid) {
      this.formError = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.formError = ''; // Reset the form error message before saving

    const avaliacao = {
      alunoId: this.avaliacaoForm.get('alunoId')?.value,
      codigoProfessor: this.avaliacaoForm.get('codigoProfessor')?.value,
      dataRealizacao: this.avaliacaoForm.get('dataRealizacao')?.value,
      titulo: this.avaliacaoForm.get('titulo')?.value,
      descricao: this.avaliacaoForm.get('descricao')?.value,
      materia: this.avaliacaoForm.get('materia')?.value,
      pontuacaoMaxima: this.avaliacaoForm.get('pontuacaoMaxima')?.value,
      nota: this.avaliacaoForm.get('nota')?.value
    };

    this.avaliacoesService.createAvaliacao(avaliacao).subscribe(
      () => {
        console.log('Avaliação salvo com sucesso.');
        alert('Avaliação salvo com sucesso.');
        this.avaliacaoForm.reset();
        this.router.navigate(['/avaliacoes/list']); 
      },
      (error: any) => {
        console.error('Erro ao salvar a avaliação', error);
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.avaliacaoForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }

  // Implementação da função para verificar se um campo está válido
  isFieldValid(field: string): boolean {
    const formControl = this.avaliacaoForm.get(field);
    return formControl ? formControl.valid && (formControl.dirty || formControl.touched) : false;
  }
}




