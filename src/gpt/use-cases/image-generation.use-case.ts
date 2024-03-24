import * as fs from 'fs';
import OpenAI from 'openai';
import path from 'path';
import { downloadBase64ImageAsPng, downloadImageAsPng } from 'src/helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, maskImage, originalImage } = options;

  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt: prompt,
      model: 'dall-e-2',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    // TODO: Guardar la img en filesystem
    const promises = response.data.map(async (img) => {
      const fileName = await downloadImageAsPng(img.url);
      const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;
      return url;
    });

    const urls = await Promise.all(promises);

    return {
      // url: response.data[0].url,
      url: urls,
      localPath: '',
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  const pngImagePath = await downloadImageAsPng(originalImage, true);
  const maskPath = await downloadBase64ImageAsPng(maskImage, true);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt: prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });
  // TODO: Guardar la img en filesystem
  const promises = response.data.map(async (img) => {
    const fileName = await downloadImageAsPng(img.url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;
    return url;
  });

  const urls = await Promise.all(promises);

  // const localImagePath =  await downloadImageAsPng(response.data[0].url);
  // const fileName = path.basename(localImagePath)
  // const publicUrl = `localhost:3000/${fileName}`
  return {
    // url: response.data[0].url,
    url: urls,
    localPath: '',
    revised_prompt: response.data[0].revised_prompt,
  };
};
