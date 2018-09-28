module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1/armani-double11-serve/',
				ws: true,
				changeOrigin: true
			}
		},
		overlay: {
			warnings: false,
			errors: false
		}
	},
	baseUrl: '',
	runtimeCompiler: true,
	outputDir: undefined,
	assetsDir: undefined,
	productionSourceMap: undefined,
	parallel: undefined,
	css: {
		sourceMap: true
	},

	lintOnSave: false
};
