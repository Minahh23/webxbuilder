# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Node.js
Download and install from https://nodejs.org/ (LTS version recommended)

### Step 2: Clone/Extract Project
```powershell
cd "path\to\Webxbuilders"
```

### Step 3: Set Up Environment
```powershell
# Copy example env file
Copy-Item .env.example .env

# Edit .env and add your OpenAI API key
# (Get from https://platform.openai.com/api-keys)
```

Edit `.env`:
```
PORT=3000
OPENAI_API_KEY=sk-your-key-here
LOG_LEVEL=info
OUTPUT_DIR=./generated_sites
```

### Step 4: Install Dependencies
```powershell
npm install
```

### Step 5: Run the Agent
```powershell
npm run dev
```

Server starts at: `http://localhost:3000`

---

## Basic Usage

### Test the API

**Using PowerShell:**
```powershell
$headers = @{ "Content-Type" = "application/json" }
$body = @{ requirements = "Create a modern portfolio website for a photographer" } | ConvertTo-Json
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/build" `
  -Method POST `
  -Headers $headers `
  -Body $body
$response.Content | ConvertFrom-Json
```

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/build \
  -H "Content-Type: application/json" \
  -d '{"requirements":"Create a modern portfolio website for a photographer"}'
```

**Using JavaScript/Node.js:**
```javascript
const response = await fetch('http://localhost:3000/api/build', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    requirements: 'Create a modern portfolio website for a photographer'
  })
});
const data = await response.json();
console.log(data);
```

---

## API Endpoints Quick Reference

### 1. Build Website
**POST** `/api/build`

```json
{
  "requirements": "Professional business website for marketing agency",
  "options": {
    "theme": "modern",
    "pages": ["home", "services", "portfolio", "contact"],
    "features": ["dark-mode", "animations"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "website": {
    "title": "Marketing Agency",
    "type": "business",
    "pages": ["home", "services", "portfolio", "contact"],
    "html": "<!DOCTYPE html>...",
    "styles": "* { ... }",
    "content": { "home": {...} },
    "metadata": {...}
  },
  "outputPath": "./generated_sites/Marketing-Agency"
}
```

### 2. List Websites
**GET** `/api/websites`

```json
{
  "sites": ["Marketing-Agency", "Portfolio-Designer", "E-commerce-Store"]
}
```

### 3. Get Website Details
**GET** `/api/websites/:id`

```json
{
  "title": "Marketing Agency",
  "description": "Professional marketing agency website",
  "type": "business",
  "pages": ["home", "services", "portfolio", "contact"],
  "html": "<!DOCTYPE html>...",
  "styles": "...",
  "content": {...},
  "metadata": {...}
}
```

### 4. Health Check
**GET** `/health`

```json
{
  "status": "ok",
  "service": "website-builder-agent"
}
```

---

## Common Generation Prompts

### Portfolio Website
```
"Create a modern, minimalist portfolio website for a graphic designer. 
Include work samples, about section, services, and contact. 
Use a blue and white color scheme with smooth animations."
```

### Business Website
```
"Professional B2B SaaS company website with features overview, 
pricing tiers, customer testimonials, case studies, and blog. 
Modern design with dark theme and gradient accents."
```

### E-commerce Store
```
"Online store for eco-friendly sustainable products. 
Include product categories, shopping features, customer reviews, 
sustainability information, and newsletter signup. 
Use earthy green colors and natural aesthetics."
```

### Blog
```
"Content-rich blog for tech industry news and tutorials. 
Include article listings, categories, search functionality, 
author profiles, and related posts. Clean, readable design."
```

### Landing Page
```
"High-converting landing page for SaaS product. 
Include hero section, feature highlights, pricing, 
testimonials, FAQ, and strong call-to-action buttons. 
Modern, professional design with company branding."
```

---

## File Structure Output

Each generated website creates this structure:

```
generated_sites/
└── Website-Name/
    ├── index.html      # Main HTML file
    ├── styles.css      # Complete stylesheet
    ├── content.json    # All page content
    └── config.json     # Full configuration
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "npm not found" | Install Node.js from nodejs.org |
| "API key error" | Check .env file and OpenAI key validity |
| "Port 3000 in use" | Change PORT in .env or kill existing process |
| "Module not found" | Run `npm install` |
| "No response from AI" | Check API credits and model availability |

---

## Tips

✅ Save API costs by caching generated websites  
✅ Customize prompts for better results  
✅ Test with small requirements first  
✅ Monitor API usage in OpenAI dashboard  
✅ Use environment variables for sensitive data  

---

## Next Steps

1. ✓ Setup complete
2. Start making requests to `/api/build`
3. Check `generated_sites/` folder for outputs
4. Customize the generators for your needs
5. Deploy to production when ready

See `README.md` and `ARCHITECTURE.md` for detailed documentation.
