# flashCSS
A quick way to customize css from html class name.


## Features
- Fast to develop website.
- More freedom to use.
- Compress JS size ~2kb only.

## How to Use?
1. Add js on your html.
```html
<script src="assets/js/flashCSS-1.0.0.min.js"></script>
```

2. Execute function when document ready.
```javascript
window.addEventListener("DOMContentLoaded", function () {
    var css = new flashCSS();
});
```

3. Start your project!
(width: 25%; height: 200px; margin-top: 1rem; background-color: black)
```html
<div class="w-25per h-200px mt-1rem bgc-black"></div>
```

## Parameters
```javascript
var css = new flashCSS({
    observe: false, // default
    media: {
        xs: 0,    // default
        sm: 576,  // default
        md: 768,  // default
        lg: 992,  // default
        xl: 1280, // default
    },
    important: false // default
});
```
- ### `observe: Boolean` ###
	If html class has changed which class will be update.

- ### `media: Object ( {xs: number, sm: number, md: number, lg: number, xl: number} )` ###
	Related to CSS @media (min-width: px), and value just like Bootstrap.

- ### `important: Boolean` ###
	Add `!important` on style.

- ### `Style ( class name : style name )` ###
	Use html snipset to generate CSS style.
	Currently only supports para on below:
```javascript
{
	// Size
	"w" : ["width"],
	"h" : ["height"],
	"wh": ["width","height"],
	"maxw": ["max-width"],
	"minw": ["min-width"],
	"maxh": ["max-height"],
	"minh": ["min-height"],
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
	// Border
	"border": ["border-width"],
	"round ": ["border-radius"],
	// Color
	"color": ["color"],
	"bgc"  : ["background-color"],
};
```

- ### `Symbols` ###
	Use some snipset to correspond to the symbol, because some symbols can't be class name.
```javascript
{
	"_"   : ".", // dot
	"neg" : "-", // negative
	"per" : "%", // percent
	"hash": "#", // color hash code
}
```
```html
// width: 50%;
<div class="w-50per"></div>

// width: 50.5px;
<div class="w-50_5px"></div>

// margin-top: -1rem;
<div class="mt-neg1rem"></div>

// background-color: #fff000;
<div class="bgc-hashfff000"></div>
```

- ### `init()` ###
You can use `init()` to re-check whole html class name to generate css style.

```javascript
var css = new flashCSS();
    css.init();
```




