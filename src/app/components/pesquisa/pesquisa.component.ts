import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuscaComponent } from '../busca/busca.component';

interface Props {
  id: number;
  imagem: string;
  nome: string;
}

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [BuscaComponent, NgFor, RouterModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.scss',
})
export class PesquisaComponent {
  produtos: Props[] = [];

  constructor() {
    this.produtos = [
      {
        id: 1,
        imagem:
          'https://bromabakery.com/wp-content/uploads/2023/03/Single-Serve-Vanilla-Cupcake-2-1067x1600.jpg',
        nome: '',
      },
      {
        id: 2,
        imagem:
          'https://bromabakery.com/wp-content/uploads/2023/03/Single-Serve-Vanilla-Cupcake-2-1067x1600.jpg',
        nome: '',
      },
      {
        id: 3,
        imagem:
          'https://bromabakery.com/wp-content/uploads/2023/03/Single-Serve-Vanilla-Cupcake-2-1067x1600.jpg',
        nome: '',
      },
      {
        id: 4,
        imagem:
          'https://bromabakery.com/wp-content/uploads/2023/03/Single-Serve-Vanilla-Cupcake-2-1067x1600.jpg',
        nome: '',
      },
      {
        id: 5,
        imagem:
          'https://bromabakery.com/wp-content/uploads/2023/03/Single-Serve-Vanilla-Cupcake-2-1067x1600.jpg',
        nome: '',
      },
    ];
  }
}
