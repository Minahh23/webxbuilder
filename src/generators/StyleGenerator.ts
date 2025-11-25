import OpenAI from 'openai';
import { logger } from '../utils/logger';

export class StyleGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate(analysis: Record<string, any>): Promise<string> {
    try {
      logger.info('Generating CSS styles');

      const palette = analysis.palette || ['#2563eb', '#1e40af', '#ffffff'];
      const theme = analysis.theme || 'modern';

      const message = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Generate modern, responsive CSS for a ${theme} themed website.

Color Palette: ${palette.join(', ')}
Theme: ${theme}
Type: ${analysis.type}

Create a complete CSS file with:
- Responsive design
- Mobile-first approach
- CSS variables for colors
- Smooth transitions and animations
- Typography styles
- Layout components

Return ONLY CSS code, no markdown or explanations.`,
          },
        ],
        temperature: 0.7,
      });

      const css = message.choices[0].message.content || '';
      logger.info('CSS generated successfully');
      return css;
    } catch (error) {
      logger.error('Failed to generate CSS:', error);
      throw error;
    }
  }
}
