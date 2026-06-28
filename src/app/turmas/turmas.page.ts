import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private dadosService: DadosService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Escuta a resposta da API e preenche a lista
    this.dadosService.getTurmas().subscribe({
      next: (dados) => {
        this.listaTurmas = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar turmas', erro);
      },
    });
  }

  abrirChamada(turma: Turma) {
    this.router.navigate(['/chamada', turma.id]);
  }
}
