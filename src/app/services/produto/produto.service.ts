import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private baseUrl = 'https://localhost:44353/api/produto';

  constructor(private http: HttpClient) {}

  buscarProdutos(): Observable<any> {
    return this.http.get<Produto[]>(`${this.baseUrl}`);
  }

  buscarProdutoEmDestaque(): Observable<any> {
    return this.http.get<Produto[]>(`${this.baseUrl}/destaque`);
  }

  buscarProdutoPorId(id: number): Observable<any> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }
}
