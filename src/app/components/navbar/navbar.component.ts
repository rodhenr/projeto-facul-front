import { NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { WindowSizeService } from '../../services/window-size/window-size.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, NgIf, NgStyle],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  windowWidth: number = 0;
  faUser = faUser;
  faCartShopping = faCartShopping;

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnInit() {
    this.windowSizeService.width$.subscribe((width) => {
      this.windowWidth = width;
    });
  }
}
