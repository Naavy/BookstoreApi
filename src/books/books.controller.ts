import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { Public } from 'src/auth/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Public()
  @Get('/search')
  async searchBooks(@Query('q') query: string): Promise<Book[]> {
    return this.booksService.search(query);
  }

  @Public()
  @Get('/:id')
  getBook(@Param('id') id: number) {
    return this.booksService.findById(id);
  }

  @Public()
  @Get()
  getBooks() {
    return this.booksService.getAll();
  }

  @Post()
  addBook(@Body() body: CreateBookDto) {
    return this.booksService.create(body);
  }

  @Delete('/:id')
  @HttpCode(204)
  removeBook(@Param('id') id: string) {
    return this.booksService.delete(+id);
  }

  @Put('/:id')
  editBook(@Param('id') id: string, @Body() body: Book) {
    return this.booksService.update(+id, body);
  }

  @Put(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  async addImageToBook(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Book> {
    return this.booksService.addImage(id, image);
  }
}
