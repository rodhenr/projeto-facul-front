import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'busca', component: PesquisaComponent },
  { path: 'produto/:id', component: ProdutoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  {
    path: 'pagamento',
    component: PagamentoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [authGuard],
    children: [
      { path: 'pedidos', component: PedidosComponent },
      { path: 'enderecos', component: EnderecosComponent },
    ],
  },
];
