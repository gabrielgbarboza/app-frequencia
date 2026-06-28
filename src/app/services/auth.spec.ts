import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Garante que não sobraram requisições pendentes
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar sucesso ao fazer login com credenciais corretas (Simulado)', () => {
    service.login('professor', '1234').subscribe((resposta) => {
      expect(resposta.sucesso).toBeTrue();
    });

    // Intercepta qualquer requisição que termine com /login.php
    const req = httpMock.expectOne((request) =>
      request.url.includes('/login.php'),
    );
    expect(req.request.method).toBe('POST');

    // Finge que o servidor PHP respondeu com sucesso
    req.flush({ sucesso: true, mensagem: 'Login efetuado com sucesso' });
  });

  it('deve retornar erro se a senha estiver errada (Simulado)', () => {
    service.login('professor', 'errada').subscribe((resposta) => {
      expect(resposta.sucesso).toBeFalse();
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/login.php'),
    );
    req.flush({ sucesso: false, mensagem: 'Credenciais inválidas' });
  });
});
