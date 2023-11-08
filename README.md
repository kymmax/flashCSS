# flashCSS

[![NPM Package](https://img.shields.io/npm/v/html-flash-css?color=orange)](https://www.npmjs.com/package/html-flash-css)
[![Build Size](https://img.shields.io/bundlephobia/min/html-flash-css)](https://bundlephobia.com/package/html-flash-css)
[![NPM Downloads](https://img.shields.io/npm/dt/html-flash-css?color=purple)](https://npmtrends.com/html-flash-css)
[![CDN](https://data.jsdelivr.com/v1/package/npm/html-flash-css/badge)](https://www.jsdelivr.com/package/npm/html-flash-css)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A quick way to generate & customize css from html class name.

[DEMO](https://kymmax.github.io/flashCSS/src/demo.html) & [TRY](https://kymmax.github.io/flashCSS/src/try.html)
```html
<div class="d-flex ps-fixed fw-bold fl-.1em fz-16px fz-lg-20px p-1.5rem"></div>
```

## Features
- Generate CSS style from HTML class name.
- Fast to develop website.
- More freedom to use.
- More custom parameter to set.
- Add one JS file only.
- Min JS size `~9 KB` only.
- Save more CSS file size.
- Support React, and any class change with frameworks.

## How to Use?
1. Add js.
```html
<script src="assets/js/flashCSS-2.0.0.min.js"></script>
```
or import js module.

- By npm
```sh
npm i html-flash-css
```
```javascript
import flashCSS from "html-flash-css";
```

- Or
```html
<script type="module">
    import flashCSS from '/assets/js/flashCSS-2.0.0.module.min.js'
</script>
```

- By CDN
- ```html
<script src="https://cdn.jsdelivr.net/npm/html-flash-css@1.6.0/src/assets/js/flashCSS-2.0.0.min.js"></script>
```

1. Execute function when document ready.
```javascript
window.addEventListener("DOMContentLoaded", function () {
    var css = new flashCSS();
});
```

1. Start your project!
(width: 25%; height: 200px; margin-top: 1rem; background-color: black)
```html
<div class="w-25% h-200px mt-1rem bgc-black"></div>
```

* You can do class name as template, and save more file size.
( `@template name` , `=template name` )
```html
// Origin
<div class="w-25% h-200px mt-1rem bgc-black @template"></div>
<div class="=template"></div>
<div class="=template color-red"></div>
// Output
<div class="w-25% h-200px mt-1rem bgc-black "></div>
<div class="w-25% h-200px mt-1rem bgc-black "></div>
<div class="w-25% h-200px mt-1rem bgc-black  color-red"></div>
```

## Getting Started with React
Execute the following example once under the App component.
All component's class will compile by flashCSS method, even if the class changes.
```javascript
// App.js
import { useLayoutEffect } from "react";
import Component_nav from "./component/Component_nav";
import Component_footer from "./component/Component_footer";
import flashCSS from "html-flash-css";

function App() {

    useLayoutEffect(() => {
        const css = new flashCSS({
            observeDOM: true, // need to enable this
        });
    },[])

    return (
        <div className="App">
            <Component_nav className="ps-fixed at-0 al-0 w-100%" />
            <p className="fz-50px fw-bold fa-center color-orange bg-black p-10px">flashCSS with React</p>
            <Component_footer className="d-flex p-3rem" />
        </div>
    );
}

export default App;
```

## Parameters
```javascript
var css = new flashCSS({
    target: "body",      // default
    showPara: false,     // default
    showMedia: false,    // default
    showVariable: false, // default
    observe: false,      // default
    observeDOM: false,   // default
    important: false,    // default
    style: "head",       // default
    link: "-",           // default
    setMedia: {
        xs: 0,    // default
        sm: 576,  // default
        md: 768,  // default
        lg: 992,  // default
        xl: 1280, // default
        landscape: 'landscape', // default
		portrait: 'portrait',   // default
    },
    setStyle: {
        "box": ["box-sizing"],
        "atl": ["top","left"],
    },
    deleteStyle: ["ani"],
    setSymbol: {
        "!": " !important"
    },
    setTemplate: {
        "img-abs": "ps-absolute at-0 al-0"
    },
    setVariable: {
        "main": 'blue',
        "primary": '#fd7e14',
        "success": '#198754',
        "danger": '#dc3545',
    },
    setCustomVal: function( VAL ){
        // custom function here
        return VAL;
    },
    onCompleted: function(){
        // after style added
    },
});
```
- ### `target: Element` ###
	You can compile the effect only to the elements within this range.

- ### `showPara: Boolean` ###
	Will show console table for style para shortcut.

- ### `showMedia: Boolean` ###
	Will show console table for media query setting.

- ### `showVariable: Boolean` ###
	Will show console table for variable setting.

- ### `observe: Boolean` ###
	If html class has changed which class will be update.

- ### `observeDOM: Boolean` ###
	If DOM element has added which class will be update.

- ### `important: Boolean` ###
	Add `!important` on all style.

- ### `style: String (html tag)` ###
	Append the style on the tag location.
	You can change it for `body` or `html`.

- ### `link: String (class link)` ###
	You can change class name dash from `-` to `# ^ & * |`, and other symbols.
    (Can't use `@`, `=`, `:`, `~`, `$`, `+` now.)
```html
## -
<div class="d-block d-xl-none"></div>
## :
<div class="d|block d|xl|none"></div>
```

- ### `setMedia: Object ( {xs: number, sm: number, md: number, lg: number, xl: number, landscape: landscape, portrait: portrait} )` ###
	- Related to CSS @media (min-width: px), and value just like Bootstrap.
    You also can add additional value for yourself.
    - New feature for `orientation` on `landscape` & `portrait`.
```javascript
var css = new flashCSS({
    setMedia: {
        xl: 1366, // change value 
        xxl: 1920 // custom
    }
});
```
```html
<div class="fz-16px fz-lg-20px my-1rem my-xxl-1.5rem"></div>
```

- ### `setStyle: Object` ###
	Related to style value just, and you also can add o change value for yourself.
```javascript
var css = new flashCSS({
    setStyle: {
        "box": ["box-sizing"],
        "atl": ["top","left"],
    },
});
```

- ### `deleteStyle: Array` ###
	Original style settings can be deleted.
```javascript
var css = new flashCSS({
    deleteStyle: ["ani","d"],
});
```

- ### `setSymbol: Object` ###
	Related to style value just, and you also can add o change value for yourself.
```javascript
var css = new flashCSS({
    setSymbol: {
        "!!!": " !important" // change setting
    },
});
```

- ### `setTemplate: Object` ###
	You can create the custom template as `=templateName`, just like class name.
```javascript
var css = new flashCSS({
    setTemplate: {
        "img-abs": "ps-absolute at-0 al-0"
    },
});
```
```html
## input class
<div class="=img-abs"></div>

## output class
<div class="ps-absolute at-0 al-0"></div>
```

- ### `setVariable: Object` ###
	You can create the custom variable as following example.
```javascript
var css = new flashCSS({
    setVariable: {
        "main": 'blue',
        "primary": '#fd7e14',
    },
});
```
```html
## input class
<div class="bg-$main"></div>

## output style
<style>
    .bg\-\$main{
        background: blue;
    }
</style>
```

- ### `setCustomVal: return style value` ###
	Do something before output style.
    Example as below, this demo change the `px` to `vw` base on layout device.

```javascript
var css = new flashCSS({
    setLayout: {
        mb: 960,
        pc: 1920
    },
    setCustomVal: function( VAL ){

        var _thisLayout = this.setLayout;
        var _val = "";

        VAL.split(" ").forEach(( item )=>{
            
            Object.keys(_thisLayout).forEach(function(layout){
                
                if(item.includes(layout)){
                    
                    item = item.split(layout)[0] * (100 / _thisLayout[layout]) + "vw";
                }

            })
            
            _val += item + " ";

        })

        return _val;
    }
});
```
```html
## input class
<div class="fz-30mb"></div>

## output style
<style>
    .fz\-30mb{
        font-size: 3.125vw;
    }
</style>
```

- ### `onCompleted: Callback()` ###
	Do something after style added.

- ### `Class Name Shortcut for Style ( class name : style name )` ###
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
    "gTempCol": ["grid-template-columns"]
    "gAutoRow": ["grid-auto-rows"]
    "gColStart": ["grid-column-start"]
    "gColEnd": ["grid-column-end"]
    "gRowStart": ["grid-row-start"]
    "gRowEnd": ["grid-row-end"]
    "gColGap": ["grid-column-gap"]
    "gRowGap": ["grid-row-gap"]
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
};
```

- ### `Symbols` ###
	Use some snipset to correspond to the symbol, because some symbols can't be class name.
```javascript
{
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
}
```
```html
## Colon 
    // pseudo type
    <div class="tf-:hover-scale(1.1)"></div>
    <div class="bg-:active-red"></div>

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

- ### `Pseudo` ###
You can use `:` & `::` to create pseudo style by following avalible parameter.

```javascript
    const _para_pseudo_double_reg = /(before|after|selection|first-letter|first-line)/;
	const _para_pseudo_single_reg = /(nth-child\(\d+\)|nth-last-child\(\d+\)|first-child|last-child|hover|active|focus|checked|enabled|disabled|not|has|is|where)/;
```

```html
## example: 1 
<div class="bg-:active-red"></div>

## output style
<style>
    .bg-\:active-red:active{
        background: red ;
    }
</style>

## example: 2
<div class="content-::before-'flash'"></div>

## output style
<style>
    .content-\:\:before-\'flash\'::before{
        content: 'flash' ;
    }
</style>

## example: 3
<div class="color-:first-child-red"></div>

## output style
<style>
    .color-\:first-child-red:first-child{
        color: red ;
    }
</style>
```

- ### `Class Group: Media + Self & Child` ###
You can customize the styles for self and child element by `child{}` and `{}self`.
For media example will be `child{}-media` and `{}-media-self`
Can't use this method as `child{}self`.

```html
## example: 1 (style for Self)
<div class="{bg-white;color-black}"></div>

## output style
<style>
    .\{bg-white\;color-black\}{
        background: white ;
        color: black ;
    }
</style>

## example: 2 (style for Self with class)
<div class="{bg-white;color-black}.active"></div>

## output style
<style>
    .\{bg-white\;color-black\}\.active.active{
        background: white ;
        color: black ;
    }
</style>

## example: 3 (style for Self with pseudo)
<div class="{bg-white;color-black}:hover"></div>

## output style
<style>
    .\{bg-white\;color-black\}\:hover:hover{
        background: white ;
        color: black ;
    }
</style>

## example: 4 (style for Child)
<ul class="li{bg-white;color-black}">
    <li>list-1</li>
    <li>list-2</li>
</ul>
<ul class=">li{bg-white;color-black}">
    <li>list-1</li>
    <li>list-2</li>
</ul>

## output style
<style>
    .li\{bg-white\;color-black\} li{
        background: white ;
        color: black ;
    }
    .\>li\{bg-white\;color-black\} >li{
        background: white ;
        color: black ;
    }
</style>

## example: 5 (style for Child with class)
<ul class="li.sp{bg-white;color-black}">
    <li>list-1</li>
    <li class="sp">list-2</li>
</ul>

## output style
<style>
    .li\.sp\{bg-white\;color-black\} li.sp{
        background: white ;
        color: black ;
    }
</style>

## example: 6 (style for Child with pseudo)
<ul class="li:hover{bg-white;color-black}">
    <li>list-1</li>
    <li>list-2</li>
</ul>

## output style
<style>
    .li\:hover\{bg-white\;color-black\} li:hover{
        background: white ;
        color: black ;
    }
</style>

## example: 7 (style for self with media)
<div class="{bg-white;color-black}-sm"></div>

## output style
<style>
    @media (min-width:576px) {
        .\{bg-white\;color-black\}-sm{
            background: white ;
            color: black ;
        }
    }
</style>

## example: 8 (style for self with media)
<div class="{bg-white;color-black}-sm-:hover"></div>

## output style
<style>
    @media (min-width:576px) {
        .\{bg-white\;color-black\}-sm-\:hover:hover{
            background: white ;
            color: black ;
        }
    }
</style>

## example: 9 (style for child with media)
<ul class="li{bg-white;color-black}-sm">
    <li>list-1</li>
    <li>list-2</li>
</ul>

## output style
<style>
    @media (min-width:200px) {
        .li\{bg-white\;color-black\}-sm li{
            background: white ;
            color: black ;
        }
    }
</style>
```



- ### `refresh()` ###
You can use `refresh()` to re-check whole html class name to generate css style.

```javascript
var css = new flashCSS();
    css.refresh();
```










