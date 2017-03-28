const webpack = require('webpack');

const plugins = [
  {
    apply: function apply(compiler) {
      compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
        this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()");
        return false;
      });
    },
  },
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    screw_ie8: true,
    warnings: false,
  } }));
}

module.exports = {
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }],
  },
  output: {
    library: 'rereducer',
    libraryTarget: 'umd',
  },
  plugins,
  stats: { colors: { green: '\u001b[32m' } },
};
