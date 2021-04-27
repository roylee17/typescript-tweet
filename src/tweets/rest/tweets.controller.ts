import { CreateTweetDto } from '../dto/create-tweet.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Tweet } from '../tweet.entity';
import { TweetsService } from '../tweets.service';
import { GetHttpUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

@UseGuards(AuthGuard())
@Controller('tweets')
export class TweetsController {
  constructor(private tweetService: TweetsService) {}

  @Get()
  listTweets(@GetHttpUser() user: User): Promise<Tweet[]> {
    return this.tweetService.listTweets(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTweet(
    @Body() createTweetDto: CreateTweetDto,
    @GetHttpUser() user: User,
  ): Promise<Tweet> {
    return this.tweetService.createTweet(createTweetDto, user);
  }

  @Get('/:id')
  getTweet(
    @Param('id', ParseUUIDPipe) id: string,
    @GetHttpUser() user: User,
  ): Promise<Tweet> {
    return this.tweetService.getTweet(id, user);
  }

  @Patch('/:id')
  updateTweet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTweetDto: UpdateTweetDto,
    @GetHttpUser() user: User,
  ): Promise<Tweet> {
    return this.tweetService.updateTweet(id, updateTweetDto, user);
  }

  @Delete('/:id')
  deleteTweet(
    @Param('id', ParseUUIDPipe) id: string,
    @GetHttpUser() user: User,
  ): Promise<void> {
    return this.tweetService.deleteTweet(id, user);
  }
}
