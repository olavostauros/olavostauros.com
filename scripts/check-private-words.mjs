// Fails if a private word (a private repo's codename, a host name...) shows up
// in anything that gets published. The words live in `.private-words`, one
// per line (`#` starts a comment), which is gitignored: naming them here
// would publish them. Without the file it warns and passes, so CI still runs.
//
// Matches are reported by line number in `.private-words`, never by the word
// itself, so the output is safe to paste or to show in a public CI log.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(import.meta.dirname, "..");
const wordsFile = join(root, ".private-words");
const dirs = ["src", "public", "docs", "dist"];

if (!existsSync(wordsFile)) {
  console.warn("check-private-words: .private-words not found, skipping (see AGENTS.md §4).");
  process.exit(0);
}

const words = readFileSync(wordsFile, "utf8")
  .split("\n")
  .map((line, i) => ({ line: i + 1, word: line.replace(/#.*/, "").trim().toLowerCase() }))
  .filter((w) => w.word);

if (words.length === 0) {
  console.warn("check-private-words: .private-words has no words, skipping.");
  process.exit(0);
}

// Root files (AGENTS.md, README.md, package.json...) are public too.
const files = readdirSync(root, { withFileTypes: true })
  .filter((e) => e.isFile() && e.name !== ".private-words")
  .map((e) => join(root, e.name));
for (const dir of dirs) {
  if (!existsSync(join(root, dir))) continue;
  for (const e of readdirSync(join(root, dir), { recursive: true, withFileTypes: true })) {
    if (e.isFile()) files.push(join(e.parentPath, e.name));
  }
}

let hits = 0;
for (const file of files) {
  // latin1 keeps every byte, so binary files (images) are searched too.
  const text = readFileSync(file, "latin1").toLowerCase();
  const utf8 = readFileSync(file, "utf8").toLowerCase();
  for (const { line, word } of words) {
    if (text.includes(word) || utf8.includes(word)) {
      console.error(`  ${relative(root, file)}: word on line ${line} of .private-words`);
      hits++;
    }
  }
}

if (hits > 0) {
  console.error(`check-private-words: ${hits} match(es) in ${files.length} files. Remove them before committing.`);
  process.exit(1);
}
console.log(`check-private-words: ${words.length} word(s), ${files.length} files, clean.`);
