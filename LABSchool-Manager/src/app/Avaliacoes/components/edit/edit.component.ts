import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../../model/avaliacoes.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';
import { catchError, forkJoin, throwError } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  avaliacao: Avaliacao = {
    id: undefined,
    titulo: '',
    descricao: '',
    materia: '',
    pontuacaoMaxima: 0,
    nota: 0,
    dataRealizacao: '',
    codigoProfessor: 0,
    alunoId: 0
  };
  
  alunos: any[] = [];
  professores: any[] = [];
  formInvalid: boolean = false;
  avaliacaoForm: FormGroup;

  constructor(
    private avaliacaoService: AvaliacoesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
) {
    this.avaliacaoForm = this.fb.group({});
}

  ngOnInit() {
    this.avaliacaoForm = this.fb.group({
        titulo: ['', Validators.required, Validators.minLength(8), Validators.maxLength(64)],
        descricao: ['', Validators.required, Validators.minLength(15), Validators.maxLength(255)],
        materia: ['', Validators.required],
        pontuacaoMaxima: ['', Validators.required],
        nota: ['', Validators.required],
        dataRealizacao: ['', Validators.required],
        codigoProfessor: [null, Validators.required],
        alunoId: [null, Validators.required]
    });
    //  forkJoin para fazer múltiplas requisições simultâneas.
    const avaliacaoId = +this.route.snapshot.params['id'];
    forkJoin([
        this.avaliacaoService.getAlunos(),
        this.avaliacaoService.getProfessores()
    ]).subscribe((results) => {
        this.alunos = results[0];
        this.professores = results[1];
        this.getAvaliacao(avaliacaoId);
    });
  }

  getAvaliacao(id: number): void {
    this.avaliacaoService.getAvaliacao(id).pipe(catchError(this.handleError)).subscribe(
        (response: any) => {
            if (response && response.avaliacao) {
                const avaliacao = response.avaliacao;
                avaliacao.dataRealizacao = this.convertToDateInputFormat(avaliacao.dataRealizacao);
                this.avaliacao = avaliacao;

                this.avaliacaoForm.patchValue(avaliacao);
            } else {
                console.error('Avaliação não encontrada.');
            }
        },
        (error: any) => {
            console.error('Erro ao obter a avaliação', error);
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

  salvarAvaliacao(): void {
    if (!this.avaliacao.descricao || !this.avaliacao.titulo || !this.avaliacao.alunoId || !this.avaliacao.codigoProfessor) {
        this.formInvalid = true;
        return;
    }
    
    if (this.avaliacao.id === undefined) {
        console.error('ID da avaliação não definido.');
        return;
    }

    this.avaliacaoService.updateAvaliacao(this.avaliacao.id, this.avaliacao).subscribe(
        () => {
            console.log('Avaliação atualizado com sucesso.');
            alert('Avaliação atualizado com sucesso.');
            this.router.navigate(['/avaliacoes/list']);
        },
        (error: any) => {
            console.error('Erro ao atualizar a avaliação', error);
        }
    );
}

  deletarAvaliacao(): void {
    if (confirm('Tem certeza que deseja excluir esta Avaliação?')) {
      if (this.avaliacao.id !== undefined) {
        this.avaliacaoService.deleteAvaliacao(this.avaliacao.id).subscribe(
          () => {
            console.log('Avaliação excluída com sucesso.');
            alert('Avaliação excluído com sucesso.');
            this.router.navigate(['/avaliacoes/list']);
          },
          (error: any) => {
            console.error('Erro ao excluir a avaliação', error);
          }
        );
      } else {
        console.error('ID da avaliação é undefined.');
      }
    }
  }
  // Método de tratamento de erro nas requisições HTTP.
  handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(error);
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.avaliacaoForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }
}
