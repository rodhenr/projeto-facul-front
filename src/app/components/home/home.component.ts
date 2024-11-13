import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Produto,
  ProdutoService,
} from '../../services/produto/produto.service';
import { BuscaComponent } from '../busca/busca.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BuscaComponent, RouterModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.produtoService.buscarProdutoEmDestaque().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (erro) => console.log(erro),
    });
  }
}
