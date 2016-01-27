$(function() {
	//替换原有的radio
	(function($) {
		//保存所有的radio对象
		var allradio = {};
		var f = function(o) {
			if (!o) {
				return false;
			}
			this.s_src = o;
			this.s_dest = null;
			this.s_group = null;
			//事件
			this.change = function() {};
			this.init();
		};
		f.prototype = {
			s_html: '<s  class="kl-radio"></s>',
			init: function() {
				var _t = this;
				var _s_src = this.s_src;
				if (!_s_src.prev().hasClass('kl-radio')) {
					_s_src.before(_t.s_html);
				}
				this.s_dest = _s_src.prev();
				_s_src.hide();
				var _name = this.s_src.attr('name');
				this.group = $('input[name="' + _name + '"][type="radio"]');
				this.tongbu();
			},
			//绑定事件
			bind: function(event, callback) {
				this[event] = callback;
			},
			tongbu: function() {
				var _t = this;
				_t.s_dest.attr('value', _t.s_src.val());
				if (_t.s_src.is(':checked')) {
					_t.s_dest.addClass('kl-selected');
				}
				_t.s_dest.click(function(event) {
					var _tt = $(this);
					_t.group.prev().removeClass('kl-selected');
					_t.group.attr('checked', false);
					_tt.addClass('kl-selected');
					_t.s_src.attr('checked', true);
					_t.s_src.click();
				});
				this.s_src.change(function(event) {
					_t.tongbu();
				});
			}
		};
		window.hideradio = {};
		/**通过id查找radio对象 id前缀为hideradio_加上原来radio的name属性**/
		hideradio.findById = function(radioid) {
			return allradio['hideradio__id__' + radioid];
		};
		hideradio.getAll = function() {
			return allradio;
		};
		hideradio.tongbuByName = function(radioname) {
			this.findByName(radioname).tongbu();
		};
		hideradio.tongbuById = function(radioid) {
			this.findById(radioid).tongbu();
		};
		/**传入一个jquery radio 对象初始并隐藏原来的radio**/
		hideradio.hide = function(oo) {
			var tem = [];
			var arg = arguments;
			oo.each(function(index, el) {
				var o = $(this);
				var b = new f(o);
				if (arg[1]) {
					if (/^\d+$/.test(arg[1])) {
						b.width = arg[1];
						b.s_dest.width(arg[1]);
					} else {
						b.s_dest.addClass(arg[1]);
					}
				}
				var na = 'id__' + b.s_src.attr('id');
				(na == 'id__undefined') && (na = 'name__' + b.s_src.attr('name'));
				(na == 'name__undefined') && (na = index);
				var id = 'hideradio__' + na+'__'+index;
				allradio[id] = b;
				b.s_dest.attr('id', id);
				b.id = id;
				tem.push(b);
			});

			return tem;
		};
		window.hideRadio = hideradio;
	})($);
});