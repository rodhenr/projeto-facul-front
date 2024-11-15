import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';
import {
  Produto,
  ProdutoService,
} from '../../core/services/produto/produto.service';
import { BuscaComponent } from '../../shared/components/busca/busca.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BuscaComponent,
    LoadingComponent,
    RouterModule,
    NgFor,
    NgIf,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];
  isLoading: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private loadingService: LoadingService
  ) {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.produtoService.buscarProdutoEmDestaque().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: () => alert('Ocorreu um erro ao carregar os produtos'),
    });
  }
}
