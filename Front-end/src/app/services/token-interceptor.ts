import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');  // Aquí iría la lógica para obtener el token (de un servicio, por ejemplo)
    console.log("token", token)
    // Clonar la petición para agregar el header de autorización
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Pasar la nueva petición con el token al siguiente manejador
    return next.handle(authReq);
  }
}
