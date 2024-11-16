import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, ILogin } from '../../core/services/auth/auth.service';
import { LoadingService } from '../../core/services/loading/loading.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    senha: new FormControl(''),
  });
  isLoading: boolean = false;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService
  ) {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {
    const token = this.localStorageService.obterItem('accessToken');

    if (token) this.router.navigate(['/usuario']);
  }

  logarUsuario() {
    if (this.loginForm.valid) {
      const login: ILogin = {
        email: this.loginForm.value.email!,
        senha: this.loginForm.value.senha!,
      };

      this.AuthService.logarUsuario(login).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Erro ao efetuar o login');
        },
      });
    }
  }
}
