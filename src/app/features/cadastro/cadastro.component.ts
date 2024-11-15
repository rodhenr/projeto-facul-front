import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, ICadastro } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  cadastroForm = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl('', Validators.email),
    senha: new FormControl(''),
    confirmacaoSenha: new FormControl(''),
  });

  constructor(private AuthService: AuthService, private router: Router) {}

  cadastrarUsuario() {
    if (this.cadastroForm.valid) {
      const cadastro: ICadastro = {
        nome: this.cadastroForm.value.nome!,
        email: this.cadastroForm.value.email!,
        senha: this.cadastroForm.value.senha!,
        confirmacaoSenha: this.cadastroForm.value.confirmacaoSenha!,
      };

      this.AuthService.cadastrarUsuario(cadastro).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Erro ao cadastrar');
        },
      });
    }
  }
}
