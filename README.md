# TypeScript Top Errors

Get the top TypeScript errors in your codebase

## Quick Start

### Step 1

Save your TypeScript diagonistic (tsc) output in a `.txt` file such as `ts-errors.txt`

For example `tsc > ts-errors.txt`

### Step 2

Run the CLI:

`npx typescript-top-errors -inputFile=ts-errors.txt`

`pnpm exec typescript-top-errors`

## Options

### -inputFile

Path to the tsc output file

### -topErrors

Numbers of TypeScript errors to report (default is 10)

### -topMessages

Numbers of Unique Typescript specific to your codebase to report (default is 10)

## Programmatic use

You can also directly load the errors in a TS or Node module through exposed functions such as `getTopTsErrors` in `parse-ts-errors`

For example `import { getTopTsErrors } from "typescript-top-errors/dist/parse-ts-errors"`
