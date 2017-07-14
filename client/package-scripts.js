const {series, rimraf} = require('nps-utils')

module.exports = {
  scripts: {
    default: 'nps webpack',
    build: 'nps webpack.build',
    webpack: {
      default: 'nps webpack.server',
      build: {
        before: rimraf('dist'),
        default: 'nps webpack.build.production',
        development: {
          default: series(
            'nps webpack.build.before',
            'webpack-dashboard -- webpack --progress -d'
          ),
          extractCss: series(
            'nps webpack.build.before',
            'webpack-dashboard -- webpack --progress -d --env.extractCss'
          ),
          serve: series.nps(
            'webpack.build.development',
            'serve'
          ),
        },
        production: {
          inlineCss: series(
            'nps webpack.build.before',
            'webpack-dashboard -- webpack --progress -p --env.production'
          ),
          default: series(
            'nps webpack.build.before',
            'webpack-dashboard -- webpack --progress -p --env.production --env.extractCss'
          ),
          serve: series.nps(
            'webpack.build.production',
            'serve'
          ),
        }
      },
      server: {
        default: `webpack-dashboard -- webpack-dev-server -d --devtool '#source-map' --inline --env.server`,
        extractCss: `webpack-dashboard -- webpack-dev-server -d --devtool '#source-map' --inline --env.server --env.extractCss`,
        hmr: `webpack-dashboard -- webpack-dev-server -d --devtool '#source-map' --inline --hot --env.server`
      },
    },
    serve: 'http-server dist --cors',
  },
}
