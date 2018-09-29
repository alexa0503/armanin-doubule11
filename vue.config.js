module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1/',
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
