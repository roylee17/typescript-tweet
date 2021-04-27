import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsModule } from './tweets/tweets.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TweetsModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
