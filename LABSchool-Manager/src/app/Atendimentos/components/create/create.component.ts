import { Component, OnInit } from '@angular/core';
import { AtendimentoService } from '../../../services/atendimento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/usuarios/Model/user.model';
 // Corrigido o caminho do modelo de usuário

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  atendimentoForm: FormGroup;
  alunos: any[] = [{ id: '', nome: 'Selecione um aluno' }];
  pedagogos: any[] = [{ id: '', nome: 'Selecione um pedagogo' }];
  formError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private atendimentoService: AtendimentoService,
    private router: Router
  ) {
    this.atendimentoForm = this.formBuilder.group({
      alunoId: ['', Validators.required],
      pedagogoId: ['', Validators.required],
      dataHora: [this.getCurrentDate(), Validators.required],
      descricao: ['', Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      statusAtivo: [false]
    });
  }

  ngOnInit(): void {
    this.getAlunos();
    this.getPedagogos();
  }

  getAlunos(): void {
    this.atendimentoService.getAlunos().subscribe(
      (alunos: any[]) => {
        this.alunos = alunos;
      },
      (error: any) => {
        console.error('Erro ao obter a lista de alunos', error);
      }
    );
  }

  getPedagogos(): void {
    this.atendimentoService.getPedagogos().subscribe(
      (pedagogos: any[]) => {
        this.pedagogos = pedagogos;
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

  salvarAtendimento(): void {
    if (this.atendimentoForm.invalid) {
      this.formError = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.formError = ''; // Reset the form error message before saving

    const atendimento = {
      dataHora: this.atendimentoForm.get('dataHora')?.value,
      descricao: this.atendimentoForm.get('descricao')?.value,
      statusAtivo: this.atendimentoForm.get('statusAtivo')?.value,
      alunoId: this.atendimentoForm.get('alunoId')?.value,
      pedagogoId: this.atendimentoForm.get('pedagogoId')?.value
    };

    this.atendimentoService.createAtendimento(atendimento).subscribe(
      () => {
        console.log('Atendimento salvo com sucesso.');
        alert('Atendimento salvo com sucesso.');
        this.atendimentoForm.reset();
        this.router.navigate(['/atendimentos/list']); 
      },
      (error: any) => {
        console.error('Erro ao salvar o atendimento', error);
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.atendimentoForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }

  // Implementação da função para verificar se um campo está válido
  isFieldValid(field: string): boolean {
    const formControl = this.atendimentoForm.get(field);
    return formControl ? formControl.valid && (formControl.dirty || formControl.touched) : false;
  }
}




