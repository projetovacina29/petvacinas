import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aplicacoes } from './aplicacoes';

describe('Aplicacoes', () => {
  let component: Aplicacoes;
  let fixture: ComponentFixture<Aplicacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aplicacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(Aplicacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
