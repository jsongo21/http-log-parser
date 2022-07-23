import path from "path";

import { logParser } from "./parser";

export function handleFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  logParser(fullPath);
}
