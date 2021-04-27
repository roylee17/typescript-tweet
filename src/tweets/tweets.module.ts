import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TweetsController } from './rest/tweets.controller';
import { TweetsService } from './tweets.service';
import { TweetRepository } from './tweet.repository';
import { TweetsResolver } from './gql/tweet.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TweetRepository]), AuthModule],
  controllers: [TweetsController],
  providers: [TweetsService, TweetsResolver],
})
export class TweetsModule {}
