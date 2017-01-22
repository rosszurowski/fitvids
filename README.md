# fitvids

Lets your videos be responsive by wrapping them in an [aspect ratio container](http://alistapart.com/article/creating-intrinsic-ratios-for-video).

This module is based heavily off of Dave Rupert's [FitVids jQuery plugin](https://github.com/davatron5000/FitVids.js).

## Install

```bash
npm install fitvids --save
```

You can also [download the files manually](https://raw.githubusercontent.com/rosszurowski/vanilla-fitvids/master/dist/fitvids.min.js) and include them via a `<script>` tag.

## Usage

```javascript
fitvids() // Bam, done.
```

The module exports a single function. Just call it, and it'll wrap video embeds from Youtube, Vimeo, and Kickstarter in a responsive container. Other video players can be supported by passing a custom selector via [the options](#custom-players).

To wrap videos that have been added to the page dynamically, just call the function again. Fitvids is smart enough to only wrap the new videos.

## Options

#### Container Selector

To only wrap videos in a certain container, you can provide an optional container selector:

```javascript
fitvids('.video-container')
```

#### Custom Players

By default, fitvids automatically wraps Youtube, Vimeo, and Kickstarter players, but if you'd like it to wrap others too, you can pass them in as selectors via the `players` property.

```javascript
fitvids({
  players: 'iframe[src*="example.com"]'
})
```

Or several at once:

```javascript
fitvids('.video-container', {
  players: ['iframe[src*="example1.com"]', 'iframe[src*="example2.com"]']
})
```

#### Ignoring Selectors

If you'd like to ignore one of the [default selectors](#usage), you can pass a selector via the `ignore` option:

```javascript
fitvids({
  ignore: ['object']
})
```

### Browser Support

This module uses ES5 Array methods (`Array#filter`, `Array#map`) and `querySelector`. Fitvids support browsers that support these features, or any browser with these features polyfilled. This includes following browsers are supported:

* Chrome
* Firefox
* IE 9+
* Safari 3.1+
* Safari Mobile 3.2+

### Contributing

Feel free to make issues or pull requests with bug reports or suggestions.

When contributing code, you can run tests via:

```bash
make test
```

To build distributable versions of the script, run:

```bash
make build
```

### License

[WTFPL](http://www.wtfpl.net)
