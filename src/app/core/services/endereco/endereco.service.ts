import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private apiUrl = 'https://localhost:44353/api/usuario/enderecos';

  constructor(private http: HttpClient) {}

  obterEndereco(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  adicionarEndereco(endereco: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, endereco);
  }

  atualizarEndereco(endereco: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, endereco);
  }
}
