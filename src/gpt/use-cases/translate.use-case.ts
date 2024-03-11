import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;

  return await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
      { role: 'user', content: prompt },
    ],
    stream: true,
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.7,
    max_tokens: 500,
  });
};
