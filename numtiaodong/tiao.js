(function() {
	var t = function(a, b, c) {
		this.startnum = a;
		this.endnum = b;
		this.elementid = c;
		this.timeid;
		arguments[3]?(this.totaltime=arguments[3]):this.totaltime = 2;;
		this.zijia = 10;
	}
	t.prototype = {
		run: function() {
			var _t = this;
			var obj = document.getElementById(this.elementid);
			this.zijia = parseInt((this.endnum - this.startnum) / (this.totaltime * 1000 / 10));
			if (obj) {
				this.timeid = setInterval(function() {
					if (_t.startnum >= _t.endnum) {
						_t.startnum = _t.endnum;
						clearInterval(_t.timeid);
					}
					obj.innerHTML = _t.startnum;
					_t.startnum += _t.zijia;
				}, 10);
			}
		}
	};
	window.tiao = function(startnum, endnum, elementid) {
		return new t(startnum, endnum, elementid);
	};

})();