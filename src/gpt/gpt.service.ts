import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  translateUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck({ prompt }: OrthographyDto) {
    return await orthographyCheckUseCase(this.openAi, { prompt });
  }
  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openAi, { prompt, lang });
  }
  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openAi, { prompt });
  }
  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openAi, { prompt });
  }
}
