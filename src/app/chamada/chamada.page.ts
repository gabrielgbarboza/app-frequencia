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
    private toastController: ToastController
  ) {
    addIcons({ alertCircleOutline, person });
  }

  ngOnInit() {
    // Lógica para obter o ID de forma síncrona
    const idRota = this.route.snapshot.paramMap.get('id');

    if (idRota) {
      this.turmaId = Number(idRota); // Atribui o ID
      this.listaAlunos = this.dadosService.getAlunos(this.turmaId);
      this.turmaAtual = this.dadosService
        .getTurmas()
        .find((t) => t.id === this.turmaId);
    }
  }

  // Função para ciclar os status ao clicar no aluno
  alternarStatus(aluno: Aluno) {
    let novoStatus: StatusPresenca = 'presente';

    if (aluno.status === 'presente') novoStatus = 'falta';
    else if (aluno.status === 'falta') novoStatus = 'justificada';
    else if (aluno.status === 'justificada') novoStatus = 'presente';

    this.dadosService.atualizarStatus(aluno.id, novoStatus);
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
    // O ID AGORA ESTÁ GARANTIDO VIA PROPRIEDADE DA CLASSE
    const id = this.turmaId;

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

    // Chama a função testada (enviarChamada)
    const sucesso = this.dadosService.enviarChamada(id, data, conteudo);

    if (sucesso) {
      const toast = await this.toastController.create({
        message: 'Chamada enviada com sucesso!',
        duration: 2000,
        color: 'success',
        position: 'bottom',
      });
      toast.present();
      this.router.navigate(['/turmas']);
    } else {
      const toast = await this.toastController.create({
        message: 'Falha no envio da chamada. Tente novamente.',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
      toast.present();
    }
  }
}
