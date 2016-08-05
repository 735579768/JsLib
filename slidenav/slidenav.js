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
			_t.scrollh = 0;
			_t.seting = false;
			_t.nav = $(id);
			$(document).scroll(function(event) {
				if (!_t.seting) {
					_t.seting = true;
					var nav = _t.nav;
					var navh = nav.outerHeight();
					var wh = $(window).scrollTop();
					if (wh > navh && (wh - _t.scrollh) > 0) {
						//向下滚动,隐藏导航

						if (nav.css('top') == '0px') {
							nav.stop(true).animate({
								top: 5
							}, 100, function() {
								nav.stop(true).animate({
									top: -navh
								}, 300, function() {
									_t.seting = false;
								});
							});
						} else {
							_t.seting = false;
						}
					} else {
						//向上滚动,显示导航
						if (nav.css('top') == '0px') {
							_t.seting = false;
						} else {
							nav.stop(true).animate({
								top: 0
							}, 300, function() {
								_t.seting = false;
							});
						}

					}
					_t.scrollh = wh;
				} else {
					return;
				}

			});
		}
	};