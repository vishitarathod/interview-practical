import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private route: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if (!token) {
      this.route.navigate(['/auth'])
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request).pipe(catchError((err:any)=>{
      console.log();

      if(err?.error?.error?.includes('jwt expired') || err?.error?.error?.includes('Unauthorize')){
        localStorage.removeItem("token");
        this.route.navigate(['/auth']);
      }
      return throwError(err)
    }))
  }
}
