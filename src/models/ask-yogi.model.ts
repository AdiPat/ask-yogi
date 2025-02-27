export interface AskYogiServiceOptions {
  temperature?: number;
  model?: string;
  yogiProfile?: Record<string, any>;
  verbose?: boolean;
  apiKey?: string;
}

export interface AskYogiResponse {
  query: string;
  response: string;
  teachings: string[];
}
