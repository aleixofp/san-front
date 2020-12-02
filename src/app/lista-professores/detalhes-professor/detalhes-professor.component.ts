import { UsuarioService } from 'src/app/services/usuario.service';
import { CadastrarProfessor } from './../../models/cadastrar-professor';
import { ProfessorService } from './../../services/professor.service';
import { Departamento } from '../../models/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import { CadastrarCurso } from '../../models/cadastrar-curso';
import { CursoService } from '../../services/curso.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalhes-professor',
  templateUrl: './detalhes-professor.component.html',
  styleUrls: ['./detalhes-professor.component.css']
})
export class DetalhesProfessorComponent implements OnInit {

  cadastrarProfessor = {} as CadastrarProfessor;

  constructor(public dialogRef: MatDialogRef<DetalhesProfessorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private professorService: ProfessorService,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }

  formatarCpf() {
    if (this.cadastrarProfessor.cpf){
      let somaCpf = 0;
      let indice = 10;
      let cpfValido = true;
      let digitos = this.cadastrarProfessor.cpf.slice(-2);
      for (const char of this.cadastrarProfessor.cpf) {
        if (indice === 1) {
          break;
        }
        somaCpf += parseInt(char) * indice;
        indice--;
      }
      let resto = (somaCpf * 10) % 11;
      if (resto === 10) {
        resto = 0;
      }

      if (resto !== parseInt(digitos.charAt(0))){
        cpfValido = false;
      }

      indice = 11;
      somaCpf = 0;
      for (const char of this.cadastrarProfessor.cpf) {
        if (indice === 1) {
          break;
        }
        somaCpf += parseInt(char) * indice;
        indice--;
      }

      resto = (somaCpf * 10) % 11;
      if (resto !== parseInt(digitos.charAt(1))){
        cpfValido = false;
      }

      if (cpfValido){
        this.professorService.validarCpf(this.cadastrarProfessor.cpf)
          .subscribe(result => {
            if (result === null){
              this.cadastrarProfessor.cpf = this.cadastrarProfessor.cpf.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            } else {
              this.snackBar.dismiss();
              this.snackBar.open('CPF já existente na base. ', 'OK');
              this.cadastrarProfessor.cpf = '';
            }
          });
      } else {
        this.snackBar.dismiss();
        this.snackBar.open('CPF inválido. ', 'OK');
        this.cadastrarProfessor.cpf = '';
      }
    }


  }

  verificarEmail() {
    this.snackBar.dismiss();
    if (this.cadastrarProfessor && this.cadastrarProfessor.email){
      this.usuarioService.verificarEmail(this.cadastrarProfessor.email)
        .subscribe(result => {
          if (result) {
            this.snackBar.open('Email já cadastrado no sistema', 'Fechar', {
              duration: 5000
            });
            this.cadastrarProfessor.email = '';
          }
        });
    }
  }

  salvar() {
    this.verificarEmail();
    this.professorService.cadastrarProfessor(this.cadastrarProfessor)
      .subscribe(result => {
        this.dialogRef.close();
      });
  }

}
