import path from "path";

import { logParser } from "./parser";
/**
 * Actions the file argument
 *
 * @export
 * @param {string} filePath
 */
export async function handleFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  await logParser(fullPath);
}
