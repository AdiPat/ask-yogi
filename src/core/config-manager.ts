import fs from "fs";
import os from "os";
import path from "path";
import inquirer from "inquirer";
import { llmPingTest } from "./ai";
import chalk from "chalk";

const CONFIG_DIR = path.join(os.homedir(), ".askyogi");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export class ConfigManager {
  private config: { provider?: string; apiKey?: string } = {};

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      const rawData = fs.readFileSync(CONFIG_FILE, "utf-8");
      this.config = JSON.parse(rawData);
    }
  }

  private saveConfig() {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR);
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
  }

  public isConfigured(): boolean {
    return !!this.config.provider && !!this.config.apiKey;
  }

  public async setup() {
    console.log("Configuring Ask Yogi CLI...");
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "provider",
        message: "Which provider do you want to use?",
        choices: ["anthropic", "openai"],
      },
      {
        type: "input",
        name: "apiKey",
        message: (answers) =>
          `Enter your ${answers.provider.toUpperCase()}_API_KEY:`,
      },
    ]);

    this.config.provider = answers.provider;
    this.config.apiKey = answers.apiKey;

    console.log(chalk.cyan("Testing the configuration..."));
    const pingTestResult = await llmPingTest(answers.provider, answers.apiKey);

    if (!pingTestResult) {
      console.error(
        chalk.redBright("Failed to ping the model. Please check your API key.")
      );
      process.exit(1);
    }

    console.log(chalk.greenBright("Configuration is valid."));

    this.saveConfig();
    console.log("Configuration saved successfully.");
  }

  public async init(): Promise<boolean> {
    if (!this.isConfigured()) {
      console.error(
        chalk.red("Configuration is missing. Please run the setup.")
      );
      return false;
    }

    console.log(chalk.cyan("Validating the configuration..."));
    const { provider, apiKey } = this.config;
    if (!provider || !apiKey) {
      console.error(chalk.redBright("Provider or API key is missing."));
      return false;
    }
    const pingTestResult = await llmPingTest(provider, apiKey);

    if (!pingTestResult) {
      console.error(
        chalk.redBright("Failed to ping the model. Please check your API key.")
      );
      return false;
    }

    console.log(chalk.greenBright("Configuration is valid."));
    return true;
  }
}
