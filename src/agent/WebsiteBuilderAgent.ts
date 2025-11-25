import OpenAI from 'openai';
import { HtmlGenerator } from '../generators/HtmlGenerator';
import { StyleGenerator } from '../generators/StyleGenerator';
import { ContentGenerator } from '../generators/ContentGenerator';
import { WebsiteConfig } from '../types/WebsiteConfig';
import { logger } from '../utils/logger';

export class WebsiteBuilderAgent {
  private openai: OpenAI;
  private htmlGenerator: HtmlGenerator;
  private styleGenerator: StyleGenerator;
  private contentGenerator: ContentGenerator;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.htmlGenerator = new HtmlGenerator();
    this.styleGenerator = new StyleGenerator();
    this.contentGenerator = new ContentGenerator();
  }

  async buildWebsite(requirements: string): Promise<WebsiteConfig> {
    try {
      logger.info(`Building website with requirements: ${requirements}`);

      // Step 1: Analyze requirements using AI
      const analysis = await this.analyzeRequirements(requirements);

      // Step 2: Generate content
      const content = await this.contentGenerator.generate(analysis);

      // Step 3: Generate styles
      const styles = await this.styleGenerator.generate(analysis);

      // Step 4: Generate HTML structure
      const html = await this.htmlGenerator.generate(analysis, content);

      const config: WebsiteConfig = {
        title: analysis.title,
        description: analysis.description,
        type: analysis.type,
        pages: analysis.pages,
        html,
        styles,
        content,
        metadata: {
          createdAt: new Date(),
          theme: analysis.theme,
          palette: analysis.palette,
        },
      };

      logger.info(`Website built successfully: ${config.title}`);
      return config;
    } catch (error) {
      logger.error('Failed to build website:', error);
      throw error;
    }
  }

  private async analyzeRequirements(requirements: string) {
    const message = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Analyze this website requirement and provide a structured plan in JSON format:
          
Requirements: ${requirements}

Return a JSON object with these fields:
{
  "title": "Website Title",
  "description": "Brief description",
  "type": "portfolio|business|ecommerce|blog|landing",
  "pages": ["page1", "page2"],
  "theme": "modern|classic|minimalist|colorful",
  "palette": ["color1", "color2", "color3"],
  "features": ["feature1", "feature2"],
  "contentStyle": "formal|casual|creative"
}`,
        },
      ],
      temperature: 0.7,
    });

    const content = message.choices[0].message.content;
    if (!content) throw new Error('No response from AI');

    try {
      return JSON.parse(content);
    } catch {
      logger.warn('Failed to parse AI response as JSON, using defaults');
      return {
        title: 'Untitled Website',
        description: requirements,
        type: 'landing',
        pages: ['home', 'about', 'contact'],
        theme: 'modern',
        palette: ['#2563eb', '#1e40af', '#0c4a6e'],
        features: [],
        contentStyle: 'professional',
      };
    }
  }
}
