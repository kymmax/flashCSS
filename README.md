# flashCSS
A quick way to customize css from html class name.

[DEMO](https://kymmax.github.io/flashCSS/src/demo.html) [TRY](https://kymmax.github.io/flashCSS/src/try.html)
```html
<div class="d-flex ps-fixed fw-bold fl-.1em fz-16px fz-lg-20px p-1.5rem"></div>
```

## Features
- Create CSS style from html class name.
- Fast to develop website.
- More freedom to use.
- Min JS size `~5 KB` only.
- Save more CSS file size.

## How to Use?
1. Add js on your html.
```html
<script src="assets/js/flashCSS-1.0.7.min.js"></script>
```
or import js module.
```html
<script type="module">
    import { flashCSS } from '/assets/js/flashCSS-1.0.7.module.min.js'
</script>
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
<div class="w-25% h-200px mt-1rem bgc-black"></div>
<div class="d-flex alignItems-flex-start"></div>
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
    important: false, // default
    style: 'head', // default
    link: '-', // default
    onCompleted: function(){
        // after style added
    }
});
```
- ### `observe: Boolean` ###
	If html class has changed which class will be update.
	(* It will affect the performance and it is recommended to set false on official site)

- ### `media: Object ( {xs: number, sm: number, md: number, lg: number, xl: number} )` ###
	Related to CSS @media (min-width: px), and value just like Bootstrap.
```html
<div class="fz-16px fz-lg-20px my-1rem my-lg-1.5rem"></div>
```

- ### `important: Boolean` ###
	Add `!important` on all style.

- ### `style: String (html tag)` ###
	Append the style on the tag location.
	You can change it for `body` or `html`.

- ### `link: String (class link)` ###
	You can change class name dash from `-` or `~ @ # $ ^ & * + = :` and other symbols.
```html
## -
<div class="d-block d-xl-none"></div>
## :
<div class="d:block d:xl:none"></div>
```

- ### `onCompleted: Callback()` ###
	Do something after style added.

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
    "justifyAlign": ["justify-content","align-items"],
    "alignSelf": ["align-self"],
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
    "gTempCol": ["grid-template-columns"], // new
    "gAutoRow": ["grid-auto-rows"], // new
    "gColStart": ["grid-column-start"], // new
    "gColEnd": ["grid-column-end"], // new
    "gRowStart": ["grid-row-start"], // new
    "gRowEnd": ["grid-row-end"], // new
    "gColGap": ["grid-column-gap"], // new
    "gRowGap": ["grid-row-gap"], // new
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
    // Background
    "bg"   : ["background"],  // fix
    "bgc"  : ["background-color"],  // fix
    // Others
    "ts": ["transition"],  // fix
    "tf": ["transform"],  // new
    "tfStyle": ["transform-style"],  // new
    "tfOrigin": ["transform-origin"],  // new
    "tt": ["text-transform"],  // new
    "o": ["opacity"],
    "ov": ["overflow"],
    "ws": ["white-space"],
    "pointer": ["pointer-events"],
    "z": ["z-index"],
    "objFit": ["object-fit"],
    "objPos": ["object-position"],
    "ani": ["animation"],
    "filter": ["filter"],  // new
    "blend": ["mix-blend-mode"],  // new
    "ratio": ["aspect-ratio"],  // new
};
```

- ### `Symbols` ###
	Use some snipset to correspond to the symbol, because some symbols can't be class name.
```javascript
{
    "." : ".", // dot
    "neg" : "-", // negative
    "%" : "%", // percent
    "#": "#", // color hash code
    "_"   : " ", // space
    ",": ",", // comma
    "(": "(", // bracket - L
    ")": ")", // bracket - R
    "/": "/", // slash
    "!": " !important", // important
}
```
```html
## Dot
    // width: 50.5px;
    <div class="w-50.5px"></div>

    // letter-spacing: 0.15em;
    <div class="fl-.15em"></div>

## Negative
    // margin-top: -1rem;
    <div class="mt-neg1rem"></div>

## Percent
    // width: 50%;
    <div class="w-50%"></div>

## Color Hash Code
    // background-color: #fff000;
    <div class="bgc-#fff000"></div>

## Space
    // text-shadow: 0 0 red;
    <div class="sdt-0_0_red"></div>

    // padding: 16px 20px 10px 5px;
    <div class="p-16px_20px_10px_5px"></div>

    // margin: 1rem 2rem;
    <div class="m-1rem_2rem"></div>

## Comma
    // text-shadow: 0 0 red, 0 0 blue;
    <div class="sdt-0_0_red,0_0_blue"></div>

## RGBA
    // background-color: rgba(0,0,0,1);
    <div class="bgc-rgba(#000000,1)"></div>

## Slash
    // aspect-ratio: 16/9;
    <div class="ratio-16/9"></div>

## !important
    // width: 500px !important;
    <div class="w-500px!"></div>

## Other type with xxx-xxx
    // display: inline-block;
    <div class="d-inline-block"></div>
    // align-items: center;
    <div class="alignItems-center"></div>
```

- ### `reInit()` ###
You can use `reInit()` to re-check whole html class name to generate css style.

```javascript
var css = new flashCSS();
    css.reInit();
```










