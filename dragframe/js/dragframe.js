$(function() {
	/**
	 * 左右拖动类
	 */
	! function(a, b) {
		"use strict";
		var d = {
			objlist: [],
			//当多个框架嵌套的时候需要在回调函数中执行drag.resetSize();同步其它框架大小
			resetSize: function() {
				for (a in this.objlist) {
					this.objlist[a].resetSize();
				}
			}
		};
		var c = function(conf) {
			this.conf = {
				type: 1, //框架类型1左右  2上下
				mainFrame: '#td-frame', //主框架的容器选择器
				frameL: '.td-line', //推动线的选择器
				frame1: '.td-left', //第一个框架选择器
				frame1Size: 0, //第一个框架默认宽或高(左右框架为宽,下下框架为高)
				frame2: '.td-right', //第二个框架的选择器
				frame2Size: 0, //第二个框架默认宽或高(左右框架为宽,下下框架为高)
				callback: null //拖动过程中的回调

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
			this.drF1BL = 0; //第一个框架占的比例
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
				_t.drF.addClass('drag-m-frame');
				_t.drF1.addClass('drag-f1');
				_t.drF2.addClass('drag-f2');
				_t.drL.addClass('drag-line');
				_t.initFrameSize();
				_t.bindMove();
				return _t;
			},
			resetSize: function() {
				var _t = this;
				if (_t.conf.type == 1) {
					var parW = _t.drF.width();
					var lW = _t.drL.outerWidth();
					var sW = _t.drF1.width() + _t.drF2.width();
					if ((lW + sW) == parW) {
						return;
					}
					var bl = ((_t.drF1.width() / sW) + '');
					var bili = parseFloat(bl.substring(0, bl.lastIndexOf('.') + 2));
					var f1w = parseInt(parW * bili);
					_t.drL.css('left', f1w + 'px');
					_t.drF1.width(f1w);
					_t.drF2.width(parW - f1w - lW);
					console.log(_t);
				} else {
					var parH = _t.drF.height();
					var lH = _t.drL.outerHeight();
					var sH = _t.drF1.height() + _t.drF2.height();
					if ((lH + sH) == parH) {
						return;
					}
					var bl = ((_t.drF1.height() / sW) + '');
					var bili = parseFloat(bl.substring(0, bl.lastIndexOf('.') + 2));
					var f1h = parseInt(parH * bili);
					_t.drL.css('left', f1h + 'px');
					_t.drF1.height(f1h);
					_t.drF2.height(parH - f1h - lH);
				}
			},
			initFrameSize: function() {
				var _t = this;
				if (_t.conf.type == 1) {
					_t.drF.addClass('drag-lr-frame')
					var parW = _t.drF.width();
					_t.drF1.width(parW / 2);
					_t.drF2.width(parW / 2 - _t.drL.outerWidth());
					_t.drL.css({
						'left': parW / 2 + 'px',
					});
					_t.drF1.css({
						'left': '0px',
						'top': '0px',
					});
					_t.drF2.css({
						'right': '0px',
						'top': '0px',
					});

				} else {
					_t.drF.addClass('drag-ud-frame')
					var parH = _t.drF.height();
					_t.drF1.height(parH / 2);
					_t.drF2.height(parH / 2 - _t.drL.outerHeight());
					_t.drL.css({
						'top': parH / 2 + 'px',
					});
					_t.drF1.css({
						'left': '0px',
						'top': '0px',
					});
					_t.drF2.css({
						'left': '0px',
						'bottom': '0px',
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
					$('#drag_frame_bg').remove();
				});
			},
			addShade: function() {
				var _t = this;
				var c = _t.conf;
				$('body').append('<div id="drag_frame_bg" class="drag_frame_bg"></div>')
				var bg = $('#drag_frame_bg');
				bg.css({
					'height': $(document).height() + 'px',
					'width': $(document).width() + 'px'
				});
				var f1 = _t.drF1;
				var li = _t.drL;
				var f2 = _t.drF2;

				bg.mousemove(function(event) {

					if (c.type == 1) {
						var _x = event.clientX - _t.zuoBiao[0];
						_t.zuoBiao[0] = event.clientX;
						if (_t.mDown && !_t.mIng) {
							(typeof(c.callback) == 'function') && c.callback(event);
							_t.mIng = true;
							var lw = _x + f1.width();
							var rw = f2.width() - _x;
							if (lw <= 0 || rw <= 0) {
								return;
							}
							var lwidth = _x + f1.width();
							f1.width(lw);
							f2.width(rw);
							var bl = ((lw / (lw + rw)) + '');
							_t.drF1BL = parseFloat(bl.substring(0, bl.lastIndexOf('.') + 2));
							li.css('left', lw + 'px');
							_t.mIng = false;
						}
					} else {
						var _y = event.clientY - _t.zuoBiao[1];
						_t.zuoBiao[1] = event.clientY;
						if (_t.mDown && !_t.mIng) {
							(typeof(c.callback) == 'function') && c.callback(event);
							_t.mIng = true;
							var uh = f1.height() + _y;
							var dh = f2.height() - _y;
							if (uh <= 0 || dh <= 0) {
								return;
							}
							f1.height(uh);
							f2.height(dh);
							li.css('top', uh + 'px');
							_t.mIng = false;
						}
					}
				});
			}

		};
		a.dragFrame = {
			resetSize: function() {
				d.resetSize();
			},
			init: function(conf) {
				var o = new c(conf);
				d.objlist.push(o);
				return o;
			}
		};
	}(window);
});