import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';
import {
  Produto,
  ProdutoService,
} from '../../core/services/produto/produto.service';
import { BuscaComponent } from '../../shared/components/busca/busca.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [BuscaComponent, NgFor, RouterModule, LoadingComponent, NgIf],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.scss',
})
export class PesquisaComponent implements OnInit {
  produtos: Produto[] = [];
  filtro: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filtro = params['q'] || '';
      this.buscarProdutos();
    });

    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  buscarProdutos(): void {
    this.produtoService.buscarProdutosPorFiltro(this.filtro).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: () => alert('Erro ao recuperar informações dos produtos'),
    });
  }
}
