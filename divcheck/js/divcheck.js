$(function() {
	//替换原有的checkbox
	(function($) {
		//保存所有的checkbox对象
		var allcheckbox = {};
		var f = function(o) {
			if (!o) {
				return false;
			}
			this.s_src = o;
			this.s_dest = null;
			//事件
			this.change = function() {};
			this.init();
		};
		f.prototype = {
			s_html: '<s  class="kl-checkbox"></s>',
			init: function() {
				var _t = this;
				var _s_src = this.s_src;
				if (!_s_src.prev().hasClass('kl-checkbox')) {
					_s_src.before(_t.s_html);
				}
				this.s_dest = _s_src.prev();
				_s_src.hide();
				this.tongbu();
			},
			//绑定事件
			bind: function(event, callback) {
				this[event] = callback;
			},
			tongbu: function() {
				var _t = this;
				_t.s_dest.attr('value', _t.s_src.val());
				_t.s_dest.click(function(event) {
					var _tt = $(this);
					if (_tt.hasClass('kl-selected')) {
						_tt.removeClass('kl-selected');
						_t.s_dest.attr('checked',false);
					} else {
						_tt.addClass('kl-selected');
						_t.s_dest.attr('checked',true);
					}
				});
				this.s_src.change(function(event) {
					_t.tongbu();
				});
			}
		};
		window.hidecheckbox = {};
		/**通过id查找checkbox对象 id前缀为hidecheckbox_加上原来checkbox的name属性**/
		hidecheckbox.findByName = function(checkboxname) {
			return allcheckbox['hidecheckbox__name__' + checkboxname];
		};
		hidecheckbox.findById = function(checkboxid) {
			return allcheckbox['hidecheckbox__id__' + checkboxid];
		};
		hidecheckbox.getAll = function() {
			return allcheckbox;
		};
		hidecheckbox.tongbuByName = function(checkboxname) {
			this.findByName(checkboxname).tongbu();
		};
		hidecheckbox.tongbuById = function(checkboxid) {
			this.findById(checkboxid).tongbu();
		};
		/**传入一个jquery checkbox 对象初始并隐藏原来的checkbox**/
		hidecheckbox.hide = function(oo) {
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
				var id = 'hidecheckbox__' + na;
				allcheckbox[id] = b;
				b.s_dest.attr('id', id);
				b.id = id;
				tem.push(b);
			});

			return tem;
		};
		window.hideCheckbox = hidecheckbox;
	})($);
});