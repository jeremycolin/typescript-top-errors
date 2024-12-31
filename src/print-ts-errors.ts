import type { Category } from "./load-ts-error-codes";
import type {
  TsCodes,
  TsCodesMap,
  PrioritizedErrorCodes,
  PriorititizedErrorMessages,
} from "./parse-ts-errors";

export function printTsErrors({
  tsCodes,
  tsCodesMap,
  prioritizedErrorCodes,
  priorititizedErrorMessages,
}: {
  tsCodes: TsCodes;
  tsCodesMap: TsCodesMap;
  prioritizedErrorCodes: PrioritizedErrorCodes;
  priorititizedErrorMessages: PriorititizedErrorMessages;
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
}
