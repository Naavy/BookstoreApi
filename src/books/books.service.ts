import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Book } from './book.entity';
import ImageKit from 'imagekit';
import * as dotenv from 'dotenv';
import { CreateBookDto } from './dto/create-book.dto';

dotenv.config();

const {
  IMAGEKIT_PUBLIC_API_KEY,
  IMAGEKIT_PRIVATE_API_KEY,
  IMAGEKIT_URL_ENDPOINT,
} = process.env;

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  imagekit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_API_KEY,
    privateKey: IMAGEKIT_PRIVATE_API_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });

  async getAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findById(id: number): Promise<Book> {
    return await this.booksRepository.findOne({ where: { id } });
  }

  async search(query: string): Promise<Book[]> {
    return this.booksRepository.find({
      where: {
        title: ILike(`%${query}%`),
      },
    });
  }

  async create(book: CreateBookDto): Promise<Book> {
    const newBook = { ...book, images: [] };
    return await this.booksRepository.save(newBook);
  }

  async delete(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async update(id: number, book: Book): Promise<Book> {
    await this.booksRepository.update(id, book);
    return this.findById(id);
  }

  async addImage(id: number, image: Express.Multer.File): Promise<Book> {
    const book = await this.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const uploadedPhoto = await this.imagekit.upload({
      file: image.buffer,
      fileName: image.originalname,
      folder: 'book-photos',
    });

    book.images.push(uploadedPhoto.url);
    return await this.update(id, book);
  }
}
