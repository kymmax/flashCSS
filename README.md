# flashCSS
A quick way to customize css from html class name.


### Features


### How to Use?
- Add js on your html.
```html
<script src="assets/js/flashCSS-1.0.0.min.js"></script>
```

- Execute function when document ready.
```javascript
window.addEventListener("DOMContentLoaded", function () {
	var css = new flashCSS();
});
```

- Start your project!
(width: 25%; height: 200px; margin-top: 1rem; background-color: black)
```html
<div class="w-25per h-200px mt-1rem bgc-black">123</div>
```

### Parameters
```javascript
var css = new flashCSS({
	observe: false, // default
	media: {
		xs: 0, // default
		sm: 576, // default
		md: 768, // default
		lg: 992, // default
		xl: 1280, // default
	},
	important: false // default
});
```
- ### observe: Boolean ###
If html class has changed which class will be update.

- media: Object ( {xs: number, sm: number, md: number, lg: number, xl: number} )
Related to CSS @media (min-width: px), and just like Bootstrap.

- important: Boolean
Add !important on style.









