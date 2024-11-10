import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuscaComponent } from '../busca/busca.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BuscaComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
