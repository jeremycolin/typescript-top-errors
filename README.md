# TypeScript Top Errors

Get the top errors in your repository

## Quick Start

### Step 1

Save your TypeScript diagonistic (tsc) output in a `.txt` file such as `ts-errors.txt`

### Step 2

Run the CLI:

`npx typescript-top-errors -inputFile=ts.errors.txt`

`npm exec typescript-top-errors`

## Options

# -inputFile

Path to the tsc output file

# -topErrors

Numbers of TypeScript errors to report (default is 10)

# -topMessages

Numbers of Unique Typescript specific to your codebase to report (default is 10)

You can also
