import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Produto,
  ProdutoService,
} from '../../services/produto/produto.service';
import { BuscaComponent } from '../busca/busca.component';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [BuscaComponent, NgFor, RouterModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.scss',
})
export class PesquisaComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.produtoService.buscarProdutos().subscribe({
      next: (produtos) => {
        console.log(produtos);
        this.produtos = produtos;
      },
      error: (erro) => console.log(erro),
    });
  }
}
