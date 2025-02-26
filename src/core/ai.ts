import { createOpenAI, openai } from "@ai-sdk/openai";
import { createAnthropic, anthropic } from "@ai-sdk/anthropic";
import { generateText, LanguageModelV1 } from "ai";

export const AvailableModels = {
  openai: {
    gpt_4o: "gpt-4o",
    gpt_4o_mini: "gpt-4o-mini",
    chatgpt_4o_latest: "chatgpt-4o-latest",
  },
  anthropic: {
    claude_35_sonnet_latest: "claude-3-5-sonnet-latest",
    claude_37_sonnet_latest: "claude-3-7-sonnet-latest",
    claude_35_haiku_latest: "claude-3-5-haiku-latest",
  },
};

export function getModelLib(
  model: string,
  apiKey = ""
): LanguageModelV1 | null {
  try {
    const [provider, modelId] = model.split("/");
    if (provider === "openai") {
      if (apiKey) {
        return createOpenAI({
          apiKey: apiKey,
        })(modelId);
      }
      return openai(modelId);
    } else if (provider === "anthropic") {
      if (apiKey) {
        return createAnthropic({
          apiKey: apiKey,
        })(modelId);
      }
      return anthropic(model);
    }

    throw new Error("Unsupported provider.");
  } catch (error: any) {
    console.error("Failed to get model library.", String(error));
    console.error(error);
    return null;
  }
}

export async function llmPingTest(
  provider: string,
  apiKey: string
): Promise<boolean> {
  try {
    const model = getPingTestModel(provider);

    const modelLib: LanguageModelV1 | null = getModelLib(
      `${provider}/${model}`,
      apiKey
    );

    if (!modelLib) {
      throw new Error("Failed to get model library.");
    }

    const { text: pingResponse } = await generateText({
      model: modelLib,
      prompt: "This is a PING test. Respond with 'PONG' and nothing else",
    });

    return pingResponse.trim() === "PONG";
  } catch (error: any) {
    console.error("Failed to ping model.", String(error));
    console.error(error);
    return false;
  }
}

function getPingTestModel(provider: string) {
  let model: string;

  if (provider === "openai") {
    model = AvailableModels.openai.gpt_4o_mini;
  } else if (provider === "anthropic") {
    model = AvailableModels.anthropic.claude_35_haiku_latest;
  } else {
    throw new Error("Unsupported provider.");
  }
  return model;
}
