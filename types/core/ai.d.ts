import { LanguageModelV1 } from "ai";
export declare const AvailableModels: {
    openai: {
        gpt_4o: string;
        gpt_4o_mini: string;
        chatgpt_4o_latest: string;
    };
    anthropic: {
        claude_35_sonnet_latest: string;
        claude_37_sonnet_latest: string;
        claude_35_haiku_latest: string;
    };
};
export declare function getModelLib(model: string, apiKey?: string): LanguageModelV1 | null;
export declare function llmPingTest(provider: string, apiKey: string): Promise<boolean>;
