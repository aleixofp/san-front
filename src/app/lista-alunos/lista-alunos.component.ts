import { DetalhesAlunoComponent } from './detalhes-aluno/detalhes-aluno.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlunoService } from './../services/aluno.service';
import { Aluno } from './../models/aluno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-alunos',
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css']
})
export class ListaAlunosComponent implements OnInit {

  colunas: string[] = ['nome', 'cpf', 'ativo'];
  listaAlunos: Aluno[] = [];
  dataSource: MatTableDataSource<Aluno> = new MatTableDataSource<Aluno>();

  @ViewChild('paginator', {static: false}) paginator = {} as MatPaginator;

  constructor(private alunoService: AlunoService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.alunoService.getAlunos()
      .subscribe(result => {
        this.listaAlunos = result;
        this.dataSource = new MatTableDataSource<Aluno>(this.listaAlunos);
        this.dataSource.paginator = this.paginator;
      });
  }

  desativarAlunoPorId(id: number){
    this.snackBar.dismiss();
    this.alunoService.desativarAlunoPorId(id)
      .subscribe(result => {
        this.snackBar.open('As alterações para o usuário foram efetuadas', 'OK', {duration: 3000});
      })
  }

  aplicarFiltro(pesquisa: any ){
    let  digitado = pesquisa.value as string;
    digitado = digitado.trim();
    digitado = digitado.toLowerCase();
    this.dataSource.filter = digitado;
  }

  abrirModalCadastro() {
    const dialogRef = this.dialog.open(DetalhesAlunoComponent, {
      width: '50%'
    });
    dialogRef.afterClosed()
      .subscribe(info => {
        this.alunoService.getAlunos()
        .subscribe(result => {
          this.listaAlunos = result;
          this.dataSource = new MatTableDataSource<Aluno>(this.listaAlunos);
        });
      });
  }

  abrirDetalhes(id: number){
    this.alunoService.buscarAluno(id)
      .subscribe(result => {
        const dialogRef = this.dialog.open(DetalhesAlunoComponent, {
          width: '50%',
          data: result
        });
        dialogRef.afterClosed()
          .subscribe(info => {
            this.alunoService.getAlunos()
            .subscribe(result => {
              this.listaAlunos = result;
              this.dataSource = new MatTableDataSource<Aluno>(this.listaAlunos);
            });
          });
      });

  }

}
