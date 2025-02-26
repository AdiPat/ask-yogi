export declare class ConfigManager {
    private config;
    constructor();
    private loadConfig;
    private saveConfig;
    isConfigured(): boolean;
    setup(): Promise<void>;
    init(): Promise<boolean>;
}
