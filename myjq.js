$ = jquery;

function jQuery(sel) {
	return new jquery(sel);
}

jquery.ajax = function(conf) {
	if(conf.url == undefined) {
		return -1;
	}
	var xhr;
	conf.type = conf.type || 'GET';
	conf.async = conf.async || true;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	} else {
		return -1;
	}
	xhr.open(conf.type, conf.url, conf.async);
	if(conf.type.toLowerCase() == 'post' && conf.data) {
		xhr.setHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(conf.data);
	} else {
		xhr.send();
	}
	xhr.onreadystatechange = function() {
		if(xhr.status == 200 && xhr.readyState == 4) {
			if(conf.callback) {
				conf.callback(xhr.responseText, xhr);
			} else {
				console.log(xhr.responseText);
			}
		}
	}
}
jquery.alias = function(alias) {
	if(window.$) {
		console.log('detect conflict $,using alias ' + alias + ' now');
	}
	window[alias] = jQuery;
}

function jquery(sel) {
	var _jquery = {};
	_jquery.objs = [];
	if(typeof sel == 'string') {
		_jquery.objs = document.querySelectorAll(sel)
	} else if(typeof sel == 'object') {
		if(!sel.objs || sel.objs.constructor != Array) {
			_jquery.objs.push(sel);
		} else {
			_jquery.objs = sel.objs;
		}
	}
	_jquery.proto = {};
	_jquery.proto.html = function(str) {
		var len = _jquery.objs.length;
		for(var i = 0; i < len; i++) {
			_jquery.objs[i].innerHTML = str
		}
		return _jquery
	};
	_jquery.proto.each = function(func) {
		var len = _jquery.objs.length;
		for(var i = 0; i < len; i++) {
			func($(_jquery.objs[i]), i)
		}
		return _jquery
	};
	_jquery.proto.odd = function(func) {
		var len = _jquery.objs.length;
		if(len <= 0) return _jquery;
		for(var i = 0; i < len; i += 2) {
			func($(_jquery.objs[i]), i)
		}
		return _jquery
	};
	_jquery.proto.even = function(func) {
		var len = _jquery.objs.length;
		if(len <= 1) return _jquery;
		for(var i = 1; i < len; i += 2) {
			func($(_jquery.objs[i]), i)
		}
		return _jquery
	};
	_jquery.proto.css = function(cssConf) {
		if(!cssConf) return;
		var len = _jquery.objs.length;
		var cssStr = '';
		for(var k in cssConf) {
			cssStr += k + ':' + cssConf[k] + ';'
		}
		for(var i = 0; i < len; i++) {
			_jquery.objs[i].style.cssText += ';' + cssStr
		}
		return _jquery
	};
	_jquery.proto.eq = function(index) {
		return new jquery(_jquery.objs[index]);
	};
	for(var k in _jquery.proto) {
		_jquery[k] = _jquery.proto[k];
	}
	return _jquery
}
var a = $('.box');
a.html('fdsafdddfdsafdsafdsafdsaf').odd(function(e, i) {
	e = $(e);
	e.css({
		color: 'white',
		height: '500px'
	})
}).css({
	width: '180px',
	height: '80px',
	'margin-bottom': '20px'
});
/*console.log($.ajax({
	url: 'https://fiddle.jshell.net'
}))*/