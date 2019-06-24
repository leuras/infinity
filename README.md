# jQuery Infinity Page Plugin

## Usage

Include the script plugin from `dist` folder in your HTML file: 

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="dist/infinity.min.js"></script>
```

### Example with HTML Response

```js
let infinity = $.infinity({
    url: 'app/users/{first}/{count}',
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
let infinity = $.infinity({
    url: 'app/users/{first}/{count}',
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
let infinity = $.infinity({...}).go();

$('button').click(function(e){
    infinity.more();
});
```

### Use the window scroll event to show more results

```js
let infinity = $.infinity({
    url: 'app/users/{first}/{count}',
    dataType: 'json',
    auto: true,
    success: function (result) {
        // ...
    },
    done: function () {
        // ...
    }
}).go();
```

### Using QueryString

```js
let infinity = $.infinity({
    url: 'app/users?offset={first}&per_page={count}&other=value',
    dataType: 'json',
    first: 0,
    count: 5,
    success: function (result) {
        // ...
    },
    done: function () {
        // ...
    }
}).go();
```

### Options & Events

|Name|Type|Default|Required|Description
|---|---|---|---|---|
|url|string||true|A string containing the target URL.|
|auto|boolean|false|false|Lets load more results when the user scrolls down the window.|
|dataType|string|`html`|true|The type of returned data. Possible values are `json` or `html`.|
|first|integer|0|false|The initial offset number. Must be present in target URL through keyword `{first}`.|
|page|integer|1|false|The index number to the first page. Must be present in target URL through keyword `{page}`.|
|count|integer|10|false|Amount of results per page. Must be present in target URL through keyword `{count}`.|
|done|function||false|Triggered when the end of your list (records) has been reached.|
|error|function||false|Triggered when the request fails.|
|success|function||false|Triggered on every successful request.|

## Notes

This plugin requires jQuery v2.1+

## License

This plugin is distributed under the [MIT License](https://opensource.org/licenses/MIT)
