import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController], // Solicitud (request) llega 1º al controlador -> Servicio -> Base de datos -> Servicio -> Controlador -> Respuesta
  providers: [UserService]
})
export class UserModule { }
