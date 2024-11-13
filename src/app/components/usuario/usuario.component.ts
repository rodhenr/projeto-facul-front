import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
})
export class UsuarioComponent {
  constructor(private router: Router) {}

  navegarPara(pagina: string) {
    this.router.navigate([`/usuario/${pagina}`]);
  }
}
