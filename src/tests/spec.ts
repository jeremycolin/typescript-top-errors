import { test } from "node:test";
import { getTopTsErrors } from "../parse-ts-errors";

const inputFile = "src/tests/input.txt";

test("getTopTsErrors with defaut values", async () => {
  await getTopTsErrors({
    inputFile,
    priorityErrorsCount: 10,
    priorityMessagesCount: 10,
  });
});
