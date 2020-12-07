import { DepartamentoService } from './../services/departamento.service';
import { Departamento } from './../models/departamento';
import { CursoService } from '../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Curso } from '../models/curso';
import { DetalhesDepartamentoComponent } from './detalhes-departamento/detalhes-departamento.component';

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.css']
})
export class ListaDepartamentosComponent implements OnInit {

  colunas: string[] = ['nome'];
  listaCursos: Departamento[] = [];
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource<Departamento>();

  @ViewChild('paginator', {static: false}) paginator = {} as MatPaginator;

  constructor(private departamentoService: DepartamentoService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarDepartamentos();
  }

  listarDepartamentos() {
    this.departamentoService.lista()
    .subscribe(result => {
      this.listaCursos = result;
      this.dataSource = new MatTableDataSource<Departamento>(this.listaCursos);
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
    const dialogRef = this.dialog.open(DetalhesDepartamentoComponent, {
      width: '50%'
    });
    dialogRef.afterClosed()
      .subscribe(info => {
        this.listarDepartamentos();
      });
  }

  abrirDetalhes(id: number){

  }

}
