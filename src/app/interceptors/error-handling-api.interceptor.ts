import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const errorHandlingApiInterceptor: HttpInterceptorFn = (req, next) => {
  // if there is any problem in api ( such as trying to access deleted employee ) or the server it will show alert message and navigate to home page 
  const _Router = inject(Router)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
     
     _Router.navigate(['/home'])
      return throwError(() => error);
    })
  ); 
};
