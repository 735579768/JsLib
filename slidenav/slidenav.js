	/**
	 * 使用前请把导航样式定位到顶部0px,定位用fixed
	 * @type {Object}
	 */
	window.slideNav = {
		/**
		 * 绑定导航显示和隐藏
		 */
		init: function(id) {
			var _t = this;
			_t.a = 0;
			_t.b = false;
			_t.c = $(id);
			$(document).scroll(function(event) {
				if (!_t.b) {
					_t.b = true;
					var d = _t.c;
					var dh = d.outerHeight();
					var wh = $(window).scrollTop();
					if (wh > dh && (wh - _t.a) > 0) {
						//向下滚动,隐藏导航

						if (d.css('top') == '0px') {
							d.stop(true).animate({
								top: 5
							}, 100, function() {
								d.stop(true).animate({
									top: -dh
								}, 300, function() {
									_t.b = false;
								});
							});
						} else {
							_t.b = false;
						}
					} else {
						//向上滚动,显示导航
						if (d.css('top') == '0px') {
							_t.b = false;
						} else {
							d.stop(true).animate({
								top: 0
							}, 300, function() {
								_t.b = false;
							});
						}

					}
					_t.a = wh;
				} else {
					return;
				}

			});
		}
	};