import { IsNotEmpty } from 'class-validator';

export class UpdateTweetDto {
  @IsNotEmpty()
  message: string;
}
