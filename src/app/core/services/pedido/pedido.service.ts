import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IItensPedido {
  produtoId: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://localhost:44353/api/usuario/pedidos';

  constructor(private http: HttpClient) {}

  obterItensPedidoLocal(): any[] {
    const itens = localStorage.getItem('carrinho');
    return itens ? JSON.parse(itens) : [];
  }

  calcularTotal() {
    const itens = this.obterItensPedidoLocal();
    return itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }

  calcularDesconto(cupom: string) {
    return cupom ? 10 : 0;
  }

  calcularTaxaEntrega(): number {
    return this.calcularTotal() >= 100 ? 0 : 30;
  }

  obterPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  salvarPedido(
    itensPedido: IItensPedido[],
    taxaEntrega: number,
    formaPagamento: string
  ): Observable<any> {
    return this.http.post<any[]>(this.apiUrl, {
      formaPagamento,
      taxaEntrega,
      itens: itensPedido,
    });
  }
}
