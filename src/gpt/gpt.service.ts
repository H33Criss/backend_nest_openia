import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
    private openAi = new OpenAI({
        apiKey:process.env.OPENAI_API_KEY,
    });

    async orthographyCheck({prompt}:OrthographyDto){
        return await orthographyCheckUseCase(this.openAi,{prompt});
    }
    async prosConsDiscusser({prompt}:ProsConsDiscusserDto){
        return await prosConsDiscusserUseCase(this.openAi,{prompt});
    }
    async prosConsDiscusserStream({prompt}:ProsConsDiscusserDto){
        return await prosConsDiscusserStreamUseCase(this.openAi,{prompt});
    }
}
