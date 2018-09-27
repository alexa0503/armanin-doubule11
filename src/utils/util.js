function getStyle(el) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(el, null);
	} else {
		return el.currentStyle;
	}
}
export const getWH = function(el, name) {
	var val = name === 'width' ? el.offsetWidth : el.offsetHeight,
		which = name === 'width' ? [ 'Left', 'Right' ] : [ 'Top', 'Bottom' ];
	// display is none
	if (val === 0) {
		return 0;
	}
	var style = getStyle(el);
	// 左右或上下两边的都减去
	for (var i = 0, a; (a = which[i++]); ) {
		val -= parseFloat(style['border' + a + 'Width']) || 0;
		val -= parseFloat(style['padding' + a]) || 0;
	}
	return val;
};
