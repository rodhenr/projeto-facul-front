import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, ILogin } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    senha: new FormControl(''),
  });

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');

    if (token) this.router.navigate(['/usuario']);
  }

  logarUsuario() {
    if (this.loginForm.valid) {
      const login: ILogin = {
        email: this.loginForm.value.email!,
        senha: this.loginForm.value.senha!,
      };

      this.AuthService.logarUsuario(login).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao logar usuário', error);
        }
      );
    }
  }
}
