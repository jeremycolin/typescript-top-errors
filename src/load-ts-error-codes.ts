import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Load typescript-error-codes from https://github.com/Microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json

export type Category = "Error" | "Message";

interface TsErrorCode {
  category: Category;
  code: number;
}

type MappedTsErrorCodes = Map<
  number,
  {
    category: Category;
    message: string;
  }
>;
// example: 1002 => { category: 'Error', message: 'Unterminated string literal.' }

export async function mapTsErrorMessages(): Promise<MappedTsErrorCodes> {
  const rawTsErrorCodesString = readFileSync(
    resolve("data", "typescript-error-codes.json"),
    "utf-8"
  );

  const tsErrorCodes: Record<string, TsErrorCode> = JSON.parse(
    rawTsErrorCodesString
  );

  return Object.keys(tsErrorCodes).reduce((acc, key) => {
    const error = tsErrorCodes[key];
    acc.set(error.code, { category: error.category, message: key });
    return acc;
  }, new Map());
}
