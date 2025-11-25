import OpenAI from 'openai';
import { logger } from '../utils/logger';

export class HtmlGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate(
    analysis: Record<string, any>,
    content: Record<string, string>
  ): Promise<string> {
    try {
      logger.info('Generating HTML structure');

      const pages = analysis.pages || ['home', 'about', 'contact'];
      const title = analysis.title || 'Website';

      const message = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Generate semantic HTML5 for a ${analysis.type} website with these pages: ${pages.join(', ')}.
            
Website Title: ${title}
Pages: ${JSON.stringify(pages)}
Type: ${analysis.type}

Generate clean, semantic HTML5 with proper structure. Include meta tags, responsive viewport, and basic accessibility features.
Return ONLY the HTML code, no markdown or explanations.`,
          },
        ],
        temperature: 0.7,
      });

      const html = message.choices[0].message.content || '';
      logger.info('HTML generated successfully');
      return html;
    } catch (error) {
      logger.error('Failed to generate HTML:', error);
      throw error;
    }
  }
}
