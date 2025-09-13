import { test } from "node:test";
import assert from "node:assert";
import { resolve } from "path";
import { mapTsErrorMessages } from "../load-ts-error-codes";
import { getTopTsErrors } from "../parse-ts-errors";
import { printTsErrors } from "../print-ts-errors";

test("mapTsErrorMessages loads TS messages", async () => {
  const map = await mapTsErrorMessages();
  assert(map.size > 0);
});

test("getTopTsErrors with errors and messages count", async (t) => {
  const {
    tsCodes,
    tsCodesMap,
    prioritizedErrorCodes,
    priorititizedErrorMessages,
    filesErrors,
  } = await getTopTsErrors({
    inputFile: resolve(__dirname, "input.txt"),
    priorityErrorsCount: 5,
    priorityMessagesCount: 3,
  });

  assert(prioritizedErrorCodes.length === 5);
  assert(priorititizedErrorMessages.length === 3);

  const mockedConsole = t.mock.method(console, "log");

  printTsErrors({
    tsCodes,
    tsCodesMap,
    priorititizedErrorMessages,
    prioritizedErrorCodes,
    filesErrors,
  });

  assert(mockedConsole.mock.calls.length === 14);
  assert(
    mockedConsole.mock.calls[0].arguments[0],
    "Total TS errors in the code:"
  );
  assert(mockedConsole.mock.calls[0].arguments[1] === 55);

  assert(filesErrors[0].count === 45);
});
