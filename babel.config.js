const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, './src');

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx'],
          alias: fs.readdirSync(srcDir)
            .filter((filename) => fs.statSync(path.join(srcDir, filename)).isDirectory())
            .map((dirname) => ({key: `@/${dirname}`, value: `./src/${dirname}`}))
            .reduce((aliases, aliasObject) => Object.assign(aliases, {[aliasObject.key]: aliasObject.value}), {}),
        },
      ],
    ],
  };
};
