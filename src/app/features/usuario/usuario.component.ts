import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { EnderecoService } from '../../core/services/endereco/endereco.service';
import { LoadingService } from '../../core/services/loading/loading.service';
import { PedidoService } from '../../core/services/pedido/pedido.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  endereco: any = null;
  pedidos: any[] = [];
  mostrarFormularioEndereco: boolean = false;
  ehEdicao: boolean = false;
  formEndereco: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private enderecoService: EnderecoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.formEndereco = new FormGroup({
      rua: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.carregarEndereco();
    this.carregarPedidos();

    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  carregarEndereco() {
    this.enderecoService.obterEndereco().subscribe({
      next: (endereco) => {
        this.isError = false;
        this.endereco = endereco;

        if (endereco) {
          this.formEndereco.setValue({
            rua: endereco.rua,
            numero: endereco.numero,
            cidade: endereco.cidade,
            uf: endereco.uf,
            bairro: endereco.bairro,
            cep: endereco.cep,
          });
        }
      },
      error: () => {
        this.isError = true;
        alert('Erro ao buscar endereços.');
      },
    });
  }

  carregarPedidos() {
    this.pedidoService.obterPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.isError = false;
      },
      error: () => {
        this.isError = true;
        alert('Erro ao buscar pedidos.');
      },
    });
  }

  adicionarEndereco() {
    this.mostrarFormularioEndereco = true;
    this.ehEdicao = false;
    this.formEndereco.reset();
  }

  editarEndereco() {
    this.mostrarFormularioEndereco = !this.mostrarFormularioEndereco;
    this.ehEdicao = true;
  }

  enviarFormulario() {
    if (this.formEndereco.invalid) {
      return;
    }

    const endereco = this.formEndereco.value;
    if (this.ehEdicao) {
      this.enderecoService.atualizarEndereco(endereco).subscribe(() => {
        this.carregarEndereco();
        this.mostrarFormularioEndereco = false;
      });
    } else {
      this.enderecoService.adicionarEndereco(endereco).subscribe(() => {
        this.carregarEndereco();
        this.mostrarFormularioEndereco = false;
      });
    }
  }

  mostrarDetalhes(pedido: any) {
    pedido.exibirDetalhes = !pedido.exibirDetalhes;
  }

  cancelarFormularioEndereco() {
    this.mostrarFormularioEndereco = false;
  }

  logout() {
    this.authService.logout();
  }

  calcularTotalItens(itens: any[]) {
    return itens.reduce(
      (total, item) => total + item.produtoPreco * item.produtoQuantidade,
      0
    );
  }
}
