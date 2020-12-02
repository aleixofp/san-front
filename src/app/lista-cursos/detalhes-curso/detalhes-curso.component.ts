import { Departamento } from './../../models/departamento';
import { DepartamentoService } from './../../services/departamento.service';
import { CadastrarCurso } from './../../models/cadastrar-curso';
import { CursoService } from './../../services/curso.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalhes-curso',
  templateUrl: './detalhes-curso.component.html',
  styleUrls: ['./detalhes-curso.component.css']
})
export class DetalhesCursoComponent implements OnInit {

  cadastrarCurso = {} as CadastrarCurso;
  listaDepartamentos = [] as Departamento[];

  constructor(public dialogRef: MatDialogRef<DetalhesCursoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private cursoService: CursoService,
              private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.departamentoService.lista()
      .subscribe(result => {
        this.listaDepartamentos = result;
      });
  }


  salvar() {
    this.cursoService.cadastrarCurso(this.cadastrarCurso)
      .subscribe(result => {
        this.dialogRef.close();
      });
  }

}
