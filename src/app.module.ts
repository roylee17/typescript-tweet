import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
