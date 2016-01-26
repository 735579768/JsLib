$(function() {
//替换原有的select
	(function($) {
		//保存所有的select对象
		var allselect={};
		var f = function(o) {
			if (!o) {
				return false;
			}
			this.s_src = o;
			this.s_dest = null;
			this.op_block = null;
			this.op_value = '';
			//事件
			this.change=function(){};
			this.init();
		};
		f.prototype = {
			s_html: '<div  class="kl-sel">' +
				'<div class="kl-showtext"><span class="selvalue"></span><s class="selico"></s></div>' +
				' <div class="kl-sel-op-block">' +
				' </div>' +
				'</div>',
			init: function() {
				var _t = this;
				var _s_src = this.s_src;
				_s_src.hide();
				_s_src.before(_t.s_html);
				this.s_dest = _s_src.prev();
				this.op_block = this.s_dest.find('.kl-sel-op-block');
				this.op_value = this.s_dest.find('.selvalue');
				this.tongbu();
			},
			//绑定事件
			bind:function(event,callback){
				this[event]=callback;
			},
			tongbu: function() {
				var _t = this;
				var tem = this.op_block;
				tem.html('');
				this.op_value.html(this.s_src.find('option:selected').text());
				this.s_src.find('option').each(function(index, el) {
					var oo = $(this);
					tem.append('<div class="kl-sel-op" title="'+oo.text()+'" value="' + oo.val() + '">' + oo.text() + '</div>');
				});
				this.op_value.next().click(function(event) {
					_t.op_block.show();
				});
				this.op_value.click(function(event) {
					_t.op_block.show();
				});

				this.op_block.find('.kl-sel-op').click(function(event) {
					var t = $(this);
					_t.op_value.html(t.text());
					_t.op_block.hide();
					_t.s_src.val(t.attr('value'));
					(typeof(_t.change)=='function')&&_t.change();
				});

				$(document).bind("click", function(e) {
					if ($(e.target).closest(".kl-sel-op-block").length == 0 && $(e.target).closest(".kl-sel").length == 0) {
						_t.op_block.hide();
					}
				})
			}
		};
		window.hideSelect={};
		/**通过id查找select对象 id前缀为hideselect_加上原来select的name属性**/
		hideSelect.find=function(id){
			return allselect[id];
		};
		/**传入一个jquery select 对象初始并隐藏原来的select**/
		hideSelect.hide = function(o) {
			var b=new f(o);
			var id='hideselect_'+b.s_src.attr('name');
			allselect[id]=b;
			b.s_dest.attr('id',id);
			b.id=id;
			return b;
		};
		window.hideSelect=hideSelect;
	})($);
});