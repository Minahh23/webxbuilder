import dotenv from 'dotenv';
import { WebsiteBuilderAgent } from './agent/WebsiteBuilderAgent';
import { setupExpress } from './api/express';
import { logger } from './utils/logger';

dotenv.config();

async function main() {
  try {
    const port = process.env.PORT || 3000;
    
    // Initialize the website builder agent
    const agent = new WebsiteBuilderAgent();
    
    // Setup Express API
    const app = setupExpress(agent);
    
    app.listen(port, () => {
      logger.info(`Website Builder Agent running on port ${port}`);
      logger.info(`API available at http://localhost:${port}`);
    });
  } catch (error) {
    logger.error('Failed to start agent:', error);
    process.exit(1);
  }
}

main();
