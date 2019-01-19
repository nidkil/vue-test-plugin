<p align="center">
  <img src="https://raw.githubusercontent.com/nidkil/vue-test-plugin/master/public/vue-test-plugin-logo.png" alt="vue-test-plugin logo" width="200"/>
</p>
<p align="center" style="font-size: 2.0em"><b>vue-test-plugin</b></p>
<p align="center" style="font-size: 0.5em">Simple Vue 2 plugin to test Vue CLI 3 service build functionality</p>

[![Build status](https://travis-ci.com/nidkil/vue-test-plugin.svg?branch=master)](https://travis-ci.com/nidkil/vue-test-plugin)
[![Coverage Status](https://coveralls.io/repos/github/nidkil/vue-test-plugin/badge.svg)](https://coveralls.io/github/nidkil/vue-test-plugin)
[![Vue 2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![Vue CLI 3](https://img.shields.io/badge/vue%20cli-3-brightgreen.svg)](https://cli.vuejs.org/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![Hit count](http://hits.dwyl.com/nidkil/vue-test-plugin.svg)](http://hits.dwyl.com/dwyl/start-here)
[![License MIT](https://img.shields.io/badge/license-mit-yellow.svg)](https://opensource.org/licenses/MIT) [![Greenkeeper badge](https://badges.greenkeeper.io/nidkil/vue-test-plugin.svg)](https://greenkeeper.io/)

> Simple Vue 2 plugin to test Vue CLI 3 service build functionality

I am developing a Vue 2 plugin. During this process I ran into some hiccups getting the plugin to work and build a production version using Vue CLI 3. So I decided to setup a test repository to test the following:

1. Create a basic plugin that mounts the plugin on the Vue instances
2. Test the plugin with an example app
3. Unit test the plugin
4. Build a production version of the plugin

Nothing to fancy, but it might be of help to others setting up a project for a Vue 2 plugin, so I will make it generally available. Enjoy!

<a name="toc">
  <strong>Table of Contents</strong>

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Tips & tricks](#tips--tricks)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Support & brag about us](#support--brag-about-us)
- [Author](#author)

<!-- tocstop -->

</a>

## Installation

### Local

Install directly from Github as a `dependency` using [npm](https://www.npmjs.com/):

```bash
npm install --save git+https://git@github.com/nidkil/vue-test-plugin.git
```

Or if you need SSH:

```bash
npm install --save git+ssh://git@github.com/nidkil/vue-test-plugin.git
```

[Go to Table of Contents](#toc)

## Usage

### Project structure

Below the most important directories are explained.

```
├── vue-test-plugin
│   ├── dist                            Build destination folder
│   ├── plugin                          Source of the plugin
│   ├── src                             An example app that uses the plugin
│   │   ├── plugin
│   │   │   └── vue-test-plugin.js      Initializes the plugin
│   │   └── main.js                     Calls the plugin
│   └── tests                           Unit tests for the plugin
```

[Go to Table of Contents](#toc)

### Compile and hot-reload for development

Start the development server with the following npm command. It will automatically open the browser.

```
npm run serve
```

To see debugging output from the plugin open the browser development tools (`ctrl+shift+i`). You will see a number of debugging messages that display the name of the plugin and version number. It will also display the same information on the page of the example app.

In the example app the plugin can be referenced in two ways:

1) Reference the source in the `plugin` folder; or
2) Reference the compiled version in the `dist` folder.

> **Caveat**: To use the compiled version babel needs an extra configuration option set (see tips & tricks). This is only needed when using the example app that is part of the repo or when using `npm link` or `yarn link`.

[Go to Table of Contents](#toc)

### Compiles and minifies the plugin for production

To compile the plugin run the following command.

```
npm run build
```

### Run the unit tests

```
npm run test:unit
```

### Lint and fix files

```
npm run lint:fix
```

[Go to Table of Contents](#toc)

## Tips & tricks

### Setting aliases

With the babel `module_resolver` plugin you can set aliases for directories, so that you do not have to use complicated import paths, i.e. ../../src/<module-name>.

Install the `babel-plugin-module-resolver` plugin module using npm.

```bash
$ npm install --save-dev babel-plugin-module-resolver
```

Update the `babel.config.js` configuration file.

```js
module.exports = {
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@': require('path').resolve(__dirname, './src'),
        'plugin': require('path').resolve(__dirname, './plugin'),
        'root': require('path').resolve(__dirname)
      }
    }]
  ]
}
```

For the aliases to work with jest you must set the same aliases with the `moduleNameMapper` option in the `jest.config.js` configuration file. The aliases must be an exact match with the aliases defined in the `babel.config.js` file.

```js
module.exports = {
   moduleNameMapper: {
     "@/(.*)$": "<rootDir>/src/$1",
     '^plugin/(.*)$': '<rootDir>/plugin/$1',
     '^root/(.*)$': '<rootDir>/$1'
   }
}
```

**Pro tip 1**: If you are using webpack aliases, the above babel and jest aliases also have to be set for them to work correctly. Keep in mind that Vue CLI 3 generates the `webpack.config.js` file on the fly. To add settings to it you need to create a `vue.config.js` file. Here are the aliases of the `vue.config.js` file.

```js
const path = require('path')
module.exports = {
  chainWebpack: config => {
    config
      .resolve
      .alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('dist', path.resolve(__dirname, 'dist'))
      .set('plugin', path.resolve(__dirname, 'plugin'))
      .set('root', path.resolve(__dirname))
  }
}
```

**Pro tip 2**: If you are using Webstorm you still need the `webpack.config.js` file for the aliases to be recognized. Just add the `webpack.config.js` file to the project root directory. Here are the aliases of the `webpack.config.js` file.

```js
const path = require('path')
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'dist': path.resolve(__dirname, 'dist'),
      'plugin': path.resolve(__dirname, 'plugin'),
      'root': path.resolve(__dirname)
    }
  }
}
```

> **Note** that the `vue.config.js` and `webpack.config.js` files contain additional aliases that are only relevant to webpack.

### Error : "Cannot assign to read only property ‘exports’ of object"

When testing the Vue plugin locally or as a local [npm](https://www.npmjs.com/) module (link) you might run into the error “Cannot assign to read only property ‘exports’ of object”.

It took a lot of googling around to find the solution. It turns out it has to do with [Babel](https://babeljs.io/) and [webpack](https://webpack.js.org/). As always once you know the solution it is simple. I had to add `sourceType unambiguous` to my `babel.config.js file`. This is my `babel.config.js` file:

```js
module.exports = {
  presets: [
    '@vue/app'
  ],
  sourceType: 'unambiguous'
}
```

This comment of a [webpack issue](https://github.com/webpack/webpack/issues/4039#issuecomment-419284940) contains the explanation. Please check it out to understand why this works.

I hope this helps someone and saves them (lots of) time.

[Go to Table of Contents](#toc)

## Roadmap

Currently there is nothing on the roadmap. Suggestions? Please submit an issue.

[Go to Table of Contents](#toc)

## Contributing

We welcome pull requests! What follows is the simplified version of the contribution process, please read [here](./CONTRIBUTING.md) to fully understand our contribution policy and [here](./CODE-OF-CONDUCT.md) to understand our code of conduct.

1. Fork the repository [here](https://github.com/nidkil/vue-test-plugin)!
2. Create your feature branch: `git checkout -b my-new-feature`
3. If relevant, don't forget to add your tests and comment your code
4. Commit your changes: `npm run commit`
5. Push the branch: `git push origin my-new-feature`
6. Submit a pull request :-)

[Go to Table of Contents](#toc)

## Support & brag about us

If you like this project, please support us by starring ⭐ [this](https://github.com/nidkil/vue-test-plugin) repository. Thx!

Please let the world know about us! Brag about us using Twitter, email, blog, Discord, Slack, forums, etc. etc. Thx!

[Go to Table of Contents](#toc)

## Author

**nidkil** © [nidkil](https://github.com/nidkil), released under the [MIT](LICENSE.md) license.
Authored and maintained by nidkil with help from [contributors](https://github.com/nidkil/vue-test-plugin/contributors).

> [Website](https://nidkil.com) · GitHub [@nidkil](https://github.com/nidkil) · Twitter [@nidkil](https://twitter.com/nidkil)
