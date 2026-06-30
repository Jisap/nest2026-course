import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './utils/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());               // Transforma y valida los datos de entrada
  app.useGlobalInterceptors(new TransformInterceptor());  // Se aplica a todas las rutas y uniformiza la respuesta a un determinado formato
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
