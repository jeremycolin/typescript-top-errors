import { readFileSync } from "node:fs";
import type { Category } from "./load-ts-error-codes";
import { mapTsErrorMessages } from "./load-ts-error-codes";
import { resolve } from "node:path";

export type TsCodes = Array<number>;

export type TsCodesMap = Map<
  number,
  { count: number; category: Category; message: string }
>;

export type PrioritizedErrorCodes = Array<{
  message: string;
  category: Category;
  code: number;
  count: number;
}>;

export type PriorititizedErrorMessages = Array<{
  message: string;
  count: number;
}>;

export type FilesErrors = Array<{
  file: string;
  count: number;
}>;

const TS_ERROR_REGEX =
  /^(?<file>.*)\(\d+,\d+\): error TS(?<code>\d+): (?<message>.*\.)/;

export async function getTopTsErrors({
  inputFile,
  priorityErrorsCount,
  priorityMessagesCount,
}: {
  inputFile: string;
  priorityErrorsCount: number;
  priorityMessagesCount: number;
}): Promise<{
  tsCodes: TsCodes;
  tsCodesMap: TsCodesMap;
  prioritizedErrorCodes: PrioritizedErrorCodes;
  priorititizedErrorMessages: PriorititizedErrorMessages;
  filesErrors: FilesErrors;
}> {
  const tsErrorCodes = await mapTsErrorMessages();

  const rawInputString = readFileSync(resolve(inputFile), "utf-8");
  const lines = rawInputString.split("\n");

  const tsCodes: TsCodes = [];
  const tsCodesMap: TsCodesMap = new Map();
  const sourceCodeMessagesMap = new Map<string, number>();
  const filesErrorsMap = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(TS_ERROR_REGEX);

    if (match?.groups?.file) {
      const file = match.groups.file;
      const fileErrorsCount = filesErrorsMap.get(file) ?? 0;
      filesErrorsMap.set(file, fileErrorsCount + 1);
    }

    if (match?.groups?.code) {
      const tsCode = Number(match.groups.code);
      tsCodes.push(tsCode);
      const errorCount = tsCodesMap.get(tsCode)?.count ?? 0;
      const { category, message } = tsErrorCodes.get(tsCode) ?? {
        category: "Error",
        message: "Unknown",
      };
      tsCodesMap.set(tsCode, { count: errorCount + 1, category, message });
    }

    if (match?.groups?.message) {
      const messageCount = sourceCodeMessagesMap.get(match.groups.message) ?? 0;
      sourceCodeMessagesMap.set(match.groups.message, messageCount + 1);
    }
  }

  const prioritizedErrorCodes: PrioritizedErrorCodes = Array.from(
    tsCodesMap.entries()
  )
    .sort((a, b) => b[1].count - a[1].count)
    .filter((_, index) => index < priorityErrorsCount)
    .map(([code, { count, category, message }]) => ({
      message,
      category,
      code,
      count,
    }));

  const priorititizedErrorMessages: PriorititizedErrorMessages = Array.from(
    sourceCodeMessagesMap.entries()
  )
    .sort((a, b) => b[1] - a[1])
    .filter((_, index) => index < priorityMessagesCount)
    .map(([message, count]) => ({
      message,
      count,
    }));

  const filesErrors: FilesErrors = Array.from(filesErrorsMap.entries())
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 20)
    .map(([file, count]) => ({
      file,
      count,
    }));

  return {
    tsCodes,
    tsCodesMap,
    prioritizedErrorCodes,
    priorititizedErrorMessages,
    filesErrors,
  };
}
