import { Aluno } from './../models/aluno';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url = 'http://localhost:8080/sanfatec/aluno';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getAlunos(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(this.url + '/lista', this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  desativarAlunoPorId(id: number): Observable<string> {
    return this.httpClient.get<string>(this.url + '/desativar/' + id, this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  cadastrarAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.url, this.httpOptions)
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
