import { TestBed } from '@angular/core/testing';
import { DadosService } from './dados';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('DadosService', () => {
  let service: DadosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DadosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar a lista de turmas', () => {
    service.getTurmas().subscribe((turmas) => {
      expect(turmas.length).toBe(1);
      expect(turmas[0].nome).toBe('Sistemas de Informação');
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/turmas.php'),
    );
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, nome: 'Sistemas de Informação', horario: '19:00' }]);
  });

  it('deve enviar a chamada para o servidor e retornar sucesso', () => {
    service
      .enviarChamada(1, '22/11/2025', 'Teste TDD', 2, [])
      .subscribe((res) => {
        expect(res.sucesso).toBeTrue();
      });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/salvar_chamada.php'),
    );
    expect(req.request.method).toBe('POST');
    req.flush({ sucesso: true });
  });
});
