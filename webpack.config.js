const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	devServer: {
		hot: true,
		liveReload: true,
	},
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: ['pug-loader'],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.pug',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.css',
		}),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					warnings: false,
					drop_console: true,
				},
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
};
