import path from "path";

import { logParser } from "./parser";

export async function handleFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  await logParser(fullPath);
}
