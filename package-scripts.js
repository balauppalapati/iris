const {rimraf} = require('nps-utils')

module.exports = {
  scripts: {
    default: 'nps dev',
    dev: 'NODE_ENV=development nodemon server/server.js --watch server --watch common --ext js,json,yml',
    lint: 'eslint .',
    posttest: 'npm run lint && nsp check',
    webpack: {
      default: 'nps webpack.build',
      build: {
        before: rimraf('dist'),
        default: `webpack`
      }
    }
  },
}
