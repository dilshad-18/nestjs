import { IsNotEmpty } from 'class-validator';

export class CreateTaslDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}