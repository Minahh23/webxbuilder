import OpenAI from 'openai';
import { logger } from '../utils/logger';

export class ContentGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate(analysis: Record<string, any>): Promise<Record<string, string>> {
    try {
      logger.info('Generating website content');

      const pages = analysis.pages || ['home', 'about', 'contact'];
      const type = analysis.type || 'landing';
      const contentStyle = analysis.contentStyle || 'professional';

      const content: Record<string, string> = {};

      for (const page of pages) {
        const message = await this.openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `Generate compelling ${contentStyle} content for the "${page}" page of a ${type} website.

Website Type: ${type}
Page: ${page}
Tone: ${contentStyle}

Include:
- Page title
- Meta description
- Key sections with headings
- Body paragraphs
- Call-to-action

Return as JSON with keys: title, description, sections (array of {heading, content})`,
            },
          ],
          temperature: 0.8,
        });

        const response = message.choices[0].message.content || '';
        try {
          const parsed = JSON.parse(response);
          content[page] = JSON.stringify(parsed);
        } catch {
          content[page] = response;
        }
      }

      logger.info('Content generated successfully');
      return content;
    } catch (error) {
      logger.error('Failed to generate content:', error);
      throw error;
    }
  }
}
