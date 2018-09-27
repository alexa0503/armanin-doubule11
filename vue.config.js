module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost',
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
