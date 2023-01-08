import { BadRequestException } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  public transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException('상태는 PUBLIC PRIVATE만 가능합니다.');
    }
    return value;
  }

  private isStatusValid(status: any) {
    //statusOptions에 대한 index를 return. 있으면 해당 index를, 없으면 -1을 return.
    //return으로 -1이 아니면 true -1이면 false를 return하기 때문에 위의 조건문이 나오는 것.
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
