import { IsNotEmpty, IsString } from "class-validator";

export class ProsConsDiscusserDto{

    @IsString()
    @IsNotEmpty()
    readonly prompt:string;
}