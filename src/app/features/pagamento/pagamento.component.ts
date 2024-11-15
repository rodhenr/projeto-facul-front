import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../core/services/carrinho/carrinho.service';
import { EnderecoService } from '../../core/services/endereco/endereco.service';
import { PedidoService } from '../../core/services/pedido/pedido.service';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {
  endereco: any;
  formaPagamento: string = 'boleto';
  cupom: string = '';
  taxaEntrega: number = 0;
  desconto: number = 0;
  total: number = 0;
  itensPedido: any[] = [];
  formEndereco: FormGroup;

  constructor(
    private enderecoService: EnderecoService,
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService,
    private router: Router
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
    this.enderecoService.obterEndereco().subscribe((endereco) => {
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
    });

    this.itensPedido = this.pedidoService.obterItensPedidoLocal();
    this.atualizarTotais();
  }

  atualizarTotais() {
    const valorPedido = this.pedidoService.calcularTotal();
    this.desconto = this.pedidoService.calcularDesconto(this.cupom);
    this.taxaEntrega = this.pedidoService.calcularTaxaEntrega();
    this.total = valorPedido + this.taxaEntrega - this.desconto;
  }

  confirmarPedido() {
    const itensPedido = this.pedidoService.obterItensPedidoLocal().map((x) => {
      return { produtoId: x.id, quantidade: x.quantidade };
    });

    this.taxaEntrega = this.pedidoService.calcularTaxaEntrega();
    this.pedidoService
      .salvarPedido(itensPedido, this.taxaEntrega, this.formaPagamento)
      .subscribe({
        next: () => {
          this.carrinhoService.limparCarrinho();
          alert('Pedido realizado!');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Erro ao salvar o pedido.');
        },
      });
  }

  calcularTotal() {
    return this.pedidoService.calcularTotal();
  }
}
