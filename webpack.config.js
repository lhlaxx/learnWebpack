const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	entry: './src/js/main.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				/*
                    package.json中的eslintConfig中设置检查规则
                    airbnb
                */
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					//自动修复
					fix: true
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						//还需要在package.json中定义browserlist
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: () => [require('postcss-preset-env')()]
							}
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						//还需要在package.json中定义browserlist
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: () => [require('postcss-preset-env')()]
							}
						}
					},
					'less-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						/*css兼容性处理：postcss --> postcss-loader postcss-preset-env
                        postcss-preset-env帮postcss找到package.json中browserslist中的配置，通过配置加载指定的css兼容性样式
						//还需要在package.json中定义browserlist
                        */
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: () => [require('postcss-preset-env')()]
							}
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/index.css'
		}),
		new OptimizeCssAssetsWebpackPlugin()
	],
	mode: 'development'
};
