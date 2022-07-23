import { Command } from "commander";

import { handleFile } from "./action";

const program = new Command();
program.description("An application parse htttp log files");
program.argument("<file>", "file path").action(handleFile);
program.parse(process.argv);
