import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Turma {
  id: number;
  nome: string;
  horario: string;
}

export type StatusPresenca = 'presente' | 'falta' | 'justificada';

export interface Aluno {
  id: number;
  turma_id: number; // Atualizado para bater com o nome da coluna no banco
  nome: string;
  status: StatusPresenca;
}

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  private apiUrl = 'http://192.168.15.88/chamada-facil-api';

  constructor(private http: HttpClient) {}

  // Busca as turmas na API
  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.apiUrl}/turmas.php`);
  }

  // Busca os alunos de uma turma específica na API
  getAlunos(turmaId: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(
      `${this.apiUrl}/alunos.php?turma_id=${turmaId}`,
    );
  }

  // --- MÉTODOS TEMPORÁRIOS PARA MANTER A TELA FUNCIONANDO ---
  // (No próximo e último passo vamos plugar o envio real no banco)

  enviarChamada(
    turmaId: number,
    data: string,
    conteudo: string,
    qtdAulas: number,
    alunos: Aluno[],
  ): Observable<any> {
    // Montamos o "pacote" (JSON) com todas as informações que o PHP espera
    const payload = {
      turma_id: turmaId,
      data: data,
      conteudo: conteudo,
      qtd_aulas: qtdAulas,
      alunos: alunos,
    };

    // Disparamos o POST para a nossa nova rota PHP
    return this.http.post(`${this.apiUrl}/salvar_chamada.php`, payload);
  }
}
