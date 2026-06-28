import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChamadaPage } from './chamada.page';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ChamadaPage', () => {
  let component: ChamadaPage;
  let fixture: ComponentFixture<ChamadaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadaPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChamadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar a página', () => {
    expect(component).toBeTruthy();
  });
});
