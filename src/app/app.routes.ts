import { Routes } from '@angular/router';
import { BuscaComponent } from './components/busca/busca.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { ProdutoComponent } from './components/produto/produto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'pagamento', component: PagamentoComponent },
];
