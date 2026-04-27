import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { ThemeController } from './controllers/user/theme.controller';
import { UserController } from './controllers/user/user.controller';
import { QuizzEntity } from './entities/quizz.entity';
import { ThemeEntity } from './entities/theme.entity';
import { UserEntity } from './entities/user.entity';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { AuthService } from './services/auth/auth.service';
import { ThemeService } from './services/user/theme.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
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
      entities: [UserEntity, QuizzEntity, ThemeEntity],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([UserEntity, QuizzEntity, ThemeEntity]),
  ],
  controllers: [AppController, UserController, AuthController, ThemeController],
  providers: [AppService, UserService, AuthService, ThemeService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
