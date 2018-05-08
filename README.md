# 🚀 ESLINT ON MODIFICATIONS ONLY 🚀

The problem with linting is that it doesn't work on the lines you have changed or modified. It works on the entire file. This problem is trivial on small codebases but as number of files and their sizes grow, it can become an issue.

Linting becomes irrelevant when every error on the file is reported instead of errors that you introduced by your change. It's hard to find relevant errors in the noisy lint report.

I believe linting should happen only on the changes that you've introduced.

🥁🥁 **__DRUMROLL PLEASE__** 🥁🥁

#### Presenting ESLint on modifications only.

The idea behind this library is simple: Lint only what you've changed.

## USAGE:

To add it to your already existing codebase, run either `npm install eslint-on-modifications --save-dev` or `yarn add --dev eslint-on-modifications` depending on which package manager you use.

After installing, you can add a npm script in your `package.json` like:

```json
  {
    "scripts": {
      "lint": "eslint-on-modifications"
    }
  }
```

You can now run `yarn lint` or `npm run lint` to check for errors/warnings that you introduced.

Out of the box, eslint on modifications is running on steriods. It will check which javascript files are currently staged and will invoke ESLint for them.

It uses the default formatter that comes bundled with ESLint, which means warnings and errors are properly color coded.
