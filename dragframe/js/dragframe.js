$(function() {
	/**
	 * 左右拖动类
	 */
	! function(a, b) {
		"use strict";
		var c = function(id, callback) {
			this.tdFrame = null;
			this.tdLeft = null;
			this.tdRight = null;
			this.tdLine = null;
			this.moveIng = false;
			this.mouseDown = false;
			this.zuoBiao = [0, 0];
			this.callback = callback;
			this.init(id);
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
				var _tf = _t.tdFrame = $(id);

				_t.tdLeft = _tf.children('.td-left');
				_t.tdRight = _tf.children('.td-right');
				_t.tdLine = _tf.children('.td-line');
				_t.initFrameSize();
				_t.bindMove();
				return _t;
			},
			initFrameSize: function() {
				var _t = this;
				var parW = _t.tdFrame.width();
				_t.tdLeft.width(parW / 2);
				_t.tdRight.width(parW / 2 - _t.tdLine.width());
				_t.tdLine.css({
					'left': parW / 2 + 'px',
					'height': _t.tdFrame.height() + 'px'
				});
			},
			/**
			 * 绑定推动事件
			 */
			bindMove: function() {
				// debugger;
				var _t = this;
				var parW = _t.tdFrame.width();
				var le = _t.tdLeft;
				var li = _t.tdLine;
				var ri = _t.tdRight;
				li.mousedown(function(event) {
					_t.mouseDown = true;
					_t.zuoBiao[0] = event.clientX;
					_t.addShade();
				});
				$(document).mouseup(function(event) {
					_t.mouseDown = false;
					$('#td_frame_bg').remove();
				});
			},
			addShade: function() {
				var _t = this;
				var parW = _t.tdFrame.width();
				var le = _t.tdLeft;
				var li = _t.tdLine;
				var ri = _t.tdRight;
				$('body').append('<div id="td_frame_bg" class="td_frame_bg"></div>')
				var bg = $('#td_frame_bg');
				bg.css({
					'height': $(document).height() + 'px',
					'width': $(document).width() + 'px'
				});
				bg.mousemove(function(event) {
					_t.callback && _t.callback(event);
					var _x = event.clientX - _t.zuoBiao[0];
					_t.zuoBiao[0] = event.clientX;
					if (_t.mouseDown && !_t.moveIng) {
						_t.moveIng = true;
						var lw = _x + le.width();
						var rw = ri.width() - _x;
						if (lw <= 0 || rw <= 0) {
							return;
						}

						var lwidth = _x + le.width();
						le.width(lw);
						li.css('left', lw + 'px');
						ri.width(rw);
						// console.log(_t.zuoBiao);
						// console.log(_x);
						_t.moveIng = false;
					}
				});
			}

		};
		a.lr_tuodong = function(id, callback) {
			return new c(id, callback);
		};
	}(window);

	/**
	 * 上下拖动类
	 */
	! function(a, b) {
		"use strict";
		var c = function(id, callback) {
			this.tdFrame = null;
			this.tdUp = null;
			this.tdDown = null;
			this.tdLine = null;
			this.mouseDown = false;
			this.zuoBiao = [0, 0];
			this.callback = callback;
			this.moveIng = false;
			this.init(id);
		};
		c.prototype = {
			init: function(id) {
				var _t = this;
				var _tf = _t.tdFrame = $(id);
				_t.tdUp = _tf.children('.td-up');
				_t.tdDown = _tf.children('.td-down');
				_t.tdLine = _tf.children('.td-ud-line');
				_t.initFrameSize();
				_t.bindMove();
				return _t;
			},
			initFrameSize: function() {
				var _t = this;
				var parH = _t.tdFrame.height();
				_t.tdUp.height(parH / 2);
				_t.tdDown.height(parH / 2 - _t.tdLine.height());
				_t.tdLine.css({
					'top': parH / 2 + 'px',
					'width': _t.tdFrame.width() + 'px'
				});
			},
			/**
			 * 绑定推动事件
			 */
			bindMove: function() {
				// debugger;
				var _t = this;
				var parH = _t.tdFrame.height();
				var le = _t.tdUp;
				var li = _t.tdLine;
				var ri = _t.tdDown;
				li.mousedown(function(event) {
					_t.mouseDown = true;
					_t.zuoBiao[1] = event.clientY;
					_t.addShade();
				});
				$(document).mouseup(function(event) {
					_t.mouseDown = false;
					$('#td_frame_bg').remove();
				});
			},
			addShade: function() {
				var _t = this;
				var parH = _t.tdFrame.height();
				var le = _t.tdUp;
				var li = _t.tdLine;
				var ri = _t.tdDown;
				$('body').append('<div id="td_frame_bg" class="td_frame_bg"></div>')
				var bg = $('#td_frame_bg');
				bg.css({
					'height': $(document).height() + 'px',
					'width': $(document).width() + 'px'
				});

				bg.mousemove(function(event) {
					_t.callback && _t.callback(event);
					var _y = event.clientY - _t.zuoBiao[1];
					_t.zuoBiao[1] = event.clientY;
					if (_t.mouseDown && !_t.moveIng) {
						_t.moveIng = true;
						var uh = le.height() + _y;
						var dh = ri.height() - _y;
						// console.log(dh);
						if (uh <= 0 || dh <= 0) {
							return;
						}
						le.height(uh);
						ri.height(dh);
						li.css('top', uh + 'px');
						_t.moveIng = false;
					}
				});
			}

		};
		a.ud_tuodong = function(id, callback) {
			return new c(id, callback);
		};
	}(window);

});