// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8'],
    },
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 7,
      propList: ['*']
    }

  }
}
