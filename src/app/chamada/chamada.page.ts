import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; //
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  ToastController,
} from '@ionic/angular/standalone';
import { DadosService, Aluno, Turma, StatusPresenca } from '../services/dados';
import { addIcons } from 'ionicons';
import { alertCircleOutline, person } from 'ionicons/icons';

@Component({
  selector: 'app-chamada',
  templateUrl: './chamada.page.html',
  styleUrls: ['./chamada.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonButtons,
    IonBackButton,
    IonIcon,
  ],
})
export class ChamadaPage implements OnInit {
  listaAlunos: Aluno[] = [];
  turmaAtual: Turma | undefined;

  // Dados do cabeçalho
  dataHoje: string = new Date().toLocaleDateString('pt-BR');
  conteudoAula: string = '';
  qtdAulas: number = 1; // 1 a 5

  // CORREÇÃO: Declaramos o turmaId aqui, mas o valor é pego no ngOnInit
  turmaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dadosService: DadosService,
    private router: Router,
    private toastController: ToastController,
  ) {
    addIcons({ alertCircleOutline, person });
  }

  ngOnInit() {
    const idRota = this.route.snapshot.paramMap.get('id');

    if (idRota) {
      this.turmaId = Number(idRota);

      // 1. Busca os alunos da API
      this.dadosService.getAlunos(this.turmaId).subscribe({
        next: (dados) => {
          this.listaAlunos = dados;
        },
        error: (erro) => {
          console.error('Erro ao buscar alunos', erro);
        },
      });

      // 2. Busca o nome da turma para exibir no cabeçalho
      this.dadosService.getTurmas().subscribe((turmas) => {
        this.turmaAtual = turmas.find((t) => t.id === this.turmaId);
      });
    }
  }

  // Função para ciclar os status ao clicar no aluno
  // Função para ciclar os status ao clicar no aluno
  alternarStatus(aluno: Aluno) {
    // Altera o status DIRETAMENTE no objeto do aluno que está na tela
    if (aluno.status === 'presente') {
      aluno.status = 'falta';
    } else if (aluno.status === 'falta') {
      aluno.status = 'justificada';
    } else if (aluno.status === 'justificada') {
      aluno.status = 'presente';
    }
  }

  setAulas(qtd: number) {
    this.qtdAulas = qtd;
  }

  getCorStatus(status: string): string {
    return `status-${status}`;
  }

  getTextoStatus(status: string): string {
    if (status === 'justificada') return 'Falta Justificada';
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  // FUNÇÃO DE ENVIO AGORA GARANTIDA
  async enviarChamada() {
    const data = this.dataHoje;
    const conteudo = this.conteudoAula;
    const id = this.turmaId;
    const qtdAulas = this.qtdAulas;
    const alunos = this.listaAlunos; // Passamos a lista de alunos com seus status atuais

    if (id === 0) {
      const toast = await this.toastController.create({
        message: 'Erro: ID da turma não carregado.',
        duration: 3000,
        color: 'danger',
        position: 'top',
      });
      toast.present();
      return;
    }

    if (!data || !conteudo) {
      const toast = await this.toastController.create({
        message: 'Preencha o Conteúdo da Aula para finalizar!',
        duration: 3000,
        color: 'danger',
        position: 'top',
      });
      toast.present();
      return;
    }

    // Agora usamos o .subscribe() para aguardar o banco de dados
    this.dadosService
      .enviarChamada(id, data, conteudo, qtdAulas, alunos)
      .subscribe({
        next: async (resposta) => {
          if (resposta.sucesso) {
            const toast = await this.toastController.create({
              message: 'Chamada enviada e salva no banco de dados!',
              duration: 2000,
              color: 'success',
              position: 'bottom',
            });
            toast.present();
            this.router.navigate(['/turmas']); // Volta para as turmas após o sucesso
          } else {
            const toast = await this.toastController.create({
              message: resposta.mensagem || 'Falha no envio da chamada.',
              duration: 3000,
              color: 'danger',
              position: 'bottom',
            });
            toast.present();
          }
        },
        error: async (erro) => {
          console.error('Erro de rede: ', erro);
          const toast = await this.toastController.create({
            message: 'Erro ao conectar com o servidor local.',
            duration: 3000,
            color: 'danger',
            position: 'bottom',
          });
          toast.present();
        },
      });
  }
}
