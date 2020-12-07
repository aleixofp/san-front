import { CursoService } from './../../services/curso.service';
import { Curso } from './../../models/curso';
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
  listaCursos = [] as Curso[];

  minDate = new Date();

  constructor(public dialogRef: MatDialogRef<DetalhesAlunoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private usuarioService: UsuarioService,
              private alunoService: AlunoService,
              private cursoService: CursoService) { }

  ngOnInit(): void {

    if (this.data){
      this.cadastrarAluno.cpf = this.data.cpf;
      this.cadastrarAluno.dataNascimento = this.data.dataNascimento;
      this.cadastrarAluno.email = this.data.email;
      this.cadastrarAluno.nome = this.data.nome;
      this.cadastrarAluno.sexo = this.data.sexo;
    }
    this.cursoService.lista()
      .subscribe(result => {
        this.listaCursos = result;
      });
  }

  formatarCpf() {
    if (this.cadastrarAluno.cpf){
      let somaCpf = 0;
      let indice = 10;
      let cpfValido = true;
      let digitos = this.cadastrarAluno.cpf.slice(-2);
      for (const char of this.cadastrarAluno.cpf) {
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
      for (const char of this.cadastrarAluno.cpf) {
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
        this.alunoService.validarCpf(this.cadastrarAluno.cpf)
          .subscribe(result => {
            if (result === null){
              this.cadastrarAluno.cpf = this.cadastrarAluno.cpf.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            } else {
              this.snackBar.dismiss();
              this.snackBar.open('CPF já existente na base. ', 'OK');
              this.cadastrarAluno.cpf = '';
            }
          });
      } else {
        this.snackBar.dismiss();
        this.snackBar.open('CPF inválido. ', 'OK');
        this.cadastrarAluno.cpf = '';
      }
    }


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
