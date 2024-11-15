import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private chaveCarrinho = 'carrinho';
  private quantidadeSubject = new BehaviorSubject<number>(0);

  constructor(private localStorageService: LocalStorageService) {
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
    const carrinho = this.localStorageService.obterItem(this.chaveCarrinho);
    return carrinho ? JSON.parse(carrinho) : [];
  }

  removerCarrinho(produtoId: number): void {
    let carrinho = this.obterCarrinho();

    carrinho = carrinho.filter((item) => item.id !== produtoId);

    this.salvarCarrinho(carrinho);
    this.atualizarQuantidadeCarrinho();
  }

  limparCarrinho(): void {
    this.localStorageService.excluirItem(this.chaveCarrinho);
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
    this.localStorageService.salvarItem(
      this.chaveCarrinho,
      JSON.stringify(carrinho)
    );
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
