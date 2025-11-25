# Website Builder Agent

![CI](https://github.com/Minahh23/webxbuilder/actions/workflows/ci-cd.yml/badge.svg)

An AI-powered agent that creates websites on demand using OpenAI's GPT-4 model.

## Features

- **AI-Powered Website Generation**: Uses OpenAI GPT-4 to analyze requirements and generate complete websites
- **Content Generation**: Automatically generates relevant content for different page types
- **Style Generation**: Creates modern, responsive CSS based on theme preferences
- **HTML Generation**: Generates semantic HTML5 with proper structure and accessibility
- **REST API**: Easy-to-use API endpoints for website generation
- **Flexible Configuration**: Support for different website types (portfolio, business, e-commerce, blog, landing)
- **File Output**: Saves generated websites as organized HTML, CSS, and JSON files

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file based on `.env.example`:

```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
LOG_LEVEL=info
OUTPUT_DIR=./generated_sites
```

## Running the Agent

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Build Website
```
POST /api/build
Content-Type: application/json

{
  "requirements": "A modern portfolio website for a graphic designer",
  "options": {
    "theme": "modern",
    "pages": ["home", "portfolio", "about", "contact"],
    "features": ["dark-mode", "animations", "contact-form"]
  }
}
```

Response:
```json
{
  "success": true,
  "website": {
    "title": "Designer Portfolio",
    "description": "...",
    "type": "portfolio",
    "pages": [...],
    "html": "...",
    "styles": "...",
    "content": {...},
    "metadata": {...}
  },
  "outputPath": "./generated_sites/Designer-Portfolio"
}
```

### List Generated Websites
```
GET /api/websites
```

### Get Website Details
```
GET /api/websites/:id
```

## Project Structure

```
src/
├── agent/
│   └── WebsiteBuilderAgent.ts    # Main agent logic
├── api/
│   └── express.ts                 # Express API setup
├── generators/
│   ├── HtmlGenerator.ts           # HTML generation
│   ├── StyleGenerator.ts          # CSS generation
│   └── ContentGenerator.ts        # Content generation
├── types/
│   └── WebsiteConfig.ts          # TypeScript types
├── utils/
│   └── logger.ts                  # Logging setup
└── index.ts                       # Entry point
```

## Usage Examples

### Using curl

```bash
# Build a website
curl -X POST http://localhost:3000/api/build \
  -H "Content-Type: application/json" \
  -d '{"requirements": "Create a professional business website for a marketing agency"}'

# List websites
curl http://localhost:3000/api/websites

# Get website details
curl http://localhost:3000/api/websites/Marketing-Agency
```

### Using Node.js

```javascript
import { WebsiteBuilderAgent } from './src/agent/WebsiteBuilderAgent';

const agent = new WebsiteBuilderAgent();
const website = await agent.buildWebsite('Professional e-commerce site for furniture store');
```

## Features in Detail

### Content Generation
The agent generates:
- Page titles and descriptions
- Meta tags for SEO
- Structured sections with headings
- Body content tailored to the website type
- Call-to-action elements

### Style Generation
The agent creates:
- Responsive CSS layouts
- Mobile-first design
- CSS variables for themes
- Smooth transitions and animations
- Modern typography

### HTML Generation
The agent produces:
- Semantic HTML5 structure
- Proper heading hierarchy
- Accessibility attributes
- Meta tags and SEO elements
- Navigation structure

## Requirements

- Node.js 18+
- OpenAI API key
- npm or yarn

## Dependencies

- `express` - Web framework
- `openai` - OpenAI API client
- `dotenv` - Environment variables
- `winston` - Logging
- `axios` - HTTP client
- `puppeteer` - Browser automation (optional)
- `fs-extra` - File system utilities
- `typescript` - Language support
- `ts-node` - TypeScript execution

## License

MIT
