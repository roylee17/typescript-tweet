import { TweetsService } from '../tweets.service';
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { TweetType } from './tweet.type';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { GqlAuthGuard } from 'src/auth/gql.auth-guard';
import { UseGuards } from '@nestjs/common';
import { GetGqlUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

@Resolver((of) => TweetType)
@UseGuards(GqlAuthGuard)
export class TweetsResolver {
  constructor(private tweetsService: TweetsService) {}

  @Query((returns) => [TweetType])
  listTweets(@GetGqlUser() user: User) {
    return this.tweetsService.listTweets(user);
  }

  @Mutation((returns) => TweetType, { nullable: true })
  createTweet(@Args('message') message: string, @GetGqlUser() user: User) {
    const createTweetDto: CreateTweetDto = { message };
    return this.tweetsService.createTweet(createTweetDto, user);
  }

  @Query((returns) => TweetType, { nullable: true })
  getTweet(@Args('id') id: string, @GetGqlUser() user: User) {
    return this.tweetsService.getTweet(id, user);
  }

  @Mutation((returns) => TweetType, { nullable: true })
  updateTweet(
    @Args('id') id: string,
    @Args('message') message: string,
    @GetGqlUser() user: User,
  ) {
    const updateTweetDto: UpdateTweetDto = { message };
    return this.tweetsService.updateTweet(id, updateTweetDto, user);
  }

  // What's the best practice for the return value?
  @Mutation((returns) => TweetType, { nullable: true })
  deleteTweet(@Args('id') id: string, @GetGqlUser() user: User) {
    this.tweetsService.deleteTweet(id, user);
    return null;
  }
}
