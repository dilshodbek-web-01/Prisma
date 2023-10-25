import type { Book } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma";
import type { BookCreateRequest, BookUpdateRequest, BookDeleteRequest } from "./interfaces";

@Injectable()
export class BookService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async bookRetrieveAll(): Promise<Omit<Book, 'authorId' | 'createdAt' >[]> {
        return this.#_prisma.book.findMany({
            select: {
                id: true,
                title: true,
                price: true
            }
        })
    }

    async bookCreate(payload: BookCreateRequest): Promise<void> {
        await this.#_checkAuthor(payload.authorId)

        await this.#_prisma.book.create({
            data: {
                title: payload.title,
                price: payload.price,
                authorId: payload.authorId
            }
        })
    }

    async bookUpdate(payload: BookUpdateRequest): Promise<void> {
        await this.#_checkAuthor(payload.authorId)
        await this.#_checkBook(payload.id)

        await this.#_prisma.book.update({
            where: {
                id: payload.id
            },
            data: {
                title: payload.title,
                price: payload.price,
                authorId: payload.authorId
            }
        })
    }

    async bookDelete(payload: BookDeleteRequest) {
        await this.#_checkBook(payload.id)

        await this.#_prisma.book.delete({
            where: {
                id: payload.id
            }
        })
    }

    async #_checkAuthor(id: string): Promise<void> {
        const author = await this.#_prisma.author.findFirst({
            where: {
                id
            }
        })

        if (!author) {
            throw new NotFoundException('Author not found')
        }
    }

    async #_checkBook(id: string): Promise<void> {
        const book = await this.#_prisma.book.findFirst({
            where: {
                id
            }
        })

        if (!book) {
            throw new NotFoundException('Book not found')
        }
    }
}