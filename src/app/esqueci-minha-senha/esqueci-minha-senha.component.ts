import { PerguntaSecretaService } from './../services/pergunta-secreta.service';
import { PerguntaSecretaUsuario } from './../models/pergunta-secreta-usuario';
import { Usuario } from './../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  emailFormGroup = {} as FormGroup;
  respostaFormGroup = {} as FormGroup;
  novaSenhaFormGroup = {} as FormGroup;

  perguntaSecretaUsuario: PerguntaSecretaUsuario | undefined;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar,
              private router: Router,
              private perguntaSecretaService: PerguntaSecretaService) { }

  ngOnInit(): void {
    this.emailFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.respostaFormGroup = this.fb.group({
      pergunta: [''],
      resposta: ['', [Validators.required]]
    });
    this.novaSenhaFormGroup = this.fb.group({
      novaSenha: ['', Validators.required],
      digiteNovamenteNovaSenha: ['', Validators.required]
    });
  }

  verificarEmail(stepper: MatStepper) {
    const email = this.emailFormGroup?.get('email')?.value;
    if (email){
      this.usuarioService.verificarEmail(email)
        .subscribe(result => {
          if (result) {
            this.perguntaSecretaService.getPorUsuario(result.id)
              .subscribe(resultPs => {
                this.perguntaSecretaUsuario = resultPs;
                this.respostaFormGroup?.get('pergunta')?.setValue( this.perguntaSecretaUsuario?.perguntaSecreta.pergunta );
                stepper.next();
              });
          } else {
            this.snackBar.open('Email não cadastrado no sistema', 'Fechar', {
              duration: 5000
            });
          }
        });
    }
  }

  verificarResposta(stepper: MatStepper) {
    const respostaDigitada = this.respostaFormGroup?.get('resposta')?.value;
    if (this.perguntaSecretaUsuario?.resposta === respostaDigitada){
      stepper.next();
    } else {
      this.snackBar.open('Resposta errada', 'Fechar', {
        duration: 3000
      });
    }
  }

  efetuarTrocaSenha() {
    const novaSenha = this.novaSenhaFormGroup?.get('novaSenha')?.value;
    const idUsuario = this.perguntaSecretaUsuario?.usuario.id;
    if (idUsuario){
      this.usuarioService.atualizarNovaSenha(idUsuario, novaSenha)
        .subscribe(result => {
          if (result){
            this.snackBar.open('Troca de senha efetuada com sucesso!', 'OK', {
              duration: 3000
            });

            this.router.navigateByUrl('/login');
          }
        });
    }
  }

  verificarDigiteNovamente() {
    const novaSenha = this.novaSenhaFormGroup?.get('novaSenha')?.value;
    const senhaDigiteNovamente = this.novaSenhaFormGroup?.get('digiteNovamenteNovaSenha')?.value;
    if (senhaDigiteNovamente && novaSenha && novaSenha !== senhaDigiteNovamente){
      this.snackBar.open('As senhas não batem', 'OK', {duration: 3000});
      this.novaSenhaFormGroup?.get('digiteNovamenteNovaSenha')?.setValue(null);
    }
  }

}
