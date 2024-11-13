import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://localhost:44353/api/usuario/pedidos';

  constructor(private http: HttpClient) {}

  obterPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
