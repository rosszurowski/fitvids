# fitvids

Lets your videos be responsive by keeping an [intrinsic aspect ratio](http://alistapart.com/article/creating-intrinsic-ratios-for-video).

This module is based heavily off of Dave Rupert's [FitVids jQuery plugin](https://github.com/davatron5000/FitVids.js).

## Install

```bash
npm install fitvids --save
```

You can also [download the files manually](https://raw.githubusercontent.com/rosszurowski/vanilla-fitvids/master/fitvids.min.js) and include them via a `<script>` tag.

## Usage

```javascript
fitvids() // Bam, done.
```

The module exports a single function. Just call it, and it'll wrap all your videos. By default it applies to any videos on the page.

## Options

#### Custom Selector

If you'd prefer to limit this to a single element, you can call fitvids with an optional selector:

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

### Browser Support

This module uses `document.querySelector` which is supported in newer browsers. According to [Can I Use](http://caniuse.com/#feat=queryselector), `querySelector` has a 94.61% global support rate, so it should be safe for most people.

* Firefox 3.5+
* Chrome 4+
* Opera 10+
* IE 8+
* Safari 3.1+
* Safari iOS 3.2+

### License

[WTFPL](http://www.wtfpl.net)
