import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{
  apiUrl: string;

  constructor() { 
    this.apiUrl = environment.site;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Manejo del error de autenticación (ejemplo)
          alert('No estás autorizado para realizar esta acción, solo el admin de Nexion puede hacerlo.');
        } else if (error.status === 404) {
          // Manejo del error de recurso no encontrado (ejemplo)
          alert('El recurso solicitado no se encontró.');
        } else {
          // Manejo de otros errores (ejemplo)
          alert('Ha ocurrido un error inesperado.');
        }

        return throwError(error);
      })
    );
  }
}
