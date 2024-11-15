import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../../core/services/carrinho/carrinho.service';
import { LoadingService } from '../../core/services/loading/loading.service';
import {
  Produto,
  ProdutoService,
} from '../../core/services/produto/produto.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, NgIf, LoadingComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent implements OnInit {
  produto: Produto | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const produtoId = this.route.snapshot.paramMap.get('id');
    this.buscarProduto(Number(produtoId));

    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  adicionarCarrinho(): void {
    if (this.produto !== null) {
      this.carrinhoService.adicionarCarrinho({
        id: this.produto.id,
        nome: this.produto.nome,
        preco: this.produto.preco,
        urlImagem: this.produto.urlImagem,
        quantidade: 1,
      });

      alert('Produto adicionado ao carrinho!');
    }
  }

  buscarProduto(id: number): void {
    this.produtoService.buscarProdutoPorId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
      },
      error: () => alert('Erro ao recuperar informações do produto'),
    });
  }
}
