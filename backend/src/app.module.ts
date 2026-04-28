import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { UserEntity } from './entities/user.entity';
import { QuizzEntity } from './entities/quizz.entity';
import { ThemeEntity } from './entities/theme.entity';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';

console.log(process.env);
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
