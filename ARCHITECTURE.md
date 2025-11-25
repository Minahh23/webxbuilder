# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
│            (Web Browser, API Clients, Scripts)              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP Requests
                 │
┌─────────────────────────────────────────────────────────────┐
│                    Express.js REST API                       │
├─────────────────────────────────────────────────────────────┤
│  POST   /api/build         - Build new website              │
│  GET    /api/websites      - List generated sites           │
│  GET    /api/websites/:id  - Get website details            │
│  GET    /health            - Health check                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Orchestrates
                 │
┌─────────────────────────────────────────────────────────────┐
│           Website Builder Agent (Main Controller)            │
├─────────────────────────────────────────────────────────────┤
│  • Analyzes requirements                                     │
│  • Coordinates generation pipeline                          │
│  • Manages file output                                      │
└────┬──────────────┬──────────────┬─────────────────────────┘
     │              │              │
     │ Uses         │ Uses         │ Uses
     ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│Content       │ │Style         │ │HTML              │
│Generator     │ │Generator     │ │Generator         │
├──────────────┤ ├──────────────┤ ├──────────────────┤
│Generates:    │ │Generates:    │ │Generates:        │
│• Page titles │ │• CSS rules   │ │• Semantic HTML5  │
│• Meta desc   │ │• Responsive │ │• Accessibility   │
│• Sections    │ │  layouts     │ │• Structure       │
│• Content     │ │• Animations  │ │• Navigation      │
└──────┬───────┘ └──────┬───────┘ └────────┬─────────┘
       │                │                  │
       └────────────────┼──────────────────┘
                        │
                        │ Calls OpenAI GPT-4
                        │
        ┌───────────────────────────────────┐
        │   OpenAI API (GPT-4 Model)        │
        │  • Content Generation              │
        │  • Code Generation                 │
        │  • Analysis & Planning             │
        └───────────────────────────────────┘
                        │
                        │ Returns generated content
                        │
        ┌───────────────────────────────────┐
        │   File System Output               │
        │  /generated_sites/                 │
        │  ├── website-1/                    │
        │  │   ├── index.html                │
        │  │   ├── styles.css                │
        │  │   ├── content.json              │
        │  │   └── config.json               │
        │  └── website-2/                    │
        │      └── ...                       │
        └───────────────────────────────────┘
```

## Data Flow

### 1. Website Generation Request
```
Client Request
    ↓
  Body: { requirements: "Create a portfolio site" }
    ↓
Express API Route (/api/build)
    ↓
WebsiteBuilderAgent.buildWebsite()
```

### 2. Requirements Analysis
```
Raw Requirements
    ↓
Send to GPT-4 with analysis prompt
    ↓
Receive structured JSON analysis:
{
  title: "Portfolio Website",
  type: "portfolio",
  pages: ["home", "portfolio", "about"],
  theme: "modern",
  palette: ["#2563eb", ...],
  features: [...]
}
```

### 3. Parallel Generation
```
Analysis Result
    ├→ ContentGenerator.generate()
    │   └→ GPT-4: Generate content for each page
    │
    ├→ StyleGenerator.generate()
    │   └→ GPT-4: Generate responsive CSS
    │
    └→ HtmlGenerator.generate()
        └→ GPT-4: Generate HTML structure
```

### 4. File Output
```
Generated Config
    ↓
Create output directory
    ↓
Write files:
  ├── index.html      (HTML structure)
  ├── styles.css      (CSS styles)
  ├── content.json    (Page content)
  └── config.json     (Full configuration)
    ↓
Return success response with output path
```

## Website Types Supported

- **Portfolio** - Showcase personal/professional work
- **Business** - B2B/B2C company websites
- **E-commerce** - Online stores and product catalogs
- **Blog** - Content-focused sites
- **Landing** - Single-page promotional sites

## Technology Stack

```
Frontend         Backend           AI/External
─────────        ───────           ────────────
Browser          Node.js           OpenAI API
                 Express.js         (GPT-4)
                 TypeScript
                 Winston Logger
```

## Component Interactions

```
API Request
    ↓
┌─WebsiteBuilderAgent───────────────────┐
│ 1. Analyze Requirements (GPT-4)       │
│ 2. Create Analysis JSON               │
│ 3. Distribute to Generators           │
│ ├─ ContentGenerator                   │
│ ├─ StyleGenerator                     │
│ └─ HtmlGenerator                      │
│ 4. Compile Results                    │
│ 5. Save to Filesystem                 │
│ 6. Return Response                    │
└───────────────────────────────────────┘
    ↓
File System +
API Response
```

## Error Handling Flow

```
Try Generate Website
    ↓
If Error in Analysis
    └→ Log error, return error response
    
If Error in Content Generation
    └→ Log error, return error response
    
If Error in Style Generation
    └→ Log error, return error response
    
If Error in HTML Generation
    └→ Log error, return error response
    
If File Write Error
    └→ Log error, return error response
    
Success
    └→ Return generated website config + path
```
