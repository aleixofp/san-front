import { Departamento } from '../../models/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import { CadastrarCurso } from '../../models/cadastrar-curso';
import { CursoService } from '../../services/curso.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalhes-departamento',
  templateUrl: './detalhes-departamento.component.html',
  styleUrls: ['./detalhes-departamento.component.css']
})
export class DetalhesDepartamentoComponent implements OnInit {

  nomeDepartamento = '';

  constructor(public dialogRef: MatDialogRef<DetalhesDepartamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
  }


  salvar() {
    this.departamentoService.cadastrarDepartamento(this.nomeDepartamento)
      .subscribe(result => {
        this.dialogRef.close();
      });
  }

}
