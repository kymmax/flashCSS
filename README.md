# flashCSS
A quick way to customize css from html class name.

[DEMO](https://kymmax.github.io/flashCSS/src/demo.html)
```html
<div class="d-flex ps-fixed fw-bold fl-dot1em fz-16px fz-lg-20px p-1dot5rem"></div>
```

## Features
- Create CSS style from html class name.
- Fast to develop website.
- More freedom to use.
- Min JS size `~3 KB` only.
- Save more CSS file size.

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
<div class="d-flex alignItems-flexStart"></div>
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
```html
<div class="fz-16px fz-lg-20px my-1rem my-lg-1dot5rem"></div>
```

- ### `important: Boolean` ###
	Add `!important` on all style.

- ### `Style ( class name : style name )` ###
	Use html snipset to generate CSS style.
	Currently only supports para on below:
```javascript
{
	// Display
	"d": ["display"],
	"flexDir": ["flex-direction"],
	"justifyContent": ["justify-content"],
	"alignItems": ["align-items"],
	"alignSelf": ["align-self"],
	"flexWrap": ["flex-wrap"],
	"order": ["order"],
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
	// Color (can't use rgba case)
	"color": ["color"],
	"bg": ["background"],
	"bgc": ["background-color"],
	// Others
	"trans": ["transition"],
	"o": ["opacity"],
	"z": ["z-index"],
};
```

- ### `Symbols` ###
	Use some snipset to correspond to the symbol, because some symbols can't be class name.
```javascript
{
	"dot" : ".", // dot
	"neg" : "-", // negative
	"per" : "%", // percent
	"hash": "#", // color hash code
	"_"   : " ", // space
	"plus": ",", // comma
	"rgba": "rgba(", // rgba
	"br": ")", // bracket right for rgba
}
```
```html
## Dot
    // width: 50.5px;
    <div class="w-50dot5px"></div>

    // letter-spacing: 0.15em;
    <div class="fl-dot15em"></div>

## Negative
    // margin-top: -1rem;
    <div class="mt-neg1rem"></div>

## Percent
    // width: 50%;
    <div class="w-50per"></div>

## Color Hash Code
    // background-color: #fff000;
    <div class="bgc-hashfff000"></div>

## Space
    // text-shadow: 0 0 red;
    <div class="sdt-0_0_red"></div>

    // padding: 16px 20px 10px 5px;
    <div class="p-16px_20px_10px_5px"></div>

    // margin: 1rem 2rem;
    <div class="m-1rem_2rem"></div>

## Comma
    // text-shadow: 0 0 red, 0 0 blue;
    <div class="sdt-0_0_red_plus_0_0_blue"></div>
    <div class="sdt-0_0_redplus_0_0_blue"></div>
    <div class="sdt-0_0_red_plus0_0_blue"></div>
    <div class="sdt-0_0_redplus0_0_blue"></div>

## RGBA
	// background-color: rgba(0,0,0,1);
	<!-- rgba
		 hash000000: "#" + 000000 (6 characters)
		 plus: "," 
		 1: alpha value
		 br: ")"
	-->
	<div class="bgc-rgbahash000000plus1br"></div>

```

- ### `init()` ###
You can use `init()` to re-check whole html class name to generate css style.

```javascript
var css = new flashCSS();
    css.init();
```










