import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * Esta función middleware valida la presencia y corrección de la API Key en el header de la solicitud
 * Si la API Key es válida, la solicitud continúa hacia el controlador
 * Si la API Key es inválida o no está presente, se lanza una excepción UnauthorizedException
 * 
 * Para se utilizada, se debe registrar en el AppModule como un middleware global
 * o como un middleware específico para un módulo, controlador o ruta
 */



@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const apikey = req.headers["x-api-key"]
    if (!apikey || apikey !== "secret-key-123") {
      throw new UnauthorizedException("Invalid API Key")
    }
    next();
  }
}
