import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';
import { UserController } from './user/user.controller';

@Module({                                                           // @Module() decorator define un módulo para la app y especifica su estructura
  imports: [UserModule],                                            // imports: Array de módulos cuyos módulos, controladores y proveedores serán importados
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {                      // AppModule implementa NestModule para poder usar el método configure
  configure(consumer: MiddlewareConsumer) {                         // configure recibe un objeto MiddlewareConsumer para configurar middlewares
    consumer.apply(ApiKeyMiddleware).forRoutes(UserController);     // El middleware se aplicará a todas las rutas del controlador UserController -> valida la API Key
  }
}
