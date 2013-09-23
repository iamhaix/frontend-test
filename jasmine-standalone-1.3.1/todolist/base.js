/*--------------------------------------
 *base：基本库，独立的功能，可复用
 *
 *author：zhang haixi
 *date: 2013-09-08
 *---------------------------------------*/




var base = {};

/*
 *模拟jsp中的include标签，在一个js文件中引入另一个js文件
 *如 include("script/b.js")
 */
base.include = function(path){ 
    var a=document.createElement("script");
    a.type = "text/javascript"; 
    a.src=path; 
    var head=document.getElementsByTagName("head")[0];
    head.appendChild(a);

	return head.innerHTML;
}

/*
 *设置cookie
 *
 */
base.setCookie = function(params){
	
	var s = "";
	if(params.name && params.value){
		s = params.name + "=" + encodeURIComponent(params.value);
	}else{
		return false;
	}
	
	var exp = new Date();
	if(params.day ){
		exp.setTime((exp.getTime()+(params.day)*24*60*60*1000));
		s += ";expires=" + exp.toGMTString(); 
	}

	s += (params.path ? (";path=" + params.path ): "");

	s += (params.domain ? (";domain=" + params.domain) : "");

	s +=(params.secure ? ";secure" : "");

	document.cookie = s;

//	console.log("s:"+s+"||||cookie:"+document.cookie);
	return true;
}

/*
 *获取cookie
 *
 */
base.getCookie = function (name) {

	var reg_s = "(?:;)?" + name + "=([^;]*);?"
	var reg = new  RegExp(reg_s);

	if (reg.test(document.cookie)) {

		return decodeURIComponent(RegExp["$1"]);
	}else {

		return null;
	}
}

/*
 *删除cookie
 *注意！此处比粗domain和path匹配的情况下，name为iname的cookie才可以被删除
 */
base.deleteCookie = function(iname,ipath,idomain){
	
	var val = base.getCookie(iname);
	if (val) {
		
		base.setCookie({name:iname, value:val, day:-1, path:ipath, domain:idomain});
	}else {

		return null;
	}

	//console.log("cookie="+base.getCookie(name));

	return true;
}

//删除cookie
//base.delCookie = function(name) {
//	var exp = - 1;
//
//	var cval = base.getCookie(name);
//
//	if (cval != null) base.setCookie({name:name, value:cval, day:exp});
//	console.log("uid===="+base.getCookie(name));
//	return true;
//}

