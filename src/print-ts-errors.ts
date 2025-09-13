import type {
  TsCodes,
  TsCodesMap,
  PrioritizedErrorCodes,
  PriorititizedErrorMessages,
  FilesErrors,
} from "./parse-ts-errors";

export function printTsErrors({
  tsCodes,
  tsCodesMap,
  prioritizedErrorCodes,
  priorititizedErrorMessages,
  filesErrors,
}: {
  tsCodes: TsCodes;
  tsCodesMap: TsCodesMap;
  prioritizedErrorCodes: PrioritizedErrorCodes;
  priorititizedErrorMessages: PriorititizedErrorMessages;
  filesErrors: FilesErrors;
}) {
  console.log("Total TS errors in the code: ", tsCodes.length);
  console.log("\nUnique TS errors in the code: ", tsCodesMap.size);

  console.log("\nTop TS errors in the code:");
  for (const error of prioritizedErrorCodes) {
    console.log(
      `Error: ${error.message} (code ${error.code} - https://typescript.tv/errors/#ts${error.code}) - ${error.count} times`
    );
  }

  console.log("\nTop TS error messages in the code:");
  for (const error of priorititizedErrorMessages) {
    console.log(`Message: ${error.message} - ${error.count} times`);
  }

  console.log("\nTop TS files with more errors in the code:");
  for (const file of filesErrors) {
    console.log(`File: ${file.file} - with ${file.count} errors`);
  }
}
