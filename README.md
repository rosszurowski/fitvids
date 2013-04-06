Vanilla FitVids
===============

A fork of Dave Rupert's [FitVids.js](https://github.com/davatron5000/FitVids.js) without any frameworks.

FitVids.js lets you get fluid width videos in a responsive web design by keeping an intrinsic aspect ratio.


How to use it
-------------

Just include the fitvids.js script in your code and call it.


    
```html
	<script src="path/to/fitvids.js"></script>
    <script>
    	window.onload = function() {
    		fitVids('#video-container');
    	}
    </script>
```
    
This wraps the video(s) in a `div.fluid-width-video-wrapper` uses CSS to keep the proper ratio for the video.


Browser Support
-------------

Vanilla FitVids uses `document.querySelector` which is supported in newer browsers. According to [Can I Use](http://caniuse.com/#feat=queryselector), `querySelector` has a 94.61% global support rate, so it should be safe for most people. I've only tested this in Chrome 26, Firefox 19, and Safari 6.

- Firefox 3.5+
- Chrome 4+
- Opera 10+
- IE 8+
- Safari 3.1+
- Safari iOS 3.2+