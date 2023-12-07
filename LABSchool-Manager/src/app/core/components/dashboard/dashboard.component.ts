import { Component, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service'; 
import { User } from '../../../usuarios/Model/user.model';
import { Router } from '@angular/router';
import { Atendimento } from 'src/app/Atendimentos/model/atendimento.moel';
import Chart from 'chart.js/auto';
import { AuthService } from '../../../services/auth.service'; // Ajuste o caminho para o correto


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  usuarios: any[] = [];
  totalAlunos: number = 0; 
  totalExercicios: number = 0;
  totalAvaliacoes: number = 0;
  totalAtendimentos: number = 0;
  alunos: User[] = [];
  buscaUsuarios: any[] = [];
  buscaAlunos: User[] = [];
  atendimentosPorDia: any[] = [];
  atendimentosChart: any;

  @ViewChild('chartRef') chartRef: ElementRef | undefined;

  constructor(private dashboardService: DashboardService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.fetchData();
    
  }

  fetchData(): void {
    this.dashboardService.getAlunos().subscribe(alunos => this.totalAlunos = alunos.length);

    this.dashboardService.getTotalExercicios().subscribe(total => this.totalExercicios = total);
    this.dashboardService.getTotalAvaliacoes().subscribe(total => this.totalAvaliacoes = total);
    this.dashboardService.getTotalAtendimentos().subscribe(total => this.totalAtendimentos = total);
    this.dashboardService.getAlunos().subscribe(alunos => this.alunos = alunos);
    this.dashboardService.getUsuarios().subscribe(usuarios => this.usuarios = usuarios);
    this.dashboardService.getAtendimentos().subscribe(atendimentos => {
      this.processAtendimentosData(atendimentos);
      this.initializeChart(); 
    });
    

    this.initializeChart();
  }

  private processAtendimentosData(atendimentos: Atendimento[]): void {
    const counts: { [key: string]: number } = {};
  
    atendimentos.forEach(atendimento => {
      const date = new Date(atendimento.dataHora).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
  
    this.atendimentosPorDia = Object.keys(counts).map(date => ({
      date: date,
      count: counts[date]
    }));
  }

  private initializeChart(): void {
    if (this.atendimentosPorDia && this.chartRef) {
      const ctx = this.chartRef.nativeElement.getContext('2d');
      
      if (this.atendimentosChart) {
        this.atendimentosChart.destroy();  
      }
  
      this.atendimentosChart = new Chart(ctx, {
        type: 'bar',  
        data: {
          labels: this.atendimentosPorDia.map(d => d.date),
          datasets: [{
            label: 'Atendimentos por Dia',
            data: this.atendimentosPorDia.map(d => d.count),
            backgroundColor: '#00BFFF',  
            borderColor: '#3cba9f',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }


  isAdmin(): boolean {
    return this.authService.isAdmin();
}

  onSearch(query: string): void {
    
  }

  onViewMore(id: number): void {
    //lógica para visualizar 
  }

  onEdit(id: number): void {
    // lógica de edição 
  }

  buscaUser(event: Event): void {
  const inputValue = (event.target as HTMLInputElement).value.toLowerCase();

  if (inputValue === '') {
    // Campo de busca vazio, não faça nada
    this.buscaUsuarios = [];
  } else {
    // Executar a pesquisa com o termo digitado
    this.buscaUsuarios = this.usuarios.filter(usuario => {
      return (
        usuario.nome.toLowerCase().includes(inputValue) ||
        usuario.telefone.includes(inputValue) ||
        usuario.cpf.includes(inputValue)
      );
    });
  }
}
  

  buscaAluno(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    if (inputValue === '') {
      // Campo de busca vazio, não faça nada
      this.buscaAlunos = [];
    } else {
      // Executar a pesquisa com o termo digitado
      this.buscaAlunos = this.alunos.filter(aluno => {
        return (
          aluno.nome.toLowerCase().includes(inputValue) ||
          aluno.telefone.includes(inputValue) ||
          aluno.cpf.includes(inputValue)
        );
      });
    }
  }
  

  navigateTo(route: string) {
    this.router.navigate([route,]);
  }
  
}
@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {
  transform(userType: number): string {
    switch (userType) {
      case 0: return 'Administrador';
      case 1: return 'Pedagogo';
      case 2: return 'Professor';
      case 3: return 'Aluno';
      default: return 'Desconhecido';
    }
  }

 
}

