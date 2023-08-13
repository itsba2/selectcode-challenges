import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'KEEP ME IN A .ENV FILE',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000, // 10 minutes
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
