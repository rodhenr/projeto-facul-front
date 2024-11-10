import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Produto {
  nome: string;
  descricao: string;
  preco: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private baseUrl = 'https://localhost:44353/api/produto';

  constructor(private http: HttpClient) {}

  buscarProdutoPorId(id: number): Observable<any> {
    console.log(id);
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }
}
