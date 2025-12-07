import { Injectable } from '@angular/core';

export interface Turma {
  id: number;
  nome: string;
  horario: string;
}

// Novo tipo de status
export type StatusPresenca = 'presente' | 'falta' | 'justificada';

export interface Aluno {
  id: number;
  turmaId: number;
  nome: string;
  status: StatusPresenca; // Mudou de boolean para o nosso tipo novo
}

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  private turmas: Turma[] = [
    { id: 1, nome: 'História - 1º ANO - A', horario: 'Matutino' },
    { id: 2, nome: 'História - 2º ANO - B', horario: 'Matutino' },
    { id: 3, nome: 'História - 3º ANO - C', horario: 'Vespertino' },
  ];

  // Dados iniciais (Mock)
  private alunos: Aluno[] = [
    {
      id: 1,
      turmaId: 1,
      nome: 'Ana Beatriz Adão Custódio',
      status: 'presente',
    },
    { id: 2, turmaId: 1, nome: 'Ana Beatriz Machado', status: 'presente' },
    { id: 3, turmaId: 1, nome: 'Carlos Eduardo', status: 'presente' },
    { id: 4, turmaId: 1, nome: 'Daniela Rocha', status: 'presente' },
    { id: 5, turmaId: 2, nome: 'Eduardo Lima', status: 'presente' },
  ];

  constructor() {
    this.carregarDados();
  }

  getTurmas() {
    return this.turmas;
  }

  getAlunos(idTurma: number) {
    return this.alunos.filter((a) => a.turmaId === idTurma);
  }

  // Nova função para atualizar o status (substitui o marcarPresenca antigo)
  atualizarStatus(alunoId: number, novoStatus: StatusPresenca) {
    const aluno = this.alunos.find((a) => a.id === alunoId);
    if (aluno) {
      aluno.status = novoStatus;
      this.salvarDados();
    }
  }

  // Métodos de persistência (agora salvam tudo)
  private salvarDados() {
    localStorage.setItem('frequencia_alunos_v2', JSON.stringify(this.alunos));
  }

  private carregarDados() {
    const dados = localStorage.getItem('frequencia_alunos_v2');
    if (dados) this.alunos = JSON.parse(dados);
  }
  // A função que o teste pediu
  enviarChamada(turmaId: number, data: string, conteudo: string): boolean {
    // Checagem mais robusta
    if (turmaId > 0 && data.length > 0 && conteudo.length > 0) {
      this.salvarDados();
      console.log(`Chamada da Turma ${turmaId} enviada com Sucesso!`);
      return true; // Sucesso
    }
    return false; // Falha (se faltar dados, por exemplo)
  }
}
