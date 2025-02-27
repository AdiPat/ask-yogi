export declare class ConfigManager {
    private config;
    constructor();
    private loadConfig;
    private saveConfig;
    private loadDefaultModelFromProvider;
    isConfigured(): boolean;
    setup(): Promise<void>;
    init(): Promise<boolean>;
    getConfig(): {
        provider?: "openai" | "anthropic";
        apiKey?: string;
        defaultModel?: string;
    };
}
