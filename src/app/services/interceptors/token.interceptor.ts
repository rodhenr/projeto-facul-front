import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoadingService } from '../loading/loading.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);
  const accessToken = authService.obterTokenAcesso();

  loadingService.exibirLoading();

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.excluirTokenAcesso();
        }
        return throwError(() => error);
      }),
      finalize(() => {
        loadingService.esconderLoading();
      })
    );
  }

  return next(req).pipe(
    finalize(() => {
      loadingService.esconderLoading();
    })
  );
};
