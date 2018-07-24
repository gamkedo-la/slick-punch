const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
        {
          test: /\.js$/i,
          enforce: "pre",
          exclude: /node_modules/,
          use: [
            	  { loader: "eslint-loader",
            	    options: {
            	             failOnError: false,
            	             failOnWarning: false,
                           fix: false
            	    },
            	  },
            ]
        },

        {
          test: /\.js$/i,
          enforce: "pre",
          exclude: /node_modules/,
          use: [
                { loader: "babel-loader"},
            ]
        },

      	
        {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
        },

        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
     ]
  },
  
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};