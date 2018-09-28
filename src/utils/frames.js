function loadImgs(urls, callback) {
	var count = urls.length;
	var result = [];
	for (var i = 0; i < urls.length; i++) {
		var img = new Image();
		result.push(img);
		img.src = urls[i];
		img.onload = function() {
			if (--count == 0) callback(urls, result);
		};
	}
}
export const drawFrames = function({ id, width, height, imgs }) {
	var frames = document.getElementById(id);
	if (!width) {
		width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}
	if (!height) {
		height = Math.ceil(1208 / 750 * width);
	}
	frames.width = width;
	frames.height = height;
	var ctx = frames.getContext('2d');
	loadImgs(imgs, function(urls, imgs) {
		var count = 0;
		setInterval(function() {
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(imgs[count], 0, 0, width, height);
			count = (count + 1) % urls.length;
		}, 60);
	});
};
