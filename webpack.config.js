const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const pkg = require('./package.json');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: pkg.name,
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: [ 'raw-loader' ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|png|jpg|gif|svg|mp4)$/,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/
        ],
        use: ['url-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
        ],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
            {
                loader: 'style-loader',
                options: {
                    injectType: 'singletonStyleTag',
                    attributes: {
                        'data-cke': true
                    }
                }
            },
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: styles.getPostCssConfig( {
                        themeImporter: {
                            themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                        },
                        minify: true
                    } )
                }
            }
        ]
      },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              ["react-remove-properties", { "properties": ["data-testid"] }]
            ]
          }
        }],
        exclude: /node_modules/,
      }
    ]
  },
  // Attempt to resolve these extensions in order. 
  // If multiple files share the same name but have different extensions, 
  // webpack will resolve the one with the extension listed first 
  // in the array and skip the rest.
  // Use '...' to access the default extensions
  resolve: {
    extensions: ['.jsx', '.js', '...']
  },
  target: 'node',
  externals: {
    react: 'react'
  }
};
