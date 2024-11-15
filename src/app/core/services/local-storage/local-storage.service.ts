import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  obterItem(nome: string): any {
    return localStorage.getItem(nome);
  }

  salvarItem(nome: string, valor: string): void {
    localStorage.setItem(nome, valor);
  }

  excluirItem(nome: string): void {
    localStorage.removeItem(nome);
  }
}
