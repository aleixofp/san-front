import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from './../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  usuario: Usuario | undefined;
  selectedTab = 0;

  constructor(private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      this.usuario = JSON.parse(usuarioLogado);
      console.log('Usuário logado: ' + this.usuario);
    } else {
      this.router.navigateByUrl('/login');

    }
  }

  verificaPermissao(permissao: string){
    let permitir = false;
    this.usuario?.permissoes.forEach(p => {
      if (p.nome === permissao || p.nome === 'ADMIN'){
        permitir = true;
      }
    });
    return permitir;
  }

  sair(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index;
  }

}
