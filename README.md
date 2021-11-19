# React Simple Boilerplate

Already intalled and configured:
* ESLint (airbnb)
* Prettier
* Stylelint (standard)
* Husky with lint-staged

Install with `npm install` or `yarn install`

Run with `npm start` or `yarn start`

Lint with `npm run lint` or `yarn run lint`

# Configure git (only for Windows)

Force git to use LF end of line everywhere:

```bash
git config --global core.eol lf
git config --global core.autocrlf input
```

If you've already cloned this repository, remove it and clone it again.

# Configure Visual Studio Code

## Install ESLint

1. In Visual Studio Code go to View -> Extensions
2. Search for `eslint`: [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. Click Install

## Install Prettier

1. In Visual Studio Code go to View -> Extensions
2. Search for `prettier code formatter`: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. Click Install

## Install Stylelint

1. In Visual Studio Code go to View -> Extensions
2. Search for `stylelint`: [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
3. Click Install

## Visual Studio Code Settings

1. Go to File -> Preferences -> Settings.
2. On the top right corner, click on the file icon `Open Settings (JSON)`.
3. Add the code below before the last closing curly brace:

```js
{
  /* existing configurations... */

  /* began to copy setting from here */
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "files.eol": "\n",
  "editor.tabSize": 2,
  /* do not copy after here */
}
```

You might have to close and reopen Visual Studio Code after the plugins install and setting changes.# zapparticle
