import { Component } from '@angular/core';
import { BuscaComponent } from '../busca/busca.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BuscaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
