import { TestBed } from '@angular/core/testing';
import { DadosService } from './dados';

describe('DadosService', () => {
  let service: DadosService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve iniciar o aluno com status PRESENTE por padrão', () => {
    const alunos = service.getAlunos(1);
    expect(alunos[0].status).toBe('presente');
  });

  it('deve alterar o status para FALTA', () => {
    service.atualizarStatus(1, 'falta');
    const aluno = service.getAlunos(1).find((a) => a.id === 1);
    expect(aluno?.status).toBe('falta');
  });

  it('deve alterar o status para JUSTIFICADA', () => {
    service.atualizarStatus(1, 'justificada');
    const aluno = service.getAlunos(1).find((a) => a.id === 1);
    expect(aluno?.status).toBe('justificada');
  });
  it('deve retornar TRUE ao simular o envio da chamada para o servidor', () => {
    // O serviço de dados deve ter uma função para "enviar" a frequência
    const sucesso = service.enviarChamada(1, '22/11/2025', 'Teste TDD');
    expect(sucesso).toBeTrue();
  });
});
