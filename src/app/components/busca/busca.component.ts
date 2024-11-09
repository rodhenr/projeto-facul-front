import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
})
export class BuscaComponent {
  faSearch = faSearch;
  busca: string = '';

  constructor(private router: Router) {}

  handleBusca(event: any) {
    this.busca = event.target.value;
  }

  handleInputEnter(event: Event) {
    //if (event.key === 'Enter') {
    this.router.navigate(['/busca'], { queryParams: { q: this.busca } });
    //}
  }

  redirecionarParaBusca(): void {
    this.router.navigate(['/busca'], { queryParams: { q: this.busca } });
  }
}
