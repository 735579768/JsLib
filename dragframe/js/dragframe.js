$(function() {
	/**
	 * 左右拖动类
	 */
	! function(a, b) {
		"use strict";
		var c = function(conf) {
			this.conf = {
				type: 1,
				mainFrame: '#td-frame',
				frameL: '.td-line',
				frame1: '.td-left',
				frame2: '.td-right',
				callback: null

			};
			for (a in conf) {
				this.conf[a] = conf[a];
			}
			this.drF = null;
			this.drF1 = null;
			this.drF2 = null;
			this.drL = null;
			this.mIng = false;
			this.mDown = false;
			this.zuoBiao = [0, 0];
			this.init(conf['mainFrame']);
		};
		c.prototype = {
			path: function() {
				var a = document.scripts;
				var b = a[a.length - 1];
				var c = b.src;
				return c.substring(0, c.lastIndexOf("/") + 1);
			}(),
			init: function(id) {
				var _t = this;
				var _tf = _t.drF = $(id);

				_t.drF1 = _tf.children(_t.conf.frame1);
				_t.drF2 = _tf.children(_t.conf.frame2);
				_t.drL = _tf.children(_t.conf.frameL);
				_t.initFrameSize();
				_t.bindMove();
				return _t;
			},
			initFrameSize: function() {
				var _t = this;
				if (_t.conf.type == 1) {
					var parW = _t.drF.width();
					_t.drF1.width(parW / 2);
					_t.drF2.width(parW / 2 - _t.drL.width());
					_t.drL.css({
						'left': parW / 2 + 'px'
					});
				} else {
					var parH = _t.drF.height();
					_t.drF1.height(parH / 2);
					_t.drF2.height(parH / 2 - _t.drL.height());
					_t.drL.css({
						'top': parH / 2 + 'px'
					});
				}

			},
			/**
			 * 绑定推动事件
			 */
			bindMove: function() {
				var _t = this;
				_t.drL.mousedown(function(event) {
					_t.mDown = true;
					_t.zuoBiao[0] = event.clientX;
					_t.zuoBiao[1] = event.clientY;
					_t.addShade();
				});
				$(document).mouseup(function(event) {
					_t.mDown = false;
					_t.mIng = false;
					$('#td_frame_bg').remove();
				});
			},
			addShade: function() {
				var _t = this;
				$('body').append('<div id="td_frame_bg" class="td_frame_bg"></div>')
				var bg = $('#td_frame_bg');
				bg.css({
					'height': $(document).height() + 'px',
					'width': $(document).width() + 'px'
				});
				var le = _t.drF1;
				var li = _t.drL;
				var ri = _t.drF2;

				bg.mousemove(function(event) {
					_t.conf.callback && _t.conf.callback(event);
					if (_t.conf.type == 1) {
						var _x = event.clientX - _t.zuoBiao[0];
						_t.zuoBiao[0] = event.clientX;
						if (_t.mDown && !_t.mIng) {
							_t.mIng = true;
							var lw = _x + le.width();
							var rw = ri.width() - _x;
							if (lw <= 0 || rw <= 0) {
								return;
							}
							var lwidth = _x + le.width();
							le.width(lw);
							ri.width(rw);
							li.css({
								'left': lw + 'px'
							});
							_t.mIng = false;
						}
					} else {
						var _y = event.clientY - _t.zuoBiao[1];
						_t.zuoBiao[1] = event.clientY;
						if (_t.mDown && !_t.mIng) {
							_t.mIng = true;
							var uh = le.height() + _y;
							var dh = ri.height() - _y;
							if (uh <= 0 || dh <= 0) {
								return;
							}
							le.height(uh);
							ri.height(dh);
							li.css({
								'top': uh + 'px'
							});
							_t.mIng = false;
						}
					}
				});
			}

		};
		a.dragFrame = function(conf) {
			return new c(conf);
		};
	}(window);
});