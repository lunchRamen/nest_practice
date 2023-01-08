import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty({ message: '제목은 필수 입력사항입니다.' })
  title: string;

  @IsNotEmpty()
  description: string;
}
