import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';

// Adds the JWT to every API request except login and register
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(BROWSER_STORAGE);
  const token = storage.getItem('travlr-token');
  const isAuthApi = req.url.endsWith('/login') || req.url.endsWith('/register');

  if (token && !isAuthApi) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }
  return next(req);
};