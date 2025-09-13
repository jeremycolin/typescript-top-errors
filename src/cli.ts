#!/usr/bin/env node

import { getTopTsErrors } from "./parse-ts-errors";
import { printTsErrors } from "./print-ts-errors";

const ARG_REGEX = /^-(?<key>\w+)=(?<value>.*)$/;

async function main() {
  let priorityErrorsCount = 10;
  let priorityMessagesCount = 10;
  let inputFile = "";

  process.argv.slice(2).forEach((arg) => {
    const match = arg.match(ARG_REGEX);
    if (!match) {
      console.error("Malformed argument: ", arg);
      process.exit(1);
    }
    const { key, value } = match.groups!;
    if (key === "topErrors") {
      priorityErrorsCount = Number(value);
    } else if (key === "topMessages") {
      priorityMessagesCount = Number(value);
    } else if (key === "inputFile") {
      inputFile = value;
    } else {
      console.error("Unknown argument: ", arg);
      process.exit(1);
    }
  });

  if (!inputFile) {
    console.error(
      "Missing or invalid inputFile argument (example: -inputFile=ts-errors.txt)"
    );
    process.exit(1);
  }

  const {
    tsCodes,
    tsCodesMap,
    prioritizedErrorCodes,
    priorititizedErrorMessages,
    filesErrors,
  } = await getTopTsErrors({
    inputFile,
    priorityErrorsCount,
    priorityMessagesCount,
  });

  printTsErrors({
    tsCodes,
    tsCodesMap,
    prioritizedErrorCodes,
    priorititizedErrorMessages,
    filesErrors,
  });
}

main();
