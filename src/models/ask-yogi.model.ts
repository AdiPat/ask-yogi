export interface AskYogiServiceOptions {
  temperature?: number;
  model?: string;
  yogiProfile?: Record<string, any>;
  verbose?: boolean;
}

export interface AskYogiResponse {
  query: string;
  response: string;
  teachings: string[];
}
