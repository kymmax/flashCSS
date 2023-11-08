/*!
 * flashCSS 2.0.0
 * 2023-11-08
 * https://github.com/kymmax/flashCSS
 * 
 * @license Copyright 2023, flashCSS. All rights reserved.
 * @author: Jason Kuo, kymmax0420@gmail.com
 * 
 * Licensed MIT
 */

function flashCSS( PARA = {} ) {

	const _self = this;
	const _data_name = "css";
	const _data_value = "flashCSS";

	// Media Query for Size
	let _para_media = {
		xs: 0, // default
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1280,
		landscape: 'landscape',
		portrait: 'portrait',
		...PARA.setMedia // new for custom media
	};
	const _para_media_string = Object.keys(_para_media).join('|');
	const _para_media_reg = new RegExp(`^(${_para_media_string})$`, "g");
	

	// Style Para
	let _para_spacing = {
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
		"g": ["gap"],
		"placeContent": ["place-content"],
		"placeItems": ["place-items"],
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
		"float": ["float"],
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
		"select": ["user-select"],
		"va": ["vertical-align"],
		"wm": ["writing-mode"],
		"content": ["content"],
		...PARA.setStyle
	};

	if(Array.isArray(PARA.deleteStyle)){
		PARA.deleteStyle.forEach((style) => {
			delete _para_spacing[style];
		})
	}

	const _para_spacing_string = Object.keys(_para_spacing).join("|");
	const _para_spacing_reg = new RegExp("^(" + _para_spacing_string + ")$", "g");
	

	// Symbol Para
	let _para_symbol = {
		":": ":", // colon for pseudo type
		"~": "~", // tilde 
		".": ".", // dot
		"neg": "-", // negative
		"@": "@", // at
		"#": "#", // color hash code
		"$": "$", // money
		"%": "%", // percent
		"^": "^", // caret
		"&": "&", // and
		"*": "*", // star
		"`": "`", // backquote
		"_": " ", // space
		",": ",", // comma
		"(": "(", // bracket - L
		")": ")", // bracket - R
		"{": "{", //  - L
		"}": "}", //  - R
		">": ">", //
		"<": "<", //
		"`": "`", //
		";": ";", //
		"'": "'", //
		"|": "|", //
		"/": "/", // slash
		"?": "?", // search
		"!": " !important", // exclamation for important
		...PARA.setSymbol // new for custom symbol
	}
	const _para_symbol_string = Object.keys(_para_symbol)
		.map((symbol) => symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		.join("|");
  	const _para_symbol_reg = new RegExp("(" + _para_symbol_string + ")", "g");


	// Variable Para
	let _para_variable = {
		...PARA.setVariable
	}
	const _para_variable_string = Object.keys(_para_variable)
		.map((symbol) => `\\$${symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)
		.join('|');
	const _para_variable_reg = new RegExp(`(${_para_variable_string})`, "g");	


	// Pseudo Para
	const _para_pseudo_double_reg = /(before|after|selection|first-letter|first-line)/;
	const _para_pseudo_single_reg = /(nth-child\(\d+\)|nth-last-child\(\d+\)|first-child|last-child|hover|active|focus|checked|enabled|disabled|not|has|is|where)/;


	// Style Para
	const _class_link = (PARA.link) ? PARA.link : "-";  // (d-block, d-xl-block) (d-:block, d:xl:block)
	let _style_list = "";
	const _class_record = [];
	const _group_media = {};
	Object.keys(_para_media).forEach(function(item){
		_group_media[item] = "";
	})
	
	
	// Init
	this.init = function( DOM , isUpdate ){

		let _class_string = DOM.getAttribute("class");
		if(_class_string == null) return;
			_class_string = _class_string.split(" ");

		_class_string.forEach(function (i) { // get each class name

			let _origin = i.replace(/\n/g, ""); // delete \n 
			
			if(_origin === '') return;			
			
			let _index = [_origin];
			
			// # for Class Head
			let _class_head_match = false;

			// # check with { } or not
			let _bracket_before = '';
			let _bracket_after = '';
			let _bracket_match = _index[0].match(/\{([^}]+)\}/);
			let _bracket_media = '';

			if(_bracket_match){
				let _inside_brackets = _bracket_match[1]; // get inner string
				_index = _inside_brackets.split(";");

				// # get bracket before & after
				let _before_after_match = _origin.match(/^(.*?){[^}]+}(.*)$/m);
				
				if (_before_after_match){
					_bracket_before = _before_after_match[1];
					_bracket_after = _before_after_match[2];					
				}

				// # if bracket after with media
				if(_bracket_after[0] === _class_link){
					_bracket_media = _bracket_after.split(_class_link)[1];
					_bracket_after = _bracket_after.split(_class_link)[2] || '';
				}
				
			}
			
	
			// # check para spacing & match or not
			let _class_head = [];
			let _style_item_name = [];
			let _headMatch = [];

			// # for Class Media
			let _class_media_match = [];	
			let _class_second = [];
			let _class_media = [];

			// # for Class & Style Value
			let _class_item_value = [];
			let _style_item_value = [];


			_index.forEach(function(_i, _number){

				/////////////////////////////////////////////////////
				// check para spacing & match or not

				_headMatch[_number] = false;

				let _classHead = _i.split(_class_link)[0];
				let _styleItemName = _classHead.replace(_para_spacing_reg,function(match, offset, string){
					_headMatch[_number] = true;
					return _para_spacing[match];
				}); 
				
				if(_headMatch.includes(false)) return;

				_class_head.push(_classHead);
				_style_item_name.push(_styleItemName);

				/////////////////////////////////////////////////////
				// Class Media

				_class_media_match[_number] = false;

				let _classSecond = _i.split(_class_link)[1];

				if(!_classSecond) return;
				let _classMedia = _classSecond.replace(_para_media_reg,function(match, offset, string){
					_class_media_match[_number] = true;
					return match;
				}); 
				
				_class_second.push(_classSecond);
				// _class_media.push(_classMedia);

				/////////////////////////////////////////////////////
				// Class & Style Value

				// # 包含 media str
				if(_class_media_match[_number]){
					_class_media.push(_classMedia);
					_class_item_value.push(_i.split(_class_head[_number]+_class_link +_class_media[_number]+_class_link)[1]);
				}
				// # not include  str
				else{

					_class_media.push((_para_media_reg.test(_bracket_media)) ? _bracket_media : 'origin');

					_class_item_value.push(_i.split(_class_head[_number]+_class_link)[1]);
				}

				_style_item_value = [..._class_item_value];				

			})
		
			if(_headMatch.includes(false)) return;

			/////////////////////////////////////////////////////

			// # for Class Value Name
			_class_item_value = classValueName(_class_item_value);

			function classValueName(_INDEX){

				_INDEX.forEach(function(_i, _number){
					_INDEX[_number] = _i.replace(_para_symbol_reg,function(match, offset, string){
						return (offset > 0 ? '' : '\\') + match;
					}); 
				})
				return _INDEX;
			}


			// # for Style Value Replace
			let _pseudo = [];
			let _pseudo_type = [];
			_style_item_value = styleValueReplace(_style_item_value);

			function styleValueReplace(_INDEX){

				_INDEX.forEach(function(_i, _number){

					let _this = _INDEX[_number];

					// # replace symbol
					_this = _i.replace(_para_symbol_reg, function($0, $1) {
						return _para_symbol[$1];
					});
					

					// # for RGBA
					if(_i.includes("rgba") && _i.includes("#")){
						let _hex = _this.split("#")[1].substring(0,6);
						let _rgb = _self.hexToRgb("#" + _hex);
						_this = _this.replace("#" + _hex, _rgb.r + "," + _rgb.g + "," + _rgb.b )
					}


					// # for Variable Replace
					if(PARA.setVariable){
						_this = _this.replace(_para_variable_reg, function($0, $1) {				
							return _para_variable[$1.split('$')[1]];
						});
					}
					

					// # for pseudo type
					if (/:{2}/.test(_i)) { // Double :
						_pseudo.push(true);
						
						let _pseudo_item = _this.split(_para_pseudo_double_reg);
						let _type = _pseudo_item[0] + _pseudo_item[1];
						_pseudo_type.push(_type);

						_this = _this.split(_type + _class_link)[1];

					} else if (/:/.test(_i)) { // Single :
						_pseudo.push(true);

						let _pseudo_item = _this.split(_para_pseudo_single_reg);
						let _type = _pseudo_item[0] + _pseudo_item[1];
						_pseudo_type.push(_type);

						_this = _this.split(_type + _class_link)[1];
					} else { // Without :
						_pseudo.push(false);
						_pseudo_type.push("");
					}


					// # for custom function for value
					if (PARA.setCustomVal) {
						_this = PARA.setCustomVal(_this);
					}
					

					return _INDEX[_number] = _this;
				})
				return _INDEX;
			}

			/////////////////////////////////////////////////////

			// # Merge Class
			let _class_string_merge = _origin.replace(_para_symbol_reg,function(match, offset, string){
				return (offset > 0 ? '' : '\\') + match;
			}); // final class name

			
			// Record Class Name
			if(_class_record.includes(_class_string_merge)) return;
			_class_record.push(_class_string_merge);


			// Combine Style Value String
			let _string_group = {};

			combineStyleValue(_style_item_name)
			function combineStyleValue(_INDEX){

				_INDEX.forEach(function(_i, _number){

					(_string_group[_class_media[_number]]) || (_string_group[_class_media[_number]] = '');

					let _key = (_class_media[_number]) ? (_class_media[_number]) : ("origin");

					// _string_group[_key] += (/before|after/).test(_pseudo_type[0]) ? ( "content: '';" ) : '';
					_string_group[_key] += _i + ": " + _style_item_value[_number];
					_string_group[_key] += ( (PARA.important) ? " !important;" : ";" );
					
				})

			}
			

			//  # Class + Value
			let _string_temp = {};
			Object.keys(_string_group).forEach(function(_i){

				_string_temp[_i] = '';
				_string_temp[_i] += '.' + _class_string_merge;		
				_string_temp[_i] += (_pseudo[0]) ? (_pseudo_type[0]) : '';
				_string_temp[_i] += (_bracket_before) ? (' ' + _bracket_before) : (_bracket_before);
				_string_temp[_i] += (_bracket_after);
				_string_temp[_i] += '{';

				// let regex = /(before|after)/;
				// _string_temp[_i] += (regex.test(_bracket_before) || regex.test(_bracket_after)) ? "content: '';" : '';
				_string_temp[_i] += _string_group[_i];
				_string_temp[_i] += '}';				
				
			})

			// # Update
			if(isUpdate) return _self.update(_class_media, _string_temp);
	

			styleList();
			function styleList(){

				Object.keys(_string_temp).forEach(function(_i, _number){
					
					// Without Media String
					if (_i === 'origin') {
						_style_list += _string_temp[_i];						
					}
					// With Media String
					else {
						_group_media[_i] += _string_temp[_i];
					}	
				})				

			}
				
		});
	}

	// Basic Function
	let _target_container = document.querySelector( PARA.target ? PARA.target : "body" );
	function elAll( EL ){
		let _container = _target_container;
		let _elements = _container.querySelectorAll( EL );
		let _array = Array.from(_elements);
		return _array;
	}
	// detect el class change
	let _observe_group = [];
	const excludedTags = /^(head|meta|link|title|option|script|noscript|style)$/i;
	function observeClassChanges(element) {

		if(element.flashID || excludedTags.test(element.tagName)) return;

		const id = new Date().getTime() + _observe_group.length; // add unique id
		const classObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				
				if (mutation.attributeName === 'class') {
					_self.template();
					_self.init(mutation.target, true);
				}

			});
		});
		// detect
		classObserver.observe(element, { attributes: true, attributeFilter: ['class'] });
		classObserver.id = id; // add unique id on observe
		element.flashID = id; // add unique id on dom
		
		_observe_group.push(classObserver);		
	}
	function observeDomRemove() {
		const childListObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
			  if (mutation.type === 'childList') {
				mutation.removedNodes.forEach(function(removedNode) {

					const idDelete = removedNode.flashID;
					const index = _observe_group.findIndex(item => item.id === idDelete*1);

					if(index !== -1){
						
						_observe_group[index]?.disconnect();
						_observe_group.splice(index, 1);

						removedNode.querySelectorAll("*").forEach((childNode) => {
							
							const idDelete = childNode.flashID;
							const index = _observe_group.findIndex(item => item.id === idDelete*1);
	
							_observe_group[index]?.disconnect();
							_observe_group.splice(index, 1);
						})
					}	
				});
			  }
			});
		});
		// detect
		childListObserver.observe(_target_container, { childList: true, subtree: true });
	}
	function observeDomAdd(){
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function (mutation){
				if (mutation.type === 'childList') {
					// check new element added?
					for (let addedNode of mutation.addedNodes) {
						if (addedNode.nodeType === Node.ELEMENT_NODE && !excludedTags.test(addedNode.tagName)) {
							_self.template();
							_self.init(addedNode, true);
							observeClassChanges(addedNode);	
							
							addedNode.querySelectorAll("*").forEach((childNode) => {

								if(!excludedTags.test(childNode.tagName)){
									_self.init(childNode, true);
									observeClassChanges(childNode);		
								}
							})
						}
					}
				}
			});
		});
		// detect start
		observer.observe(_target_container, { childList: true, subtree: true});
	}


	// Set Media Query
	this.addMedia = function(){

		// Add & Order Media Style
		Object.keys(_group_media).forEach(function(media){			

			switch (true) {
				case (media === 'landscape' || media === 'portrait'):
					_style_list += '@media (orientation:' + _para_media[media] + ') {' + _group_media[media] + '} ';
					break;
				default:
					_style_list += '@media (min-width:' + _para_media[media] + 'px) {' + _group_media[media] + '} ';
					break;
			}
		})
	}

	// Set Update
	this.update = function( MEDIA , CLASS_NAME ){
		
		const _style_tag = document.querySelectorAll(`style[data-${_data_name}=${_data_value}]`)[0];

		Object.keys(CLASS_NAME).forEach(function(_media){
			
			let _style_content = _style_tag.textContent.split( _para_media[_media] + "px) {");		

			if(_media !== 'origin'){ _style_tag.textContent =  _style_content[0] + _para_media[_media] + "px) {" + CLASS_NAME[_media] + _style_content[1];}
			else{ _style_tag.textContent = [ CLASS_NAME[_media], _style_tag.textContent ].join(" ");}
			
		})

		// On completed
		if (PARA.onCompleted) PARA.onCompleted();
	}

	// Set Style Tag
	this.addTag = function(){

		// check multiple ?
		if(document.querySelector(`[data-${_data_name}=${_data_value}]`)) return;
	
		const _style = document.createElement('style');
			_style.type = 'text/css';
			_style.setAttribute(`data-${_data_name}`, _data_value);
			_style.appendChild(document.createTextNode(_style_list));
		
		const _head_tag = document.getElementsByTagName( ( PARA.style ? PARA.style : 'head' ) )[0];
			_head_tag.appendChild(_style);

		// On completed
		if (PARA.onCompleted) PARA.onCompleted();
	}

	// Detect Attr Class Change
	this.observer = function(){

		if(PARA.observeDOM) return;
		// detect start
		elAll("*").forEach(function (i) {			
			observeClassChanges(i);
		})
		observeDomRemove();
	}

	// Detect DOM Added
	this.observerDOM = function(){
		
		// detect start
		observeDomAdd();
		elAll("*").forEach(function (i) {			
			observeClassChanges(i);
		})
		observeDomRemove();
	}

	// Hex to RGB
	this.hexToRgb = function( HEX ){
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( HEX );
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	// Copy from '@' to '='
	this.copy = function( DOM ){
		let _class_all_name = DOM.getAttribute("class");
		if(_class_all_name === null) return;
		
		let _class_all_group = _class_all_name.split(" ");
			_class_all_group.forEach(function(name){
				if(name.match(/^@/g)){
					let _copy_name = name.split("@")[1]; // ＠ after name
					let _copy_str = _class_all_name.replace(name, "");
					DOM.setAttribute("class", _copy_str); // remove @ str
					
					let _copyitem = elAll('.\\=' + _copy_name);
						_copyitem.forEach(function(i_copy){
							let _target_name = i_copy.getAttribute("class");
							let _target_str = _target_name.replace("="+_copy_name, _copy_str);

							i_copy.setAttribute("class", _target_str); // remove ~ str
						})
				}
			})
	}

	// Copy Template
	this.template = function(){
		if(PARA.setTemplate){
			
			Object.keys(PARA.setTemplate).forEach(function(i){
				
				elAll('.\\=' + i).forEach(function (DOM) {
					
					let _target_class = DOM.getAttribute("class");
					if(_target_class === null) return;
					
					let _target_str = _target_class.replace("="+i, PARA.setTemplate[i]);
					DOM.setAttribute("class", _target_str); // remove ~ str
				})
			})
		}
	}

	// refresh
	this.refresh = function(){
		_self.template();
		elAll("[class]").forEach(function (DOM) {
			_self.copy(DOM);
			_self.init(DOM,true);
		})
	}

	// Initial
	_self.template();
	elAll("[class]").forEach(function (DOM) {
		_self.copy(DOM);
		_self.init(DOM);
	})

	this.addMedia();
	this.addTag();

	(PARA.observe === true) && this.observer();
	(PARA.observeDOM === true) && this.observerDOM();	
	(PARA.showPara === true) && console.table(_para_spacing);
	(PARA.showMedia === true) && console.table(_para_media);
	(PARA.showVariable === true) && console.table(_para_variable);
}
