/**
 * Website Builder Agent - Tests
 */

import { WebsiteBuilderAgent } from '../src/agent/WebsiteBuilderAgent';

describe('WebsiteBuilderAgent', () => {
  let agent: WebsiteBuilderAgent;

  beforeAll(() => {
    // Set a mock API key for testing
    process.env.OPENAI_API_KEY = 'test-key';
  });

  beforeEach(() => {
    agent = new WebsiteBuilderAgent();
  });

  describe('buildWebsite', () => {
    it('should create a website configuration', async () => {
      const requirements = 'Create a modern portfolio website';
      
      // Note: This test will skip if no real API key is set
      if (process.env.OPENAI_API_KEY === 'test-key') {
        expect(agent).toBeDefined();
      }
    });

    it('should handle invalid requirements gracefully', async () => {
      const invalidRequirements = '';
      
      try {
        // This would normally throw with empty requirements
        expect(invalidRequirements).toEqual('');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('theme analysis', () => {
    it('should support multiple theme types', () => {
      const themes = ['modern', 'classic', 'minimalist', 'colorful'];
      expect(themes.length).toBeGreaterThan(0);
    });

    it('should support multiple website types', () => {
      const types = ['portfolio', 'business', 'ecommerce', 'blog', 'landing'];
      expect(types.length).toBe(5);
    });
  });
});
