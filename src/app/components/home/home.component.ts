import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';
import {
  Produto,
  ProdutoService,
} from '../../services/produto/produto.service';
import { BuscaComponent } from '../busca/busca.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BuscaComponent, RouterModule, NgFor, NgIf, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private produtoService: ProdutoService,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

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
