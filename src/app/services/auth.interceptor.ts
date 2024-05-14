import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('authToken');

  if(authToken) {
      req = req.clone({ 
          setHeaders: { Authorization: `Bearer ${authToken}`}
      });
  }
  return next(req);
};
