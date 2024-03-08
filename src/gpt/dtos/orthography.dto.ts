import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class OrthographyDto{
    @IsString()
    @IsNotEmpty()
    readonly prompt:string;
    @IsInt()
    @IsOptional()
    readonly maxTokens:number;
}