export interface WebsiteConfig {
  title: string;
  description: string;
  type: 'portfolio' | 'business' | 'ecommerce' | 'blog' | 'landing';
  pages: string[];
  html: string;
  styles: string;
  content: Record<string, string>;
  metadata: {
    createdAt: Date;
    theme: string;
    palette: string[];
  };
}

export interface BuildRequest {
  requirements: string;
  options?: {
    theme?: string;
    pages?: string[];
    features?: string[];
  };
}

export interface GeneratedPage {
  name: string;
  html: string;
  route: string;
}
