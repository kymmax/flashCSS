/*!
 * flashCSS 1.3.0
 * 2023-03-08
 * https://github.com/kymmax/flashCSS
 * 
 * @license Copyright 2023, flashCSS. All rights reserved.
 * @author: Jason Kuo, kymmax0420@gmail.com
 * 
 * Licensed MIT
 */

export default function flashCSS( PARA = {} ) {

	var _self = this;

	// Media Query for Size
	var _para_media = {
		xs: 0, // default
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1280,
		...PARA.setMedia // new for custom media
	};
	var _para_media_string = "";
	Object.keys(_para_media).forEach(function(media,index,string){
		_para_media_string += media + ((index==string.length-1) ? "" : "|");
	})
	var _para_media_reg = new RegExp("^("+ _para_media_string +")$", "g");
	

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
		"flex": ["flex"],
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
		"gTempCol": ["grid-template-columns"],
		"gAutoRow": ["grid-auto-rows"],
		"gColStart": ["grid-column-start"],
		"gColEnd": ["grid-column-end"],
		"gRowStart": ["grid-row-start"],
		"gRowEnd": ["grid-row-end"],
		"gColGap": ["grid-column-gap"],
		"gRowGap": ["grid-row-gap"],
		"colCount": ["column-count"],
		"colGap": ["column-gap"],
		"colSpan": ["column-span"],
		"rowGap": ["row-gap"],
		"g": ["gap"], // new
		"placeContent": ["place-content"], // new
		"placeItems": ["place-items"], // new
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
		"fd": ["text-decoration"],
		"fi": ["text-indent"],
		"ft": ["text-transform"],
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
		"filter": ["filter"],
		"blend": ["mix-blend-mode"],
		// Background
		"bg"   : ["background"],
		"bgc"  : ["background-color"],
		"bgi"  : ["background-image"],
		"bgs"  : ["background-size"],
		"bgp"  : ["background-position"],
		"bgr"  : ["background-repeat"],
		"bgo"  : ["background-origin"],
		// Transform
		"ts": ["transition"],
		"tf": ["transform"],
		"tfStyle": ["transform-style"],
		"tfOrigin": ["transform-origin"],
		// Others
		"float": ["float"], // new
		"tt": ["text-transform"],
		"o": ["opacity"],
		"ov": ["overflow"],
		"ws": ["white-space"],
		"z": ["z-index"],
		"objFit": ["object-fit"],
		"objPos": ["object-position"],
		"ani": ["animation"],
		"ratio": ["aspect-ratio"],
		"pointer": ["pointer-events"],
		"cursor": ["cursor"],
		"select": ["user-select"], // fix
		"va": ["vertical-align"],
		"wm": ["writing-mode"],
		...PARA.setStyle // new for custom style
	};
	var _para_spacing_string = "";
	Object.keys( _para_spacing).forEach(function(item,index,string){
		_para_spacing_string += item + ((index==string.length-1) ? "" : "|");
	})
	var _para_spacing_reg = new RegExp("^("+ _para_spacing_string +")$", "g");
	

	// Symbol Para
	var _para_symbol = {
		".": ".", // dot
		"neg": "-", // negative
		"%": "%", // percent
		"#": "#", // color hash code
		"_": " ", // space
		",": ",", // comma
		"(": "(", // bracket - L
		")": ")", // bracket - R
		"/": "/", // slash
		"!": " !important", // important
		...PARA.setSymbol // new for custom symbol
	}
	var _para_symbol_string = "";
	Object.keys(_para_symbol).forEach(function(symbol,index,string){
		if(symbol.match(/([(]|[)]|[.])/g)) symbol = "[" + symbol + "]";
		_para_symbol_string += symbol + ((index==string.length-1) ? "" : "|");
	})
	var _para_symbol_reg = new RegExp("("+ _para_symbol_string +")", "g");


	// Style Para
	var _class_link = (PARA.link) ? PARA.link : "-";  // (d-block, d-xl-block) (d-:block, d:xl:block)
	var _style_list = "";
	var _class_record = [];
	var _group_media = {};
	Object.keys(_para_media).forEach(function(item){
		_group_media[item] = "";
	})
	
	
	// Init
	this.init = function( DOM , isUpdate ){
		var _class_string = DOM.getAttribute("class").split(" ");
		_class_string.forEach(function (i) { // get each class name
			
			// # for Class Head
			var _class_head_match = false;
			var _class_head = i.split(_class_link)[0];
			var _style_item_name = _class_head.replace(_para_spacing_reg,function(match, offset, string){
					_class_head_match = true;
					return _para_spacing[match];
				});  
			
			if(!_class_head_match) return;

			/////////////////////////////////////////////////////

			// # for Class Media
			var _class_media_match = false;
			var _class_second = i.split(_class_link)[1];
			var _class_media = _class_second.replace(_para_media_reg,function(match, offset, string){
					_class_media_match = true;
					return match;
				}); 		

			// # for Class Value
			var _class_item_value;
			var _style_item_value;

			// # 包含 media str
			if(_class_media_match){
				_class_item_value = _style_item_value = i.split(_class_head+_class_link +_class_media+_class_link)[1];
			}
			// # not include  str
			else{
				_class_media = "";
				_class_item_value = _style_item_value = i.split(_class_head+_class_link)[1];
			}

			/////////////////////////////////////////////////////

			// # for Class Value Name
			_class_item_value = _class_item_value.replace(_para_symbol_reg,function(match, offset, string){
				return (offset > 0 ? '' : '\\') + match;
			});  

			// # for Style Value Replace
			_style_item_value = _style_item_value.replace(_para_symbol_reg, function($0, $1) {
				return _para_symbol[$1];
			});
			if(_style_item_value.includes("rgba") && _style_item_value.includes("#")){
				var _hex = _style_item_value.split("#")[1].substring(0,6);
				var _rgb = _self.hexToRgb("#" + _hex);
				_style_item_value = _style_item_value.replace("#" + _hex, _rgb.r + "," + _rgb.g + "," + _rgb.b )
				
			}

			// # for custom function for value
			if (PARA.setCustomVal) {
				_style_item_value = PARA.setCustomVal(_style_item_value);
			}

			/////////////////////////////////////////////////////

			// # Merge Class
			var _class_string_merge = _class_head + ("\\"+_class_link) + (_class_media_match ? _class_media+("\\"+_class_link) : "") + _class_item_value; // final class name

			// Record Class Name
			if(_class_record.includes(_class_string_merge)) return;
			_class_record.push(_class_string_merge);


			// Combine Style Value String
			var _string_group = "";
			_style_item_name.split(",").forEach(function(string){
				_string_group += string+": " + _style_item_value + ( (PARA.important) ? " !important;" : ";" )
			})

			//  # Class + Value
			var _string_temp = '.'+_class_string_merge +'{' + _string_group + '} ';

			// # Update
			if(isUpdate) return _self.update(_class_media, _string_temp);

			// With Media String
			if (_class_media_match) {
				_group_media[_class_media] += _string_temp;
			}
			// Without Media String
			else {
				_style_list += _string_temp;
			}		
				
		});
	}


	// Set Media Query
	this.addMedia = function(){
		// Add & Order Media Style
		Object.keys(_group_media).forEach(function(media){			
			_style_list += '@media (min-width:' + _para_media[media] + 'px) {' + _group_media[media] + '} ';
		})
	}


	// Set Update
	this.update = function( MEDIA , CLASS_NAME ){

		var _style_tag = document.querySelectorAll('style[data-css="flashCSS"]')[0];
		var _style_content = _style_tag.textContent.split( _para_media[MEDIA] + "px) {");

		if(MEDIA){ _style_tag.textContent =  _style_content[0] + _para_media[MEDIA] + "px) {" + CLASS_NAME + _style_content[1];}
		else{ _style_tag.textContent = [ CLASS_NAME, _style_tag.textContent ].join(" ");}
	}

	// Set Style Tag
	this.addTag = function(){
	
		var _style = document.createElement('style');
			_style.type = 'text/css';
			_style.setAttribute("data-css", "flashCSS");
			_style.appendChild(document.createTextNode(_style_list));
		
		var _head_tag = document.getElementsByTagName( ( PARA.style ? PARA.style : 'head' ) )[0];
			_head_tag.appendChild(_style);

		// On completed
		if (PARA.onCompleted) {
			PARA.onCompleted();
		}
	}


	// Detect Attr Class Change
	this.observer = function(){

		var _div = document.querySelectorAll("[class]");
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.attributeName === "class") {
					_self.init(mutation.target,true);
				}
			});
		});

		_div.forEach(function (i) {
			observer.observe(i, {
				attributes: true
			});
		})
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


	// Copy from '@' to '='
	this.copy = function( DOM ){
		var _class_all_name = DOM.getAttribute("class");
		var _class_all_group = _class_all_name.split(" ");
			_class_all_group.forEach(function(name){
				if(name.match(/^@/g)){
					var _copy_name = name.split("@")[1]; // ＠ after name
					var _copy_str = _class_all_name.replace(name, "");
					DOM.setAttribute("class", _copy_str); // remove @ str
					
					var _copyitem = document.querySelectorAll('.\\=' + _copy_name);
						_copyitem.forEach(function(i_copy){
							var _target_name = i_copy.getAttribute("class");
							var _target_str = _target_name.replace("="+_copy_name, _copy_str);

							i_copy.setAttribute("class", _target_str); // remove ~ str
						})
				}
			})
	}

	if (PARA.observe) {
		this.observer();
	}
	if (PARA.showPara) {
		console.table(_para_spacing);
	}
	if (PARA.showMedia) {
		console.table(_para_media);
	}


	// refresh
	this.refresh = function(){
		document.querySelectorAll("[class]").forEach(function (DOM) {
			_self.init(DOM,true);
		})
	}


	// Initial
	document.querySelectorAll("[class]").forEach(function (DOM) {
		_self.copy(DOM);
		_self.init(DOM);
	})

	this.addMedia();
	this.addTag();
}