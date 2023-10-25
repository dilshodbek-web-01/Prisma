import { IsUUID, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { BookUpdateRequest } from "../interfaces";

export class BookUpdateDto implements Omit<BookUpdateRequest, 'id'> {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    price?: string

    @IsUUID()
    @IsNotEmpty()
    @IsOptional()
    authorId?: string
}