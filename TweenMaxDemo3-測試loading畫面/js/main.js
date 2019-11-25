

screenW = screen.width;
if( navigator.userAgent.search(/Android 2./) != -1) {
	screenW = screen.width/window.devicePixelRatio;
}

screenH = screen.height;
if( navigator.userAgent.search(/Android 2./) != -1) {
	screenH = screen.height/window.devicePixelRatio;
}

history.scrollRestoration = "manual";



//蛻晄悄險ｭ螳�/////////////////////////////////////////////////
ready_flag = "false";
load_flag = "false";
ready_load_flag = "false";
home_intro_flag = false;

//Retina蛻､螳�/////////////////////////////////////////////////
var retinaSwitch = window.devicePixelRatio;
if(retinaSwitch == 1) {
	retina_flag = "false";
}else if(retinaSwitch == undefined) {
	retina_flag = "false";
}else{
	retina_flag = "true";
}

//繧ｿ繝�メ繝代ロ繝ｫ蛻､螳�/////////////////////////////////////////////////
var chkTouch = ('ontouchstart' in window);
if(chkTouch){
	touch_flag = "true";
}else{
	touch_flag = "false";
}

var ua = navigator.userAgent;
var userAgent = window.navigator.userAgent.toLowerCase();
var appVersion = window.navigator.appVersion.toLowerCase();
ie_ver = 100;

