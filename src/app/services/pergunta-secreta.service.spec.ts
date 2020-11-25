import { TestBed } from '@angular/core/testing';

import { PerguntaSecretaService } from './pergunta-secreta.service';

describe('PerguntaSecretaService', () => {
  let service: PerguntaSecretaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerguntaSecretaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
