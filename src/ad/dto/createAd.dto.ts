import { IsNotEmpty } from 'class-validator';

export class CreateAdDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly type: string[];
  @IsNotEmpty()
  readonly hourlyRate: number;
  @IsNotEmpty()
  readonly description: string;

  readonly aboutAuthor?: string;

  readonly location?: string;

  readonly requiredSkills?: string[];

  readonly subject?: string;

  readonly tagList?: string[];

  readonly reccCount?: number;

  readonly studentNumber?: number;
}
