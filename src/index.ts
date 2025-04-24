#!/usr/bin/env node

import { Command } from "commander";
import generateCommand from "./commands/generate.js";

const program = new Command();

program
  .name("code-cli")
  .description("Generate a function template and save it as a file")
  .version("1.0.0");

program.addCommand(generateCommand);

program.parseAsync(process.argv);
