import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  public getAllBoards(): Board[] {
    return this.boards;
  }

  public createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: randomUUID(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  public getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException('없는 게시물입니다.');
    }
    return board;
  }

  public deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  public updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
