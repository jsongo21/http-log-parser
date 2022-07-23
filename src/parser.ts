import fs from "fs";
import readline from "readline";

interface ParsedResult {
  numUniqueIPAddresses: number;
  mostVisitedURLs: string[];
  mostActiveIPAddresses: string[];
}

export async function logParser(path: string): Promise<ParsedResult> {
  console.log(path);
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });

  for await (const line of rl) {
    parseLine(line);
  }

  return {
    numUniqueIPAddresses: 1,
    mostActiveIPAddresses: [""],
    mostVisitedURLs: [""],
  };
}

export function parseLine(line: string) { }
