import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface ICadastro {
  usuario: string | null;
  email: string | null;
  senha: string | null;
  confirmacaoSenha: string | null;
}

export interface ILogin {
  email: string;
  senha: string;
}

export interface ILoginResponse {
  userName: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:44353/api/auth';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(dadosCadastro: ICadastro): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastro`, dadosCadastro);
  }

  // TODO: Alterar para maior segurança
  logarUsuario(dadosLogin: ILogin): Observable<any> {
    return this.http
      .post<ILoginResponse>(`${this.baseUrl}/login`, dadosLogin)
      .pipe(
        tap((resposta) => {
          if (!resposta) return;

          localStorage.setItem('accessToken', resposta.accessToken);
          localStorage.setItem('refreshToken', resposta.refreshToken);
        })
      );
  }

  obterTokenAcesso(): string | null {
    return localStorage.getItem('accessToken');
  }

  excluirTokenAcesso() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
