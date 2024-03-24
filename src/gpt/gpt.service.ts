import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import {
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async imageGenerationGetter(filename: string) {
    const filePath = path.resolve('./', './generated/images/', filename);
    const exists = fs.existsSync(filePath);

    if (!exists) {
      throw new NotFoundException('File not found');
    }

    return filePath;
  }
  async imageVariation(imageVariationDto: ImageVariationDto) {
    return await imageVariationUseCase(this.openAi, { ...imageVariationDto });
  }
  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openAi, { ...imageGenerationDto });
  }

  async audioToText(
    audioFile: Express.Multer.File,
    { prompt }: AudioToTextDto,
  ) {
    return await audioToTextUseCase(this.openAi, { prompt, audioFile });
  }
  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openAi, { prompt, voice });
  }
  async textToAudioGetter(fileId: string): Promise<string> {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios',
      `${fileId}.mp3`,
    );
    const wasFound = fs.existsSync(filePath);
    if (!wasFound) throw new NotFoundException(`File "${fileId}" not found.`);
    return filePath;
  }
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