isAndroid = (ua.match(/Android/i));
isiPhone = (ua.match(/iPhone/i));
isiPad = (ua.match(/iPad/i));
isFlashInstalled=function(){if(navigator.plugins["Shockwave Flash"]){return true;}try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash");return true;}catch(a){return false;}}();
if(isAndroid) { android_ver = parseFloat(userAgent.substr(userAgent.indexOf('android')+8, 3)) };

if(/iPhone/.test(ua)) {
	ua.match(/iPhone OS (\w+){1,3}/g);
	ios_ver=(RegExp.$1.replace(/_/g, '')+'00').slice(0,3);
} else if(/iPad/.test(ua)) {
	ua.match(/CPU OS (\w+){1,3}/g);
	ios_ver=(RegExp.$1.replace(/_/g, '')+'00').slice(0,3);
}

if(isiPhone || isiPad || isAndroid){
	pc_flag = "false";
}else if(Math.min(screenW, screenH) < 768 && touch_flag == "true"){
	pc_flag = "false";
}else{
	pc_flag = "true";
}

//繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ/////////////////////////////////////////////////
$(window).scroll(function(){
	if(ready_flag == "true") scroll_func_();
});
function scroll_func_(){
	scroll_y = (document.documentElement.scrollTop || document.body.scrollTop);
	scroll_x = (document.documentElement.scrollLeft || document.body.scrollLeft);
	scroll_func();
}

//繝ｪ繧ｵ繧､繧ｺ/////////////////////////////////////////////////
$(window).resize(function(){
	 if(ready_flag == "true") resize_func();
});
function resize_func(){
	resize_func2();
	resize_func2();
}
function resize_func2(){
	resize_common();
	resize_cont();
}
function resize_common(){
	if($(window).width() > 1024){
		resize_mode = "pc";
	}else{
		resize_mode = "sp";
	}
	
	winW = $(window).width();
	
	winH = $(window).height();
	if(pc_flag == "false" && resize_mode == "pc") winH = Math.ceil(winW/screenW*screenH);
}

///////////////////////////////////////////////////
var namespace = 'home';
var project_now = 0;

$(function() {
	ready_flag = "true";
	
	//繧ｹ繝ｯ繧､繝鈴幕蟋区凾縺ｮ讓ｪ譁ｹ蜷代�蠎ｧ讓吶ｒ譬ｼ邏�
	function onTouchStart(event) {
		resize_common();
	}
	
	//繧ｹ繝ｯ繧､繝励�譁ｹ蜷托ｼ�left�俊ight�峨ｒ蜿門ｾ�
	function onTouchMove(event) {
		resize_common();
	}
	
	function onTouchEnd(event) {
		resize_common();
	}


	
	if(load_flag == "true") ready_load_func_();

	

	// 蜷御ｸURL繧ｯ繝ｪ繝�け縺ｧ縺ｮ繝上�繝峨Ο繝ｼ繝峨ｒ蝗樣∩
	$('a[href]').on('click', function (e) {
		if (e.currentTarget.href === window.location.href) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
});

$(window).load(function(){
	load_flag = "true";
	load_func();
	if(ready_flag == "true") ready_load_func_();
});

function ready_load_func_(){
	ready_load_flag = "true";
	ready_load_func();
}


///////////////////////////////////////////////////

minW = "null";
minH = "null";

trs_w = 1440;
trs_h = 1400;

hd_flag = "no";

project_ttl_navi = 0;

function resize_cont(){
	//蜈ｱ騾�
	if(resize_mode == "pc"){
		scl = winW/1440;
		mg = Math.round(50*scl);
	}else{
		scl = winW/750;
		mg = Math.round(40*scl);
	}
	

	
	if(resize_mode == "pc"){
		project_ttl_navi = 50;
	}else{
		project_ttl_navi = 24;
	}
	
	if(resize_mode == "pc"){
		$("#itr").css({"height":winH});
	}else{
		$("#itr").css({"height":"100vh"});
	}
	
	//繝医Λ繝ｳ繧ｸ繧ｷ繝ｧ繝ｳ
	if(winW/winH > trs_w/trs_h){
		trs_w_re = winW;
		trs_h_re = trs_w_re/trs_w*trs_h;
	}else{
		trs_h_re = winH;
		trs_w_re = trs_h_re/trs_h*trs_w;
	}
	$("#trs").css({"width":trs_w_re, "height":trs_h_re, "left":Math.round((winW-trs_w_re)/2), "top":Math.round((winH-trs_h_re)/2)});
	
	
}



function load_func(){
}

function ready_load_func(){
	resize_func();
	
}

if("onhashchange" in window) {
}
window.onhashchange = locationHashChanged;

function locationHashChanged(){
	
}

// 判別是否第一次讀取網站
var loading = true;
var loadingPage = function(){
	TweenMax.to("#itr", 0.5, {opacity:0,zIndex:0,display:'none'});
	TweenMax.from("#trs", 0.5, {zIndex:1000,delay: .8})
	TweenMax.from("#trs1", 0.5, {top:0,delay: .9})
	TweenMax.from("#trs2", 0.5, {top:0,delay: .9})
	TweenMax.from("#trs3", 0.5, {top:0,delay:.8})
	loading = false ;
	return loadingPage;
}

window.onload = function(){
	// 第一次讀取
	if(loading == true){
		console.log(loading);
		loadingPage();
	}
	var FadeTransition = Barba.BaseTransition.extend({
	start: function() {
		/**
		 * This function is automatically called as soon the Transition starts
		 * this.newContainerLoading is a Promise for the loading of the new container
		 * (Barba.js also comes with an handy Promise polyfill!)
		 */

		// As soon the loading is finished and the old page is faded out, let's fade the new page
		Promise
		.all([this.newContainerLoading, this.fadeOut()])
		.then(this.fadeIn.bind(this));
	},

	fadeOut: function() {
		/**
		 * this.oldContainer is the HTMLElement of the old Container
		 */
		$(window).scrollTop(0);
		return $(this.oldContainer).animate({ opacity: 0 }).promise();
	},

	fadeIn: function() {
		/**
		 * this.newContainer is the HTMLElement of the new Container
		 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
		 * Please note, newContainer is available just after newContainerLoading is resolved!
		 */
		
		var _this = this;
		var $el = $(this.newContainer);
		
		$(this.oldContainer).hide();

		$el.css({
		visibility : 'visible',
		opacity : 0
		});

		$el.animate({ opacity: 1 }, 400, function() {
		/**
		 * Do not forget to call .done() as soon your transition is finished!
		 * .done() will automatically remove from the DOM the old Container
		 */

		_this.done();
		});
	}
	});

	/**
	 * Next step, you have to tell Barba to use the new Transition
	 */

	Barba.Pjax.getTransition = function() {
	/**
	 * Here you can use your own logic!
	 * For example you can use different Transition based on the current page or link...
	 */
	var trs3 = document.getElementById("trs3");
	TweenMax.to("#trs", 0.5, {zIndex:1000,repeat:1,yoyo:true,repeatDelay: 0.8})
	TweenMax.to("#trs1", 0.5, {top:0,repeat:1,yoyo:true,repeatDelay: 0.8})
	TweenMax.to("#trs2", 0.5, {top:0,repeat:1,yoyo:true,repeatDelay: 0.8})
	TweenMax.to("#trs3", 0.5, {top:0,delay:0.2,repeat:1,yoyo:true,repeatDelay: 0.5})
	console.log(loading);
	
	// TweenMax.to(".screen-wipe-top", 0.5, {y:"50%", repeat:1,yoyo:true})
	// TweenMax.to(".screen-wipe-bottom", 0.5, {y:"-50%", repeat:1,yoyo:true})


	return FadeTransition;
	};

}
Barba.Pjax.start();