import { CadastrarProfessor } from './../models/cadastrar-professor';
import { Professor } from './../models/professor';
import { Departamento } from '../models/departamento';
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
export class ProfessorService {

  url = environment.server_url + '/professor';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(this.url + '/lista', this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  desativarProfessorPorId(id: number): Observable<string> {
    return this.httpClient.get<string>(this.url + '/desativar/' + id, this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  cadastrarProfessor(professor: CadastrarProfessor): Observable<Professor> {
    return this.httpClient.post<Professor>(this.url, professor, this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  validarCpf(cpf: string): Observable<Professor> {
    return this.httpClient.get<Professor>(this.url + '/validarCpf/' + cpf, this.httpOptions)
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
