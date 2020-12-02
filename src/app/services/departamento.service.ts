import { Departamento } from './../models/departamento';
import { CadastrarCurso } from '../models/cadastrar-curso';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Curso } from '../models/curso';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  url = environment.server_url + '/departamento';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<Departamento[]> {
    return this.httpClient.get<Departamento[]>(this.url + '/lista', this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  cadastrarDepartamento(departamento: string): Observable<Departamento> {
    return this.httpClient.post<Departamento>(this.url, {nome: departamento}, this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  // Manipulação de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
