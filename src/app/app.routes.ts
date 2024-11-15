import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { CarrinhoComponent } from './features/carrinho/carrinho.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { PagamentoComponent } from './features/pagamento/pagamento.component';
import { PesquisaComponent } from './features/pesquisa/pesquisa.component';
import { ProdutoComponent } from './features/produto/produto.component';
import { UsuarioComponent } from './features/usuario/usuario.component';

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
  },
];
