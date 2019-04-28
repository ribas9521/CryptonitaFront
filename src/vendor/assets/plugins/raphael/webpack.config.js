"use strict";
/* eslint-disable import/first */
const webpack = require("webpack");
const fs = require("fs");
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


const args = process.argv;

let plugins = [
	new webpack.BannerPlugin(fs.readFileSync('./dev/banner.txt', 'utf8'), { raw: true, entryOnly: true }),
	new webpack.ProvidePlugin({
		$: "jquery",
		jquery: "jquery",
		"window.jQuery": "jquery",
		jQuery: "jquery"
	}),
	new ManifestPlugin({
		fileName: 'asset-manifest.json', // Not to confuse with manifest.json 
	}),
	new SWPrecacheWebpackPlugin({
		// By default, a cache-busting query parameter is appended to requests
		// used to populate the caches, to ensure the responses are fresh.
		// If a URL is already hashed by Webpack, then there is no concern
		// about it being stale, and the cache-busting can be skipped.
		dontCacheBustUrlsMatching: /\.\w{8}\./,
		filename: 'service-worker.js',
		logger(message) {
			if (message.indexOf('Total precache size is') === 0) {
				// This message occurs for every build and is a bit too noisy.
				return;
			}
			console.log(message);
		},
		minify: true, // minify and uglify the script
		navigateFallback: '/index.html',
		staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
	}),
	new CopyWebpackPlugin([
		{ from: 'src' }, // define the path of the files to be copied
	])

];
let externals = { jquery: 'jQuery' };
let filename = "raphael";


if (args.indexOf('--no-deps') !== -1) {
	console.log('Building version without deps');
	externals.push("eve");
	filename += ".no-deps"
}

if (args.indexOf('--min') !== -1) {
	console.log('Building minified version');
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				dead_code: false,
				unused: false
			}
		})
	);
	filename += ".min"
}

module.exports = {
	entry: './dev/raphael.amd.js',
	output: {
		filename: filename + ".js",
		libraryTarget: "umd",
		library: "Raphael"
	},

	externals: {

	},

	plugins: plugins,

	loaders: [
		{
			test: /\.js$/,
			loader: "eslint-loader",
			include: "./dev/"
		}
	],

	eslint: {
		configFile: './.eslintrc.json'
	},
	node: {
		dns: 'mock',
		net: 'mock'
	},
	resolve: {
		modulesDirectories: ["bower_components"],
		alias: {
			"eve": "eve-raphael/eve"
		}
	}
};
