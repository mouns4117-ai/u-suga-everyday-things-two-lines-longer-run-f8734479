import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A toaster is a tiny sunbed where bread lies down to get a tan, and the darker it gets, the crunchier it wakes up.";
const LINE_2 =
  "The sunbed fits because the same heat browns skin and bread, but it leaves out that bread never chooses its tan — the timer pops it up before it burns.";
const ENTRY = `${LINE_1}\n${LINE_2}\n`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
// Empty the output directory's CONTENTS only; never remove the directory itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry length ${ENTRY.length} is outside the 1-400 gate`);
}
const lines = ENTRY.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${lines.length}`);
}
for (const line of lines) {
  if (!line.trim()) {
    throw new Error("entry lines must not be blank");
  }
  if (line.split(".").length - 1 !== 1) {
    throw new Error("each line must be a single sentence");
  }
}

writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
