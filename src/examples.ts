/**
 * Example usage of the Website Builder Agent
 * 
 * This file demonstrates how to use the agent programmatically
 */

import { WebsiteBuilderAgent } from './agent/WebsiteBuilderAgent';
import { logger } from './utils/logger';

async function exampleUsage() {
  try {
    const agent = new WebsiteBuilderAgent();

    // Example 1: Build a portfolio website
    logger.info('Example 1: Building a portfolio website...');
    const portfolioWebsite = await agent.buildWebsite(
      'Create a modern, minimalist portfolio website for a web designer. Include sections for work samples, about, and contact. Use blues and whites.'
    );
    logger.info(`Portfolio website created: ${portfolioWebsite.title}`);

    // Example 2: Build a business website
    logger.info('\nExample 2: Building a business website...');
    const businessWebsite = await agent.buildWebsite(
      'Professional B2B SaaS company website. Include features overview, pricing, testimonials, and blog section. Modern design with dark theme.'
    );
    logger.info(`Business website created: ${businessWebsite.title}`);

    // Example 3: Build an e-commerce site
    logger.info('\nExample 3: Building an e-commerce site...');
    const ecommerceWebsite = await agent.buildWebsite(
      'Online store for eco-friendly products. Include product categories, shopping cart, customer reviews, and sustainability information.'
    );
    logger.info(`E-commerce website created: ${ecommerceWebsite.title}`);

    // Display results
    console.log('\n=== Generated Websites ===');
    console.log(`1. ${portfolioWebsite.title} (${portfolioWebsite.type})`);
    console.log(`2. ${businessWebsite.title} (${businessWebsite.type})`);
    console.log(`3. ${ecommerceWebsite.title} (${ecommerceWebsite.type})`);

  } catch (error) {
    logger.error('Example failed:', error);
  }
}

// Uncomment to run examples
// exampleUsage();
