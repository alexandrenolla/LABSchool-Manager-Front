import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { TipoUsuario, User } from '../../Model/user.model';
import { Atendimento } from '../../../Atendimentos/model/atendimento.moel';
import { Avaliacao } from '../../../Avaliacoes/model/avaliacoes.model';
import { Exercicio } from '../../../exercicios/model/exercicios.model';
import { Endereco } from './endereco.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  endereco: Endereco | null = null; // corrigido para ser um único Endereco
  alunos: User[] = [];
  atendimentos: Atendimento[] = [];
  avaliacoes: Avaliacao[] = [];
  exercicios: Exercicio[] = [];
  alunoSelecionado: User | null = null;
  aluno?: User;

  constructor(private alunoService: AlunoService, private cdr: ChangeDetectorRef,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchAlunos();
    this.route.params.subscribe((params) => {
      const alunoId = +params['id'];
      this.getAlunoId(alunoId);
    });
  }
  
  getAlunoId(alunoId: number): void {
    this.alunoService.getAlunoById(alunoId).subscribe((aluno) => {
      if (aluno) {
        this.aluno = aluno;
        if (aluno.id) {
          this.fetchAtendimentosByAlunoId(aluno.id);
          this.fetchAvaliacoesByAlunoId(aluno.id);
          this.fetchExerciciosByAlunoId(aluno.id);
          this.fetchEnderecoByAlunoId(aluno.id);
        } else {
          // Lida com o caso em que o ID do aluno é indefinido
        }
      } else {
        // Lida com o caso em que o aluno não foi encontrado
        this.aluno = undefined; // Defina como undefined para evitar erros de tempo de execução
      }
    });
}



  fetchAlunos(): void {
    this.alunoService.getAlunos().subscribe(alunos => {
      this.alunos = alunos;
      console.log("Alunos fetched:", alunos);
    });
  }

  onAlunoChanged(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target.value) {
      console.error('O valor do evento é indefinido:', target.value);
      return;
    }

    const alunoId = Number(target.value);

    if (isNaN(alunoId)) {
      console.error('O valor do evento não é um número válido:', target.value);
      return;
    }

    console.log("Value from event:", alunoId);

    this.alunoSelecionado = this.alunos.find(a => a.id === alunoId) || null;

    console.log("Aluno Selecionado:", this.alunoSelecionado);

    if (this.alunoSelecionado) {
      this.fetchAtendimentosByAlunoId(alunoId);
      this.fetchAvaliacoesByAlunoId(alunoId);
      this.fetchExerciciosByAlunoId(alunoId);
      this.fetchEnderecoByAlunoId(alunoId);
    } else {
      this.atendimentos = [];
      this.avaliacoes = [];
      this.exercicios = [];
      this.endereco = null;
    }
    this.cdr.detectChanges();
  }

  fetchAtendimentosByAlunoId(id: number): void {
    this.alunoService.getAtendimentosByAlunoId(id).subscribe(atendimentos => {
      this.atendimentos = atendimentos;
      console.log("Atendimentos for alunoId:", id, atendimentos);
    });
  }

  fetchAvaliacoesByAlunoId(id: number): void {
    this.alunoService.getAvaliacoesByAlunoId(id).subscribe(avaliacoes => {
      this.avaliacoes = avaliacoes;
      console.log("Avaliações for alunoId:", id, avaliacoes);
    });
  }

  fetchExerciciosByAlunoId(id: number): void {
    this.alunoService.getExerciciosByAlunoId(id).subscribe(exercicios => {
      this.exercicios = exercicios;
      console.log("Exercícios for alunoId:", id, exercicios);
    });
  }

  fetchEnderecoByAlunoId(id: number): void {
    this.alunoService.getEnderecoByAlunoId(id).subscribe(enderecos => {
      this.endereco = enderecos[0];
      console.log("Endereço for alunoId:", id, this.endereco);
    }, error => {
      console.error('Erro ao buscar endereços:', error);
    });
  }
}


