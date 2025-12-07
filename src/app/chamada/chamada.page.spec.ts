import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChamadaPage } from './chamada.page';
import { ActivatedRoute } from '@angular/router'; // Import necessário

describe('ChamadaPage', () => {
  let component: ChamadaPage;
  let fixture: ComponentFixture<ChamadaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadaPage], // Como é standalone, importamos aqui
      providers: [
        // AQUI ESTÁ A MÁGICA:
        // Ensinamos ao teste o que fornecer quando a página pedir "ActivatedRoute"
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1', // Retorna '1' sempre que pedir um ID
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
