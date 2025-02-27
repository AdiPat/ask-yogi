#!/usr/bin/env node

import dotenv from "dotenv";
import { Command } from "commander";
import chalk from "chalk";
import { ConfigManager } from "./core/config-manager";
import { AskYogiService } from "./services/ask-yogi.service";

dotenv.config({
  path: "./.env",
  override: true,
});

const program = new Command();

program
  .name("ask-yogi")
  .description("CLI to ask Yogi questions")
  .version("1.0.0")
  .helpOption(false)
  .addHelpText(
    "before",
    chalk.blue(`
    ********************************
    * Welcome to the Ask Yogi CLI! *
    ********************************
  `)
  )
  .addHelpText(
    "after",
    chalk.green(`
    Use --question to ask a question or --live-mode to start an infinite question answering loop.
  `)
  );

program
  .option("-q, --question <question>", "Ask a question")
  .option("-l, --liveMode", "Start an infinite question answering loop")
  .option("-r, --reconfigure", "Reconfigure the provider and API key");

async function run() {
  program.parse(process.argv);

  const options = program.opts();
  const configManager = new ConfigManager();

  const initStatus = await configManager.init();

  if (!initStatus && !options.reconfigure)
    console.error(
      chalk.cyan("Configuration not initialized. Re-configuring...")
    );
  else if (initStatus && options.reconfigure) {
    console.log(chalk.cyan("Reconfiguring Ask Yogi CLI..."));
  }

  if (!initStatus || options.reconfigure) {
    await configManager.setup();
  }

  const config = configManager.getConfig();
  console.log(chalk.cyan(`Using provider: ${config.provider}`));
  console.log(chalk.cyan(`Using default model: ${config.defaultModel}`));

  const askYogiService = new AskYogiService({
    model: config.defaultModel,
    apiKey: config.apiKey,
  });

  if (options.question) {
    console.log(chalk.yellow(`You asked: ${options.question}`));
    const response = await askYogiService.askYogi(options.question);
    console.log(chalk.green(`Yogi says: ${response.response}`));
    console.log(chalk.green(`Teachings: ${response.teachings.join(", ")}`));
  } else if (options.liveMode) {
    console.log(chalk.yellow("Entering live mode. Type your questions below:"));
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", async (data) => {
      const question = data.toString().trim();
      if (question.toLowerCase() === "exit") {
        console.log(chalk.red("Exiting live mode."));
        process.exit();
      }
      console.log(chalk.yellow(`You asked: ${question}`));
      await askYogiService.askYogi(question).then((response) => {
        console.log(chalk.green(`Yogi says: ${response.response}`));
        console.log(chalk.green(`Teachings: ${response.teachings.join(", ")}`));
      });
    });
  } else {
    program.help();
  }
}

if (require.main === module) {
  run();
}
