import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAlunoComponent } from './historico-aluno.component';

describe('HistoricoAlunoComponent', () => {
  let component: HistoricoAlunoComponent;
  let fixture: ComponentFixture<HistoricoAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
