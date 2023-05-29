import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  readonly body: string;
}
