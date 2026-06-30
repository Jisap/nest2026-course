import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';


/**
 * TransformInterceptor sirve para uniformizar todas las respuestas de la API
 * Se ejecuta ANTES de cualquier Exception Filter (manejo de errores) 
 * Se ejecuta DESPUÉS de que el request sea procesado por el controlador y antes de enviar la respuesta al cliente
 */

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response = context.switchToHttp().getResponse<Response>();  // Se obtiene la respuesta HTTP completa
    const statusCode = response.statusCode ?? 200                     // Se obtiene el código de estado de la respuesta

    return next.handle().pipe(                                        // Retorna un observable que transforma la respuesta
      map((data: T) => ({
        statusCode,
        message: "Success",
        data,
      }))
    )
  }
}
