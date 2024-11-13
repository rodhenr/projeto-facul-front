import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FontAwesomeModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent {
  faTrash = faTrash;
  itensCarrinho: any[] = [];
  isUpdating: boolean = false;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
  }

  removeItem(produtoId: number): void {
    this.carrinhoService.removerCarrinho(produtoId);
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
  }

  aumentarQuantidade(produtoId: number): void {
    if (this.isUpdating) return;
    this.isUpdating = true;

    const item = this.itensCarrinho.find((i) => i.id === produtoId);
    if (item) {
      item.quantidade++;
      this.carrinhoService.atualizarQuantidadeItens(produtoId, item.quantidade);
    }

    setTimeout(() => (this.isUpdating = false), 300);
  }

  diminuirQuantidade(produtoId: number): void {
    if (this.isUpdating) return;
    this.isUpdating = true;

    const item = this.itensCarrinho.find((i) => i.id === produtoId);
    if (item && item.quantidade > 1) {
      item.quantidade--;
      this.carrinhoService.atualizarQuantidadeItens(produtoId, item.quantidade);
    }

    setTimeout(() => (this.isUpdating = false), 300);
  }

  obterPrecoItensTotal(): number {
    return this.itensCarrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }

  obterTaxaEntrega(): number {
    return this.obterPrecoItensTotal() >= 100 ? 0 : 30;
  }
}
