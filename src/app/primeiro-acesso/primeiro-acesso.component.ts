import { FormGroup, FormBuilder } from '@angular/forms';
import { OnInit, Component } from '@angular/core';
@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  informacoesFormGroup = {} as FormGroup;
  codigoVerificacaoFormGroup = {} as FormGroup;
  senhaFormGroup = {} as FormGroup;

  segundosFaltantesParaReenviarEmail = 10;

  constructor(private fb: FormBuilder){

  }

  ngOnInit() {
    this.informacoesFormGroup = this.fb.group({
      matricula: null,
      cpf: null
    });
    this.codigoVerificacaoFormGroup = this.fb.group({
      codigoVerificacao: null,
    });
    this.senhaFormGroup = this.fb.group({
      senha: null,
      digiteNovamenteSenha: null
    });


  }

  step2(){
    const interv = setInterval(() => {
      if (this.segundosFaltantesParaReenviarEmail === 0){
        clearInterval(interv);
      } else {
        this.segundosFaltantesParaReenviarEmail--;
      }
    }, 1000);
  }
}
