import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  urlImagem: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private baseUrl = 'https://localhost:44353/api/produto';

  constructor(private http: HttpClient) {}

  buscarProdutosPorFiltro(filtro: string): Observable<any> {
    const params = new HttpParams().set('filtro', filtro);

    return this.http.get<Produto[]>(`${this.baseUrl}`, { params });
  }

  buscarProdutoEmDestaque(): Observable<any> {
    return this.http.get<Produto[]>(`${this.baseUrl}/destaque`);
  }

  buscarProdutoPorId(id: number): Observable<any> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }
}
