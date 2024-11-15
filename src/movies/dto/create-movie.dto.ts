import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateMovieDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly image: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly title: number;

    @IsNumber()
    @IsNotEmpty()
    readonly year: number;
}

