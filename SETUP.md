# Setup Instructions

## Prerequisites

This project requires Node.js and npm. Follow these steps to set up:

### 1. Install Node.js

Download and install Node.js from https://nodejs.org/

- Recommended: LTS (Long Term Support) version
- This will also install npm automatically

### 2. Verify Installation

After installation, open a new PowerShell terminal and verify:

```powershell
node --version
npm --version
```

### 3. Set Up Environment Variables

1. Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```

2. Edit `.env` and add your OpenAI API key:
```
PORT=3000
OPENAI_API_KEY=sk-your-openai-api-key-here
LOG_LEVEL=info
OUTPUT_DIR=./generated_sites
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

### 4. Install Dependencies

Run the following command in the project directory:

```powershell
npm install
```

### 5. Build the Project

```powershell
npm run build
```

### 6. Run the Agent

#### Development Mode (with hot reload):
```powershell
npm run dev
```

#### Production Mode:
```powershell
npm start
```

The agent will start on `http://localhost:3000`

## Troubleshooting

### npm is not recognized
- Ensure Node.js is installed and restart your terminal
- Verify PATH includes Node.js: `echo $env:Path | Select-String node`

### OpenAI API errors
- Check your API key is correct in `.env`
- Verify you have API credits: https://platform.openai.com/account/billing/overview
- Ensure you're using GPT-4 model access

### Module not found errors
- Run `npm install` again
- Delete `node_modules` folder and run `npm install` fresh
- Clear npm cache: `npm cache clean --force`

## Next Steps

After setup, test the API:

```powershell
# In another PowerShell window, make a request to build a website:
$body = @{requirements="Create a modern portfolio website"} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/api/build" -Method POST -Body $body -ContentType "application/json"
```

Generated websites will be saved to the `generated_sites/` directory.
