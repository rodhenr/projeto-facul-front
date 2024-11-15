import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

export interface ICadastro {
  nome: string | null;
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
  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  hasToken(): boolean {
    return !!this.localStorageService.obterItem('accessToken');
  }

  cadastrarUsuario(dadosCadastro: ICadastro): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastro`, dadosCadastro);
  }

  logarUsuario(dadosLogin: ILogin): Observable<any> {
    return this.http
      .post<ILoginResponse>(`${this.baseUrl}/login`, dadosLogin)
      .pipe(
        tap((resposta) => {
          if (!resposta) return;

          this.localStorageService.salvarItem(
            'accessToken',
            resposta.accessToken
          );
          this.localStorageService.salvarItem(
            'refreshToken',
            resposta.refreshToken
          );

          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout() {
    this.localStorageService.excluirItem('accessToken');
    this.localStorageService.excluirItem('refreshToken');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['']);
  }
}
