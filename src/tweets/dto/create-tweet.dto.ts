import { IsNotEmpty } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  message: string;
}
