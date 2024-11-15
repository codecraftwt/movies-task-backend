import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLoginDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(16)
    @IsNotEmpty()
    readonly password: string;
}
