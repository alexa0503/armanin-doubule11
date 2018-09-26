module.exports = {
	baseUrl: '',
	runtimeCompiler: true,
	outputDir: undefined,
	assetsDir: undefined,
	productionSourceMap: undefined,
	parallel: undefined,
	devServer: {
		overlay: {
			warnings: false,
			errors: false
		}
	},
	css: {
		sourceMap: true
	},

	lintOnSave: false
};
