import fs from "fs";
import readline from "readline";

interface ParsedResult {
  numUniqueIPAddresses: number;
  mostVisitedURLs: string[];
  mostActiveIPAddresses: string[];
}

export function logParser(path: string): ParsedResult {
  console.log(path);
  const fileStream = fs.createReadStream(path);

  return {
    numUniqueIPAddresses: 1,
    mostActiveIPAddresses: [""],
    mostVisitedURLs: [""],
  };
}
