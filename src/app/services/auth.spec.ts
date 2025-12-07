import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  // AQUI COMEÇA O NOSSO TESTE TDD
  it('deve retornar TRUE se o usuario for professor e senha 1234', () => {
    const resultado = service.login('professor', '1234');
    expect(resultado).toBeTrue();
  });

  it('deve retornar FALSE se a senha estiver errada', () => {
    const resultado = service.login('professor', 'errada');
    expect(resultado).toBeFalse();
  });
});
