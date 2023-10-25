import { IsUUID, IsString, IsNotEmpty, ValidateIf, IsOptional, IsMimeType } from "class-validator";
import { BookCreateRequest } from "../interfaces";

export class BookCreateDto implements BookCreateRequest {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    price: string
    
    @IsUUID()
    @IsNotEmpty()
    authorId: string

    @ValidateIf((object: BookCreateDto) => !object.mimetype)
    @IsNotEmpty()
    @IsOptional()
    image?: string

    @ValidateIf((object: BookCreateDto) => !object.image)
    @IsMimeType()
    @IsNotEmpty()
    @IsOptional()
    mimetype?: string
}