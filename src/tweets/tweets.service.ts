import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TweetRepository } from './tweet.repository';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(TweetRepository) private tweetRepository: TweetRepository,
  ) {}

  async listTweets(user: User): Promise<Tweet[]> {
    return this.tweetRepository.listTweets(user);
  }

  async createTweet(
    createTweetDto: CreateTweetDto,
    user: User,
  ): Promise<Tweet> {
    return this.tweetRepository.createTweet(createTweetDto, user);
  }

  async getTweet(id: string, user: User): Promise<Tweet> {
    return this.tweetRepository.findOne({ id, user });
  }

  async updateTweet(
    id: string,
    updateTweetDto: UpdateTweetDto,
    user: User,
  ): Promise<Tweet> {
    const tweet = await this.getTweet(id, user);
    tweet.message = updateTweetDto.message;
    await tweet.save();

    return tweet;
  }

  async deleteTweet(id: string, user: User): Promise<void> {
    const result = await this.tweetRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`not found`);
    }
  }
}
