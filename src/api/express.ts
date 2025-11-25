import express, { Express, Request, Response } from 'express';
import { WebsiteBuilderAgent } from '../agent/WebsiteBuilderAgent';
import { logger } from '../utils/logger';
import fs from 'fs-extra';
import path from 'path';

export function setupExpress(agent: WebsiteBuilderAgent): Express {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'website-builder-agent' });
  });

  // Build website endpoint
  app.post('/api/build', async (req: Request, res: Response) => {
    try {
      const { requirements, options } = req.body;

      if (!requirements) {
        return res.status(400).json({ error: 'Requirements are required' });
      }

      logger.info(`Build request received: ${requirements}`);
      const websiteConfig = await agent.buildWebsite(requirements);

      // Save generated files
      const outputDir = process.env.OUTPUT_DIR || './generated_sites';
      const siteDir = path.join(outputDir, websiteConfig.title.replace(/\s+/g, '-'));

      await fs.ensureDir(siteDir);
      await fs.writeFile(path.join(siteDir, 'index.html'), websiteConfig.html);
      await fs.writeFile(path.join(siteDir, 'styles.css'), websiteConfig.styles);
      await fs.writeFile(
        path.join(siteDir, 'content.json'),
        JSON.stringify(websiteConfig.content, null, 2)
      );
      await fs.writeFile(
        path.join(siteDir, 'config.json'),
        JSON.stringify(websiteConfig, null, 2)
      );

      res.json({
        success: true,
        website: websiteConfig,
        outputPath: siteDir,
      });
    } catch (error) {
      logger.error('Build failed:', error);
      res.status(500).json({
        error: 'Failed to build website',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // Get generated websites
  app.get('/api/websites', async (_req: Request, res: Response) => {
    try {
      const outputDir = process.env.OUTPUT_DIR || './generated_sites';
      const sites = await fs.readdir(outputDir).catch(() => []);
      res.json({ sites });
    } catch (error) {
      logger.error('Failed to list websites:', error);
      res.status(500).json({ error: 'Failed to list websites' });
    }
  });

  // Get website details
  app.get('/api/websites/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const outputDir = process.env.OUTPUT_DIR || './generated_sites';
      const configPath = path.join(outputDir, id, 'config.json');

      const config = await fs.readJSON(configPath);
      res.json(config);
    } catch (error) {
      logger.error('Failed to get website:', error);
      res.status(404).json({ error: 'Website not found' });
    }
  });

  return app;
}
