import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private chaveCarrinho = 'carrinho';
  private quantidadeSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.atualizarQuantidadeCarrinho();
  }

  adicionarCarrinho(produto: any): void {
    const carrinho = this.obterCarrinho();
    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (!itemExistente) {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    this.salvarCarrinho(carrinho);
    this.atualizarQuantidadeCarrinho();
  }

  obterCarrinho(): any[] {
    const cart = localStorage.getItem(this.chaveCarrinho);
    return cart ? JSON.parse(cart) : [];
  }

  removerCarrinho(produtoId: number): void {
    let carrinho = this.obterCarrinho();
    carrinho = carrinho.filter((item) => item.id !== produtoId);
    this.salvarCarrinho(carrinho);
    this.atualizarQuantidadeCarrinho();
  }

  atualizarQuantidadeItens(produtoId: number, quantidade: number): void {
    const carrinho = this.obterCarrinho();
    const item = carrinho.find((item) => item.id === produtoId);

    if (item) {
      if (quantidade > 0 && quantidade !== item.quantidade) {
        item.quantidade = quantidade;
        this.salvarCarrinho(carrinho);
        this.atualizarQuantidadeCarrinho();
      }
    }
  }

  private salvarCarrinho(carrinho: any[]): void {
    localStorage.setItem(this.chaveCarrinho, JSON.stringify(carrinho));
  }

  private atualizarQuantidadeCarrinho(): void {
    const carrinho = this.obterCarrinho();
    const quantidadeTotal = carrinho.length;
    this.quantidadeSubject.next(quantidadeTotal);
  }

  obterQuantidadeItens$() {
    return this.quantidadeSubject.asObservable();
  }
}
