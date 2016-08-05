$(function() {



	var isVisible = function(id) {
		var o = $(id);
		var of = o.offset();
		var w = $(window);
		return !(w.scrollTop() > (of.top + o.outerHeight()) || (w.scrollTop() + w.height()) < of.top);
	}


});

isVisible('#td-frame');