import { CadastrarAluno } from './../../models/cadastrar-aluno';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalhes-aluno',
  templateUrl: './detalhes-aluno.component.html',
  styleUrls: ['./detalhes-aluno.component.css']
})
export class DetalhesAlunoComponent implements OnInit {

  cadastrarAluno = {} as CadastrarAluno;

  constructor(public dialogRef: MatDialogRef<DetalhesAlunoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private usuarioService: UsuarioService,
              private alunoService: AlunoService) { }

  ngOnInit(): void {
  }

  formatarCpf() {
    this.cadastrarAluno.cpf = this.cadastrarAluno.cpf.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  verificarEmail() {
    this.snackBar.dismiss();
    if (this.cadastrarAluno && this.cadastrarAluno.email){
      this.usuarioService.verificarEmail(this.cadastrarAluno.email)
        .subscribe(result => {
          if (result) {
            this.snackBar.open('Email já cadastrado no sistema', 'Fechar', {
              duration: 5000
            });
            this.cadastrarAluno.email = '';
          }
        });
    }
  }

  salvar() {
    this.verificarEmail();
    this.alunoService.cadastrarAluno(this.cadastrarAluno)
      .subscribe(result => {
        this.dialogRef.close();
      });
  }

}
