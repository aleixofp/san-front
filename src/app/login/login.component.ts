import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = '';
  senha = '';
  mostrarCarregamento = false;

  constructor(private usuarioService: UsuarioService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage && sessionStorage.getItem('usuarioLogado')) {
        this.router.navigateByUrl('/lobby');
    }
  }

  fazerLogin(){
    if (this.login && this.senha){
      this.usuarioService.login(this.login, this.senha)
        .subscribe(result => {
          if (!result){
            this.snackBar.open('Usuário ou senha incorretos. Tente novamente!', 'Fechar', {
              duration: 5000
            });
          } else {
            this.snackBar.dismiss();
            sessionStorage.setItem('usuarioLogado', JSON.stringify(result));
            this.router.navigateByUrl('/lobby');
          }
        });
    }
  }


}
