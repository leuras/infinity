# Infinity Page jQuery Plugin

## Usage

Include the script plugin from `dist` folder and jQuery dependency: 

```html
<script language="javascript" type="text/javascript" src="jquery.min.js"></script>
<script language="javascript" type="text/javascript" src="dist/infinity.min.js"></script>
```

### Example with HTML Response

```js
var infinity = $.infinity({
	url: 'product/list/',
	dataType: 'html',
	success: function (html) {
        // ...
	},
	done: function () {
		// ...
	}
}).go();
```

### Example with JSON Response

```js
var infinity = $.infinity({
	url: 'product/list/',
	dataType: 'json',
	success: function (result) {
        // ...
	},
	done: function () {
		// ...
	}
}).go();
```

### Use a HTML button to show more results

```js
var infinity = $.infinity({...}).go();

$('button').click(function(e){
	infinity.more();
});
```

### Use the window scroll event to show more results

```js
$(window).scroll(function() {
    if (($(window).scrollTop() + $(window).height()) == $(document).height()) {
        infinity.more();
    }
});
```

## Notes

This plugin requires jQuery v2.1+

## License

This plugin is distributed under the [MIT License](https://opensource.org/licenses/MIT)