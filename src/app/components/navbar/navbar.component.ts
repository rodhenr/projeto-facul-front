import { NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';
import { WindowSizeService } from '../../services/window-size/window-size.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, NgIf, NgStyle],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  windowWidth: number = 0;
  faUser = faUser;
  faCartShopping = faCartShopping;
  quantidadeItens: number = 0;

  constructor(
    private windowSizeService: WindowSizeService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.windowSizeService.width$.subscribe((width) => {
      this.windowWidth = width;
    });

    this.carrinhoService.obterQuantidadeItens$().subscribe((quantidade) => {
      this.quantidadeItens = quantidade;
    });
  }

  navegarBaseadoAutenticacao() {
    const token = localStorage.getItem('accessToken');

    if (token) {
      this.router.navigate(['/usuario']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
