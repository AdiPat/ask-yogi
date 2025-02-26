import { AskYogiResponse, AskYogiServiceOptions } from "../models";
export declare class AskYogiService {
    private DEFAULT_TEMPERATURE;
    private DEFAULT_LLM_MODEL;
    private DEFAULT_SYSTEM_PROMPT;
    private options;
    constructor(options?: AskYogiServiceOptions);
    private getDefaultOptions;
    askYogi(question: string): Promise<AskYogiResponse>;
    validateQuestion(question: string): boolean;
}
