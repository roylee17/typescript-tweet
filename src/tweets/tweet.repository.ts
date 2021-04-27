import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { v4 as uuid } from 'uuid';

@EntityRepository(Tweet)
export class TweetRepository extends Repository<Tweet> {
  async listTweets(user: User): Promise<Tweet[]> {
    const query = this.createQueryBuilder(
      'tweet',
    ).where('tweet.user.id = :userId', { userId: user.id });

    const tweets = await query.getMany();

    return tweets;
  }

  async createTweet(
    createTweetDto: CreateTweetDto,
    user: User,
  ): Promise<Tweet> {
    const { message } = createTweetDto;
    const tweet = new Tweet();
    tweet.id = uuid();
    tweet.message = message;
    tweet.user = user;
    await tweet.save();

    delete tweet.user;

    return tweet;
  }
}
