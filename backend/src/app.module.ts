import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import {UserController} from "./controllers/user/user.controller";
import {UserService} from "./services/user/user.service";
import {UserEntity} from "./entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./controllers/auth/auth.controller";
import {AuthService} from "./services/auth/auth.service";

console.log(process.env);
@Module({
  imports: [
    ConfigModule.forRoot(),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn:'1d'}
      }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT!,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
