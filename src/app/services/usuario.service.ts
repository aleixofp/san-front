import { Usuario } from './../models/usuario';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.server_url + '/usuario';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  buscarUsuarioPorId(id: any): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.url + '/' + id, this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  login(login: string, senha: string): Observable<any>{
    return this.httpClient.post(this.url + '/login', JSON.stringify({login, senha}), this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  verificarEmail(email: string): Observable<any>{
    return this.httpClient.post(this.url + '/verificarEmail', JSON.stringify({email}), this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  cadastrar(usuario: Usuario): Observable<any>{
    return this.httpClient.post(this.url + '/cadastrar', JSON.stringify({usuario}), this.httpOptions)
      .pipe(catchError(error => this.handleError(error)));
  }

  atualizarNovaSenha(idUsuario: number, novaSenha: string): Observable<any> {
    return this.httpClient.post(this.url + '/atualizarNovaSenha', JSON.stringify({idUsuario, novaSenha}), this.httpOptions)
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
