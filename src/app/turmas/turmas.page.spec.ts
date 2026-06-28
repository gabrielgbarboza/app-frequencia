import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurmasPage } from './turmas.page';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('TurmasPage', () => {
  let component: TurmasPage;
  let fixture: ComponentFixture<TurmasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurmasPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]), // Ensina o teste a lidar com navegação
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TurmasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
