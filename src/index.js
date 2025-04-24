#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var generate_js_1 = require("./commands/generate.js");
var program = new commander_1.Command();
program
    .name("code-cli")
    .description("Generate a function template and save it as a file")
    .version("1.0.0");
program.addCommand(generate_js_1.default);
program.parseAsync(process.argv);
