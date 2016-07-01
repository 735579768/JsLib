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
			init: function(id) {
				this.tdFrame = $(id);
				this.tdLeft = this.tdFrame.children('.td-left');
				this.tdRight = this.tdFrame.children('.td-right');
				this.tdLine = this.tdFrame.children('.td-line');
				this.initFrameSize();
				this.bindMove();
				return this;
			},
			initFrameSize: function() {
				var parW = this.tdLeft.parent().width();
				this.tdLeft.width(parW / 2);
				this.tdRight.width(parW / 2 - this.tdLine.width());
				this.tdLine.css('left', parW / 2 + 'px');
				this.tdLine.height(this.tdLeft.parent().height());
			},
			/**
			 * 绑定推动事件
			 */
			bindMove: function() {
				// debugger;
				var _t = this;
				var parW = this.tdLeft.parent().width();
				var le = this.tdLeft;
				var li = this.tdLine;
				var ri = this.tdRight;
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
				var parW = this.tdLeft.parent().width();
				var le = this.tdLeft;
				var li = this.tdLine;
				var ri = this.tdRight;
				$('body').append('<div id="td_frame_bg" class="td_frame_bg"></div>')
				$('#td_frame_bg').height($(document).height());
				$('#td_frame_bg').width($(document).width());
				$('#td_frame_bg').mousemove(function(event) {
					_t.callback && _t.callback(event);
					var _x = event.clientX - _t.zuoBiao[0];
					_t.zuoBiao[0] = event.clientX;
					if (_t.mouseDown && !this.moveIng) {
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
	lr_tuodong('#td-frame', function(event) {
		//console.log(event);
	});
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
				this.tdFrame = $(id);
				this.tdUp = this.tdFrame.children('.td-up');
				this.tdDown = this.tdFrame.children('.td-down');
				this.tdLine = this.tdFrame.children('.td-ud-line');
				this.initFrameSize();
				this.bindMove();
				return this;
			},
			initFrameSize: function() {
				var parH = this.tdUp.parent().height();
				this.tdUp.height(parH / 2);
				this.tdDown.height(parH / 2 - this.tdLine.height());
				this.tdLine.css('top', parH / 2 + 'px');
				this.tdLine.width(this.tdUp.parent().width());
			},
			/**
			 * 绑定推动事件
			 */
			bindMove: function() {
				// debugger;
				var _t = this;
				var parH = this.tdUp.parent().height();
				var le = this.tdUp;
				var li = this.tdLine;
				var ri = this.tdDown;
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
				var parH = this.tdUp.parent().height();
				var le = this.tdUp;
				var li = this.tdLine;
				var ri = this.tdDown;
				$('body').append('<div id="td_frame_bg" class="td_frame_bg"></div>')
				$('#td_frame_bg').height($(document).height());
				$('#td_frame_bg').width($(document).width());
				$('#td_frame_bg').mousemove(function(event) {
					_t.callback && _t.callback(event);
					var _y = event.clientY - _t.zuoBiao[1];
					_t.zuoBiao[1] = event.clientY;
					if (_t.mouseDown && !this.moveIng) {
						_t.moveIng = true;
						var uh = le.height() + _y;
						var dh = ri.height() - _y;
						console.log(dh);
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
	ud_tuodong('#td-ud-frame', function(event) {
		//console.log(event);
	});
});