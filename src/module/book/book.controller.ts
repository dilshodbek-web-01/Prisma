import type { Book } from '@prisma/client';
import { Controller, HttpCode, HttpStatus,Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { IsUuidPipe } from '@validators';
import { BookCreateDto, BookUpdateDto } from './dtos';
import { BookService } from './book.service';

@Controller({
  path: '/book/',
  version: '1',
})
export class BookController {
  constructor(private readonly service: BookService) {
    this.service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Get('read')
  @ApiOkResponse({
    schema: {
      example: [
        {
          id: 1,
          title: 'Men',
          price: '49000'
        }
      ]
    }
  })
  bookRetrieveAll(): Promise<Omit<Book, 'authorId' | 'createdAt' >[]> {
    return this.service.bookRetrieveAll()
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('create')
  @ApiBody({ type: BookCreateDto })
  async bookCreate(@Body() body: BookCreateDto): Promise<void> {
    await this.service.bookCreate({
      ...body,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update/:id')
  @ApiParam({ name: 'id', example: 'fd0b345e-95af-48a9-87bc-a6a40bc301f6' })
  @ApiBody({ type: BookUpdateDto })
  async bookUpdate(
    @Param('id', IsUuidPipe) id: string,
    @Body() body: BookUpdateDto,
  ): Promise<void> {
    await this.service.bookUpdate({
      ...body,
      id,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  @ApiParam({ name: 'id', example: 'fd0b345e-95af-48a9-87bc-a6a40bc301f6' })
  async bookDelete(@Param('id', IsUuidPipe) id: string): Promise<void> {
    await this.service.bookDelete({
      id,
    });
  }
}
