import { DetalhesProfessorComponent } from './detalhes-professor/detalhes-professor.component';
import { ProfessorService } from './../services/professor.service';
import { Professor } from './../models/professor';
import { DepartamentoService } from '../services/departamento.service';
import { Departamento } from '../models/departamento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-professores',
  templateUrl: './lista-professores.component.html',
  styleUrls: ['./lista-professores.component.css']
})
export class ListaProfessoresComponent implements OnInit {

  colunas: string[] = ['nome', 'cpf', 'ativo', 'actions'];
  listaProfessores: Professor[] = [];
  dataSource: MatTableDataSource<Professor> = new MatTableDataSource<Professor>();

  @ViewChild('paginator', {static: false}) paginator = {} as MatPaginator;

  constructor(private professorService: ProfessorService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarProfessores();
  }

  listarProfessores() {
    this.professorService.lista()
    .subscribe(result => {
      this.listaProfessores = result;
      this.dataSource = new MatTableDataSource<Professor>(this.listaProfessores);
      this.dataSource.paginator = this.paginator;
    });
  }

  aplicarFiltro(pesquisa: any ){
    let  digitado = pesquisa.value as string;
    digitado = digitado.trim();
    digitado = digitado.toLowerCase();
    this.dataSource.filter = digitado;
  }

  abrirModalCadastro() {
    const dialogRef = this.dialog.open(DetalhesProfessorComponent, {
      width: '50%'
    });
    dialogRef.afterClosed()
      .subscribe(info => {
        this.listarProfessores();
      });
  }

  desativarProfessorPorId(id: number){
    this.snackBar.dismiss();
    this.professorService.desativarProfessorPorId(id)
      .subscribe(result => {
        this.snackBar.open('As alterações para o usuário foram efetuadas', 'OK', {duration: 3000});
      })
  }


}
