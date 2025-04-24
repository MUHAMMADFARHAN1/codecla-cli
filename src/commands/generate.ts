import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";

import inquirer from "inquirer";

import * as url from "url";
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const __dirname = "C:/Users/farha/Documents/codecla-cli";
const __dirname = process.cwd() + "./../";

type Lang = "javascript" | "python";

interface GenerateOptions {
  name: string;
  lang: Lang;
  inputs: string;
}

const generateCommand = new Command("generate")
  .description("Generate a function template and save it to a file")
  .requiredOption("-n, --name <function_name>", "Function name")
  .requiredOption(
    "-l, --lang <language>",
    "Programming language (javascript or python)"
  )
  .requiredOption("-i, --inputs <inputs>", "Comma-separated input parameters")
  .action((options: GenerateOptions) => {
    const { name, lang, inputs } = options;
    const inputList: string[] = inputs
      .split(",")
      .map((input: string) => input.trim());

    let code = "";
    let fileExt = "";

    switch (lang.toLowerCase()) {
      case "javascript":
        fileExt = "js";
        code = `function ${name}(${inputList.join(
          ", "
        )}) {\n  // Your Code Here\n return;\n}\n`;
        break;
      case "python":
        fileExt = "py";
        code = `def ${name}(${inputList.join(
          ", "
        )}):\n    # Your code here\n    return\n`;
        break;
      default:
        console.error(
          '❌ Unsupported language. Please choose "javascript" or "python".'
        );
        process.exit(1);
    }

    //inquirer prompting

    inquirer
      .prompt([
        // {
        //   type: "input",
        //   name: "name",
        //   message: "What is your name?",
        // },
        // {
        //   type: "list",
        //   name: "favoriteLanguage",
        //   message: "What is your favorite programming language?",
        //   choices: ["JavaScript", "Python", "Go", "Rust"],
        // },
        {
          type: "confirm",
          name: "confirmSubmission",
          message:
            "Generate boilerplate code for the function solution in the specified programming language?",
          default: true,
        },
      ])
      .then((answers) => {
        // console.log("\nAnswers:");
        // console.log(JSON.stringify(answers, null, 2));
        if (answers.confirmSubmission) {
          // const outputDir = path.join(__dirname, "../../generated");
          const outputDir = path.join(__dirname, "./generated");
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
          }

          const filePath = path.join(outputDir, `${name}.${fileExt}`);
          fs.writeFileSync(filePath, code, "utf8");

          console.log(`✅ Function written to: ${filePath}`);
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.error(
            "Prompt couldn’t be rendered in the current environment"
          );
        } else {
          console.error("Something went wrong:", error);
        }
      });

    // const outputDir = path.join(__dirname, "../../generated");
    // if (!fs.existsSync(outputDir)) {
    //   fs.mkdirSync(outputDir);
    // }

    // const filePath = path.join(outputDir, `${name}.${fileExt}`);
    // fs.writeFileSync(filePath, code, "utf8");

    // console.log(`✅ Function written to: ${filePath}`);
  });

export default generateCommand;
