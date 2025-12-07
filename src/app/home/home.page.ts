import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importante: Router

// Importamos IonIcon e outros componentes
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

// Importamos a função para registrar ícones
import { addIcons } from 'ionicons';
import {
  checkmarkDoneCircleOutline,
  schoolOutline,
  alertCircleOutline,
} from 'ionicons/icons';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
  ],
})
export class HomePage {
  usuario: string = '';
  chave: string = '';
  mensagem: string = '';

  // Injetamos o Router aqui
  constructor(private authService: AuthService, private router: Router) {
    addIcons({ checkmarkDoneCircleOutline, schoolOutline, alertCircleOutline });
  }

  fazerLogin() {
    const autorizado = this.authService.login(this.usuario, this.chave);

    if (autorizado) {
      this.mensagem = '';
      // Esta linha faz a mágica da navegação
      this.router.navigate(['/turmas']);
    } else {
      this.mensagem = 'Usuário ou senha incorretos.';
    }
  }
}
