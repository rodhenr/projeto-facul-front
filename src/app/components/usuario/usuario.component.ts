import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { EnderecoService } from '../../services/endereco/endereco.service';
import { PedidoService } from '../../services/pedido/pedido.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  endereco: any = null;
  pedidos: any[] = [];
  mostrarFormularioEndereco: boolean = false;
  ehEdicao: boolean = false;

  formEndereco: FormGroup;

  constructor(
    private enderecoService: EnderecoService,
    private pedidoService: PedidoService,
    private authService: AuthService
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
  }

  carregarEndereco() {
    this.enderecoService.obterEndereco().subscribe((endereco) => {
      this.endereco = endereco;
      console.log(endereco);
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
    });
  }

  carregarPedidos() {
    this.pedidoService.obterPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  adicionarEndereco() {
    this.mostrarFormularioEndereco = true;
    this.ehEdicao = false;
    this.formEndereco.reset();
  }

  editarEndereco() {
    this.mostrarFormularioEndereco = !this.mostrarFormularioEndereco;
    this.ehEdicao = !this.ehEdicao;
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

  cancelarFormularioEndereco() {
    this.mostrarFormularioEndereco = false;
  }

  logout() {
    this.authService.logout();
  }
}
