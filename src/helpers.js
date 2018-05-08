import { exec } from 'child-process-promise';

export async function getLineNumbers(fileName) {
  const res = await exec(`git diff -p -U0 --cached ${fileName}`);

  let matches = null;
  const lines = (res.stdout || '').split('\n');

  const changedLines = {};

  for (const line of lines) {
    matches = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
    if (matches && matches.length >= 2) {
      let start = parseInt(matches[1], 10);
      const upto = parseInt(matches[2], 10) || 1;

      for (const end = start + upto; start < end; start++) {
        changedLines[start] = true;
      }
      matches = null;
    }
  }
  return changedLines;
}

export async function getDiffFiles() {
  try {
    let files = await exec(`git diff --cached --name-only -- '*.js'`);
    files = (files.stdout || '').split('\n');
    files.pop();
    return files;
  } catch (e) {
    return [];
  }
}
