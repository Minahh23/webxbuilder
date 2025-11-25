<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Website Builder Agent - Project Instructions

This is an AI-powered website generation agent that creates full websites on demand using OpenAI's GPT-4 model.

### Project Overview
- **Type**: TypeScript/Node.js backend service
- **Purpose**: Automated website generation via AI
- **Framework**: Express.js REST API
- **AI Model**: OpenAI GPT-4
- **Output**: Full HTML/CSS websites saved as files

### Key Components
1. **WebsiteBuilderAgent** - Core agent logic that orchestrates the generation process
2. **HtmlGenerator** - Generates semantic HTML5 structures
3. **StyleGenerator** - Creates responsive CSS styles
4. **ContentGenerator** - Produces page content using AI
5. **Express API** - REST endpoints for website generation

### Getting Started
1. Install Node.js (if not already installed)
2. Copy `.env.example` to `.env` and add your OpenAI API key
3. Run `npm install` to install dependencies
4. Run `npm run dev` for development or `npm start` for production
5. Access API at `http://localhost:3000`

### API Endpoints
- `POST /api/build` - Build a new website from requirements
- `GET /api/websites` - List all generated websites
- `GET /api/websites/:id` - Get details of a specific website
- `GET /health` - Health check

### Key Files
- `src/index.ts` - Application entry point
- `src/agent/WebsiteBuilderAgent.ts` - Main agent logic
- `src/api/express.ts` - API route handlers
- `src/generators/` - HTML, CSS, and content generators
- `SETUP.md` - Detailed setup instructions
- `README.md` - Full documentation

### Configuration
Environment variables (set in `.env`):
- `PORT` - Server port (default: 3000)
- `OPENAI_API_KEY` - OpenAI API key (required)
- `LOG_LEVEL` - Logging level (info/debug/error)
- `OUTPUT_DIR` - Directory for generated websites

### Development Workflow
```
npm run dev          # Start in development mode
npm run build        # Build TypeScript to JavaScript
npm test             # Run tests
npm run watch        # Watch mode for development
```

### Important Notes
- Requires valid OpenAI API key with GPT-4 access
- Generated websites are saved to `OUTPUT_DIR`
- Each website generation calls multiple AI models
- Consider API rate limits and costs

### Troubleshooting
- **Module not found**: Run `npm install` again
- **API key errors**: Verify your OpenAI key in `.env`
- **Port already in use**: Change PORT in `.env`
- **No response from AI**: Check API key credits and model availability
