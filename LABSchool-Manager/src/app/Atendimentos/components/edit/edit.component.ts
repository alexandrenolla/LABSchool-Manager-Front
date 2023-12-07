import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { Atendimento } from '../../model/atendimento.moel'; 
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  atendimento: Atendimento = {
    id: undefined,
    dataHora: '',
    descricao: '',
    statusAtivo: false,
    alunoId: 0,
    pedagogoId: 0
  };
  alunos: any[] = [];
  pedagogos: any[] = [];
  formInvalid: boolean = false;
  atendimentoForm: FormGroup;

  constructor(
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
) {
    this.atendimentoForm = this.fb.group({});
}

  ngOnInit() {
    this.atendimentoForm = this.fb.group({
        alunoId: [null, Validators.required],
        pedagogoId: [null, Validators.required],
        dataHora: '',
        descricao: ['', Validators.required, Validators.minLength(8), Validators.maxLength(64)],
        statusAtivo: [false]
    });
    //  forkJoin para fazer múltiplas requisições simultâneas.
    const atendimentoId = +this.route.snapshot.params['id'];
    forkJoin([
        this.atendimentoService.getAlunos(),
        this.atendimentoService.getPedagogos()
    ]).subscribe((results) => {
        this.alunos = results[0];
        this.pedagogos = results[1];
        this.getAtendimento(atendimentoId);
    });
  }

  getAtendimento(id: number): void {
    this.atendimentoService.getAtendimento(id).pipe(catchError(this.handleError)).subscribe(
        (response: any) => {
            if (response && response.atendimento) {
                const atendimento = response.atendimento;
                atendimento.dataHora = this.convertToDateInputFormat(atendimento.dataHora);
                this.atendimento = atendimento;

                this.atendimentoForm.patchValue(atendimento);
            } else {
                console.error('Atendimento não encontrado.');
            }
        },
        (error: any) => {
            console.error('Erro ao obter o atendimento', error);
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

  salvarAtendimento(): void {
    if (!this.atendimento.descricao || !this.atendimento.alunoId || !this.atendimento.pedagogoId) {
        this.formInvalid = true;
        return;
    }
    
    if (this.atendimento.id === undefined) {
        console.error('ID do atendimento não definido.');
        return;
    }

    this.atendimentoService.updateAtendimento(this.atendimento.id, this.atendimento).subscribe(
        () => {
            console.log('Atendimento atualizado com sucesso.');
            alert('Acompanhamento atualizado com sucesso.');
            this.router.navigate(['/atendimentos/list']);
        },
        (error: any) => {
            console.error('Erro ao atualizar o acompanhamento', error);
        }
    );
}


  deletarAtendimento(): void {
    if (confirm('Tem certeza que deseja excluir este atendimento?')) {
      if (this.atendimento.id !== undefined) {
        this.atendimentoService.deleteAtendimento(this.atendimento.id).subscribe(
          () => {
            console.log('Atendimento excluído com sucesso.');
            alert('Atendimento excluído com sucesso.');
            this.router.navigate(['/atendimentos/list']);
          },
          (error: any) => {
            console.error('Erro ao excluir o atendimento', error);
          }
        );
      } else {
        console.error('ID do atendimento é undefined.');
      }
    }
  }
  // Método de tratamento de erro nas requisições HTTP.
  handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(error);
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.atendimentoForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }
}
