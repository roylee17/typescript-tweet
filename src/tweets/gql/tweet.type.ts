import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Tweet')
export class TweetType {
  @Field((type) => ID)
  id: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
