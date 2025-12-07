import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { DadosService, Turma } from '../services/dados';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.page.html',
  styleUrls: ['./turmas.page.scss'],
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
    IonBackButton,
    IonButtons,
  ],
})
export class TurmasPage implements OnInit {
  listaTurmas: Turma[] = [];

  // Injetar Router
  constructor(private dadosService: DadosService, private router: Router) {}

  ngOnInit() {
    this.listaTurmas = this.dadosService.getTurmas();
  }

  // Função para navegar passando o ID
  abrirChamada(turma: Turma) {
    this.router.navigate(['/chamada', turma.id]);
  }
}
