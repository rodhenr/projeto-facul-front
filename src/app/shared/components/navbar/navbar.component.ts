import { NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { CarrinhoService } from '../../../core/services/carrinho/carrinho.service';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { WindowSizeService } from '../../../core/services/window-size/window-size.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, NgIf, NgStyle],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  faCartShopping = faCartShopping;
  windowWidth: number = 0;
  quantidadeItens: number = 0;

  constructor(
    private windowSizeService: WindowSizeService,
    private carrinhoService: CarrinhoService,
    private localStorageService: LocalStorageService,
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
    const token = this.localStorageService.obterItem('accessToken');

    if (token) {
      this.router.navigate(['/usuario']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
