// https://github.com/michael-ciniawsky/postcss-load-config
const pxtorem =require('postcss-pxtorem')
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8', 'Chrome > 31', 'ff > 31', 'ie >= 10', 'Safari >= 8', 'last 10 version'],
      grid: true
    },
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-pxtorem': {
      rootValue: 37.5,
      rootValuePC:192,
      propList: ['*'],
      unitPrecision: 7,
      mediaQuery: false,
      propList: ['*']
    }

  }

}
