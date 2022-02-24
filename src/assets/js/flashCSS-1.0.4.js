/*!
 * flashCSS 1.0.4
 * 2022-02-24
 * https://github.com/kymmax/flashCSS
 * 
 * @license Copyright 2022, flashCSS. All rights reserved.
 * @author: Jason Kuo, kymmax0420@gmail.com
 * 
 * Licensed MIT
 */

// ## Fix IE
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

function flashCSS( PARA ) {

	!PARA ? PARA = {} : PARA;

	var _self = this;
	var _media = PARA.media || {
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1280,
	};

	// Media Query for Size
	var _para_media = {
		xs: 0 + "px", // default
		sm: _media.sm + "px",
		md: _media.md + "px",
		lg: _media.lg + "px",
		xl: _media.xl + "px",
	};

	// Style Para
	var _para_spacing = {
		// Display
		"d": ["display"],
		"flexDir": ["flex-direction"],
		"justifyContent": ["justify-content"],
		"alignItems": ["align-items"],
		"alignSelf": ["align-self"],
		"justifyAlign": ["justify-content","align-items"], 
		"flexWrap": ["flex-wrap"],
		"order": ["order"],
		"flex": ["flex"], // NEW
		// Position
		"ps": ["position"],
		// Size
		"w" : ["width"],
		"h" : ["height"],
		"wh": ["width","height"],
		"maxw" : ["max-width"],
		"minw" : ["min-width"],
		"maxh" : ["max-height"],
		"minh" : ["min-height"],
		// Grid
		"colCount": ["column-count"], 
		"colGap": ["column-gap"], 
		"colSpan": ["column-span"], 
		// Padding
		"p" : ["padding"],
		"pr": ["padding-right"],
		"pl": ["padding-left"],
		"pt": ["padding-top"],
		"pb": ["padding-bottom"],
		"px": ["padding-left", "padding-right"],
		"py": ["padding-top", "padding-bottom"],
		// Margin
		"m" : ["margin"],
		"mr": ["margin-right"],
		"ml": ["margin-left"],
		"mt": ["margin-top"],
		"mb": ["margin-bottom"],
		"mx": ["margin-left", "margin-right"],
		"my": ["margin-top", "margin-bottom"],
		// Absolute
		"at": ["top"],
		"ab": ["bottom"],
		"al": ["left"],
		"ar": ["right"],
		// Font
		"fz": ["font-size"],
		"fl": ["letter-spacing"],
		"fh": ["line-height"],
		"fa": ["text-align"],
		"fw": ["font-weight"],
		// Border
		"br": ["border"],
		"bw": ["border-width"],
		"bc": ["border-color"],
		"bs": ["border-style"],
		"round": ["border-radius"],
		// Shadow
		"sdb": ["box-shadow"],
		"sdt": ["text-shadow"],
		// Color
		"color": ["color"],
		"bg"   : ["background"],
		"bgc"  : ["background-color"],
		// Others
		"trans": ["transition"],
		"o": ["opacity"],
		"ov": ["overflow"],
		"ws": ["white-space"],
		"pointer": ["pointer-events"],
		"z": ["z-index"],
		"objFit": ["object-fit"], // NEW
		"objPos": ["object-position"], // NEW
		"ani": ["animation"], // NEW
	};
	// Symbol Para
	var _para_symbol = {
		"dot" : ".", // dot
		"neg" : "-", // negative
		"per" : "%", // percent
		"hash": "#", // color hash code
		"_"   : " ", // space
		"plus": ",", // comma
		"rgba": "rgba(", // rgba
		"br": ")", // bracket right for rgba
	}
	// Initial
	this.init = function(){

		var _style_list = "";
		var _class_record = [];
		var _group_media = {
				xs: "",
				sm: "",
				md: "",
				lg: "",
				xl: "",
			}

		document.querySelectorAll("[class]").forEach(function (index) {

			var _class_string = index.getAttribute("class").split(" ");
	
			_class_string.forEach(function (i) {
	
				Object.keys(_para_spacing).forEach(function (spacing) {
	
					Object.keys(_para_media).forEach(function (media) {
	
						(media == "xs") ? media = "" : media;
						var _media_string = (media == "") ? media : media + "-"; // media string
						var _check_string = spacing + "-" + _media_string; // check string for indexOf
	
						var _value_class = i.split(_check_string)[1]; // for class name
						var _value = i.split(_check_string)[1]; // for value
						var _spacing_string = _para_spacing[spacing]; // css style name

						var _class_string_merge = _check_string + _value_class; // final class name
	
						var _class_record_skip = false; // for check class same or not
						_class_record.forEach(function (className) {
							if (_check_string + _value_class == className && !_class_record_skip) {
								_class_record_skip = true;
								return
							}
						})
	
						if (i.indexOf(_check_string) == 0 && !_value_class.includes("-") && !_class_record_skip) {
							
							// Check Camel-Case
							var _value_split = _value.split(/(?=[A-Z])/);
							_value_split.forEach(function(text,index){
								if(index > 0){
									_value += "-" + text.toLowerCase();
								}else{
									_value = text;
								}
							})

							// Symbol Replace ( dot / negative / percent / etc. )
							Object.keys(_para_symbol).forEach(function (symbol) {
								if (_value_class.includes(symbol)) {
									_value.split(symbol).forEach(function(string,index){
										if(index > 0){

											if(symbol == "rgba"){
												var _hash ="";
												if(string.includes("hash")){_hash = "hash"};
												if(string.includes("#")){_hash = "#"};
												
												if(_hash.length != 0){
													var _hex = string.substring(_hash.length,_hash.length+6)
													var _rgb = _self.hexToRgb("#" + _hex);
	
													string = string.replace("#" + _hex, _rgb.r + "," + _rgb.g + "," + _rgb.b )
												}
											}

											_value += _para_symbol[symbol] + string;

										}else{
											_value = string;
										}
									})
									// _value = _value.replaceAll(symbol, _para_symbol[symbol]);
								}
							})
	
							// Combine Style String
							var _string_group = "";
							_spacing_string.forEach(function (string) {
								var _string_temp = (string + ': ' + _value + ( (PARA.important) ? " !important" : "" ) + ';')
								_string_group += _string_temp
							})
	
							// With Media String
							if (media != "") {
								_group_media[media] += '.' + _class_string_merge + '{' + _string_group + '}';
							}
							// Without Media String
							else {
								_style_list += '.' + _class_string_merge + '{' + _string_group + '} ';
							}
	
							// Record Class Name
							_class_record.push(_class_string_merge);
	
							return
						}
					})
				})
			});
	
		})

		// Add & Order Media Style
		Object.keys(_group_media).forEach(function(media){
			_style_list += '@media (min-width:' + _para_media[media] + ') {' + _group_media[media] + '} ';
		})
	
		// Set Style Tag
		var _style_tag = document.querySelectorAll('style[data-css="js"]')[0];
		if (_style_tag != undefined) {
			_style_tag.remove();
		}
		var _head_tag = document.getElementsByTagName('head')[0];
	
		var _style = document.createElement('style');
		_style.type = 'text/css';
		_style.setAttribute("data-css", "js");
	
		_head_tag.appendChild(_style);
		_style.appendChild(document.createTextNode(_style_list));

		// On completed
		if (PARA && PARA.onCompleted) {
			PARA.onCompleted();
		}
	}

	// Detect Attr Class Change
	this.observer = function(){

		var _div = document.querySelectorAll("[class]");
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.attributeName === "class") {
					console.log("Class attribute changed");
					_self.init();
				}
			});
		});

		_div.forEach(function (i) {
			observer.observe(i, {
				attributes: true
			});
		})
	}

	if (PARA && PARA.observe) {
		this.observer();
	}

	// Hex to RGB
	this.hexToRgb = function( HEX ){
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( HEX );
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	this.init();
}