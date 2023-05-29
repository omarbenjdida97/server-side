import { IsEmail } from 'class-validator';

export class UpdateuserDto {
  readonly username: string;

  @IsEmail()
  readonly email: string;

  readonly bio: string;

  readonly image: string;
}
