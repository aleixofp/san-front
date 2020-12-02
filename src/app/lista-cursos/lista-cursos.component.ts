import { DetalhesCursoComponent } from './detalhes-curso/detalhes-curso.component';
import { CursoService } from './../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Curso } from '../models/curso';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {

  colunas: string[] = ['nome', 'actions'];
  listaCursos: Curso[] = [];
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource<Curso>();

  @ViewChild('paginator', {static: false}) paginator = {} as MatPaginator;

  constructor(private cursoService: CursoService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.lista()
    .subscribe(result => {
      this.listaCursos = result;
      this.dataSource = new MatTableDataSource<Curso>(this.listaCursos);
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
    const dialogRef = this.dialog.open(DetalhesCursoComponent, {
      width: '50%'
    });
    dialogRef.afterClosed()
      .subscribe(info => {
        this.listarCursos();
      });
  }

}
