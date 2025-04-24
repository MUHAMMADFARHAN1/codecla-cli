"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs = require("fs");
var path = require("path");
var inquirer_1 = require("inquirer");
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
var __dirname = "C:/Users/farha/Documents/codecla-cli";
var generateCommand = new commander_1.Command("generate")
    .description("Generate a function template and save it to a file")
    .requiredOption("-n, --name <function_name>", "Function name")
    .requiredOption("-l, --lang <language>", "Programming language (javascript or python)")
    .requiredOption("-i, --inputs <inputs>", "Comma-separated input parameters")
    .action(function (options) {
    var name = options.name, lang = options.lang, inputs = options.inputs;
    var inputList = inputs
        .split(",")
        .map(function (input) { return input.trim(); });
    var code = "";
    var fileExt = "";
    switch (lang.toLowerCase()) {
        case "javascript":
            fileExt = "js";
            code = "function ".concat(name, "(").concat(inputList.join(", "), ") {\n  // Your Code Here\n return;\n}\n");
            break;
        case "python":
            fileExt = "py";
            code = "def ".concat(name, "(").concat(inputList.join(", "), "):\n    # Your code here\n    return\n");
            break;
        default:
            console.error('❌ Unsupported language. Please choose "javascript" or "python".');
            process.exit(1);
    }
    //inquirer prompting
    inquirer_1.default
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
            message: "Generate boilerplate code for the function solution in the specified programming language?",
            default: true,
        },
    ])
        .then(function (answers) {
        // console.log("\nAnswers:");
        // console.log(JSON.stringify(answers, null, 2));
        if (answers.confirmSubmission) {
            // const outputDir = path.join(__dirname, "../../generated");
            var outputDir = path.join(__dirname, "./generated");
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }
            var filePath = path.join(outputDir, "".concat(name, ".").concat(fileExt));
            fs.writeFileSync(filePath, code, "utf8");
            console.log("\u2705 Function written to: ".concat(filePath));
        }
    })
        .catch(function (error) {
        if (error.isTtyError) {
            console.error("Prompt couldn’t be rendered in the current environment");
        }
        else {
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
exports.default = generateCommand;
