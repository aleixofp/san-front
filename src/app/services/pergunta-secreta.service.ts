import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { PerguntaSecreta } from '../models/pergunta-secreta';
import { PerguntaSecretaUsuario } from '../models/pergunta-secreta-usuario';

@Injectable({
  providedIn: 'root'
})
export class PerguntaSecretaService {

  url = 'http://localhost:8080/sanfatec/pergunta-secreta';
  urlUsuario = 'http://localhost:8080/sanfatec/pergunta-secreta-usuario';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getPerguntas(): Observable<PerguntaSecreta[]> {
    return this.httpClient.get<PerguntaSecreta[]>(this.url).pipe(catchError(error => this.handleError(error)));
  }

  getPorUsuario(idUsuario: number): Observable<PerguntaSecretaUsuario> {
    return this.httpClient.get<PerguntaSecretaUsuario>(this.urlUsuario + '/buscarPorIdUsuario/' + idUsuario)
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
