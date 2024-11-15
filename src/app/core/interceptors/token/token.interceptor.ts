import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const loadingService = inject(LoadingService);
  const accessToken = localStorageService.obterItem('accessToken');

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
          localStorageService.excluirItem('accessToken');
          localStorageService.excluirItem('refreshToken');
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
