const spawn = require('cross-spawn').sync;

module.exports = {
  getLineNumbers: function(fileName) {
    //  Get the diff hunk of a given file which is staged.
    const res = spawn(`git diff -p -U0 --cached ${fileName}`).stdout.toString();

    let matches = null;
    const lines = (res || '').split('\n');

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
  },

  getDiffFiles: function() {
    try {
      let files = spawn(`git diff --cached --name-only -- '*.js'`).stdout.toString();
      files = (files || '').split('\n');
      files.pop();
      return files;
    } catch (e) {
      return [];
    }
  }
}
