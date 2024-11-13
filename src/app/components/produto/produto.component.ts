import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';
import {
  Produto,
  ProdutoService,
} from '../../services/produto/produto.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent implements OnInit {
  produto: Produto | null = null;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    const produtoId = this.route.snapshot.paramMap.get('id');
    this.buscarProduto(Number(produtoId));
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
    }
  }

  buscarProduto(id: number): void {
    this.produtoService.buscarProdutoPorId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
      },
      error: (erro) => console.log(erro),
    });
  }
}
