const eslint = require('eslint');
const path = require('path');
const { getLineNumbers, getDiffFiles } = require('./helpers');

const ESLINT_ERROR_LEVEL = 2;

const PROCESS_SUCCESS_EXIT = 0;
const PROCESS_FAILURE_EXIT = 1;

const CLIEngine = new eslint.CLIEngine();
const Formatter = CLIEngine.getFormatter();

function eslintRunner() {
  const files = getDiffFiles();

  const changes = {};

  for (const file of files) {
    const absoluteFilePath = path.resolve(file);
    changes[absoluteFilePath] = getLineNumbers(file);
  }

  const eslintReport = CLIEngine.executeOnFiles(
    CLIEngine.resolveFileGlobPatterns(files),
  );

  let totalErrCount = 0;

  const filteredResults = eslintReport.results.map(resultFrag => {
    const { filePath } = resultFrag;
    const cachedChangeObj = changes[filePath];
    let newWarningCount = 0,
      newErrorCount = 0;

    resultFrag.messages = resultFrag.messages.filter(msg => {
      if (cachedChangeObj[msg.line]) {
        if (msg.severity === ESLINT_ERROR_LEVEL) {
          newErrorCount++;
        } else {
          newWarningCount++;
        }
        return true;
      }
      return false;
    });

    totalErrCount += newErrorCount;

    resultFrag.errorCount = newErrorCount;
    resultFrag.warningCount = newWarningCount;

    return resultFrag;
  });

  const formattedString = Formatter(filteredResults);

  console.log(formattedString);

  return totalErrCount;
}

function main() {
  const errCount = eslintRunner();

  process.exit(errCount > 0 ? PROCESS_FAILURE_EXIT : PROCESS_SUCCESS_EXIT);
}

module.exports = main;
