import { AlunoService } from './../services/aluno.service';
import { Aluno } from './../models/aluno';
import { UsuarioService } from './../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes-aluno',
  templateUrl: './detalhes-aluno.component.html',
  styleUrls: ['./detalhes-aluno.component.css']
})
export class DetalhesAlunoComponent implements OnInit {

  nome = '';
  cpf = '';
  email = '';

  constructor(public dialogRef: MatDialogRef<DetalhesAlunoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private usuarioService: UsuarioService,
              private alunoService: AlunoService) { }

  ngOnInit(): void {
  }

  formatarCpf() {
    this.cpf = this.cpf.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  verificarEmail() {
    if (this.email){
      this.usuarioService.verificarEmail(this.email)
        .subscribe(result => {
          if (result) {
            this.snackBar.open('Email já cadastrado no sistema', 'Fechar', {
              duration: 5000
            });
            this.email = '';
          }
        });
    }
  }

  salvar() {
    let aluno = {} as Aluno;
    aluno.nome = this.nome;
    aluno.cpf = this.cpf;
    aluno.email = this.email;

    this.alunoService.cadastrarAluno(aluno)
      .subscribe(result => {
        this.dialogRef.close();
      });
  }

}
