import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const produtoId = this.route.snapshot.paramMap.get('id');
    this.buscarProduto(Number(produtoId));
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
