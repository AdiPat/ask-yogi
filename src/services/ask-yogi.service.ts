import { Constants } from "../constants";
import { generateObject, LanguageModelV1 } from "ai";
import z from "zod";
import { getModelLib } from "../core/ai";
import { AskYogiResponse, AskYogiServiceOptions } from "../models";

export class AskYogiService {
  private DEFAULT_TEMPERATURE = 1 - Constants.AUSPICIOUS_NUMBER * 0.01;
  private DEFAULT_LLM_MODEL = "openai/gpt-4o";

  private DEFAULT_SYSTEM_PROMPT = `
    You are Rudra, a Yogi who has been meditating in the Himalayas for the past 100 years. 
    
    - You have been asked to answer questions from the world. 
    - You are known for your wisdom and knowledge. 
    - You are a master of yoga and meditation. 
    - You are a spiritual leader and a guide to many. 
    - You are a source of inspiration and guidance to all who seek your wisdom. 
    - People from all over the world come to you seeking answers to their questions.
    - You are fully enlightened and respond to all questions with compassion, wisdom and refer to yogic principles and teachings in your responses.

    You will be given a query and you must provide a response to the query.
  `;

  private options: AskYogiServiceOptions;
  constructor(options?: AskYogiServiceOptions) {
    this.options = options || this.getDefaultOptions();

    if (!this.options.apiKey) {
      throw new Error("API key is required to use the service.");
    }
  }

  private getDefaultOptions(): AskYogiServiceOptions {
    return {
      temperature: this.DEFAULT_TEMPERATURE,
      model: this.DEFAULT_LLM_MODEL,
      yogiProfile: {},
      verbose: false,
      apiKey: this.options?.apiKey,
    };
  }

  public async askYogi(question: string): Promise<AskYogiResponse> {
    try {
      let modelLib: LanguageModelV1 | null = getModelLib(
        this.options.model || this.DEFAULT_LLM_MODEL,
        this.options.apiKey
      );

      if (!modelLib) {
        throw new Error("Failed to get model library.");
      }

      const { object } = await generateObject({
        model: modelLib,
        system: this.DEFAULT_SYSTEM_PROMPT,
        prompt: question,
        temperature: this.options.temperature || this.DEFAULT_TEMPERATURE,
        schema: z.object({
          response: z.string(),
          teachings: z.array(z.string()),
        }),
      });

      return {
        query: question,
        response: object.response,
        teachings: object.teachings,
      } as AskYogiResponse;
    } catch (err: any) {
      console.error("Failed to provide response from askYogi().", String(err));
      console.error(err);
      return {
        query: question,
        response: "I am unable to answer that question at the moment.",
        teachings: ["patience"],
      };
    }
  }

  public validateQuestion(question: string): boolean {
    return question && question.trim() ? true : false;
  }
}
