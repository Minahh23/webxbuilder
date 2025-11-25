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
      logger.info('Generating CSS styles with Tailwind + Bootstrap');

      const palette = analysis.palette || ['#2563eb', '#1e40af', '#ffffff'];
      const theme = analysis.theme || 'modern';

      const message = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Generate a modern CSS stylesheet that combines Tailwind CSS utility classes and Bootstrap components for a ${theme} themed website.

Color Palette: ${palette.join(', ')}
Theme: ${theme}
Type: ${analysis.type}

Use:
- Tailwind CSS utility-first classes (e.g., flex, grid, m-4, p-6, text-lg, hover:bg-blue-500)
- Bootstrap 5 component classes where appropriate (e.g., btn, btn-primary, container, row, col-md-6)
- CSS custom properties (variables) for the color palette
- Responsive design with Tailwind breakpoints (sm:, md:, lg:, xl:)
- Modern animations and transitions using Tailwind and custom CSS
- Dark mode support using Tailwind's dark: prefix

Return complete CSS/Tailwind configuration:
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'bootstrap/dist/css/bootstrap.min.css';

:root {
  --primary: ${palette[0]};
  --secondary: ${palette[1]};
  --background: ${palette[2]};
}

[Your custom component styles and utility overrides here]

Include utility classes for common components and ensure Bootstrap grid system integration.`,
          },
        ],
        temperature: 0.7,
      });

      const css = message.choices[0].message.content || '';
      logger.info('CSS generated successfully with Tailwind + Bootstrap');
      return css;
    } catch (error) {
      logger.error('Failed to generate CSS:', error);
      throw error;
    }
  }
}
