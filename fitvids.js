/**
* Vanilla FitVids v1.0.0
* Let your videos be fluid.
* http://github.com/rosszurowski/vanilla-fitvids/
*
* Licensed under the WTFPL license
*/
;(function(w, undefined) {

	'use strict';

	w.fitVids = function(selector, options) {

		// get the video container, and stop if it doesn't exist.
		var container = document.querySelectorAll(selector);
		if(!container) return;

		var settings = {
			customSelector: null	
		};

		var div = document.createElement('div'),
			ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

		div.className = 'fit-vids-style';
		div.innerHTML = '&shy;<style>         \
		  .fluid-width-video-wrapper {        \
			 width: 100%;                     \
			 position: relative;              \
			 padding: 0;                      \
		  }                                   \
											  \
		  .fluid-width-video-wrapper iframe,  \
		  .fluid-width-video-wrapper object,  \
		  .fluid-width-video-wrapper embed {  \
			 position: absolute;              \
			 top: 0;                          \
			 left: 0;                         \
			 width: 100%;                     \
			 height: 100%;                    \
		  }                                   \
		</style>';

		ref.parentNode.insertBefore(div,ref);


		// sneaky way to emulate $.extend
		if(options) settings = (JSON.parse(JSON.stringify(options)));

		var selectors = [
			"iframe[src*='player.vimeo.com']",
			"iframe[src*='youtube.com']",
			"iframe[src*='youtube-nocookie.com']",
			"iframe[src*='kickstarter.com']",
			"object",
			"embed"
		];

		if(settings.customSelector) selectors.push(settings.customSelector);

		var allVideos = [];

		// loop through container matches and grab all the videos.
		for(var i=0; i<container.length; i++) {
			var element = container[i],
				videos = element.querySelectorAll(selectors.join(','));

			if(videos.length > 0) {
				for(var j=0;j<videos.length;j++) {
					allVideos.push(videos[j]);	
				}
			}
	 	}


		// loop through all the videos and 
		for(var i=0; i<allVideos.length; i++) {
			var element = allVideos[i];
			if(element.tagName.toLowerCase() === 'embed' && element.parentNode.tagName === 'object' || /fluid-width-video-wrapper/.test(element.parentNode.className)) { return; }
			var height = (element.tagName.toLowerCase() === 'object' || (element.getAttribute('height') && !isNaN(parseInt(element.getAttribute('height'), 10)))) ? parseInt(element.getAttribute('height'), 10) : element.clientHeight,
				width = !isNaN(parseInt(element.getAttribute('width'), 10)) ? parseInt(element.getAttribute('width'), 10) : element.clientWidth,
				aspectRatio = height / width;
			if(!element.getAttribute('id')) {
				var videoID = 'fitvid' + Math.floor(Math.random()*999999);
				element.setAttribute('id', videoID);
			}

			element.removeAttribute('height');
			element.removeAttribute('width');

			var wrapper = document.createElement('div');
			wrapper.className = 'fluid-width-video-wrapper';
			wrapper.appendChild(element.cloneNode(true));
			element.parentNode.replaceChild(wrapper,element);
			wrapper.style.paddingTop = '' + (aspectRatio * 100) + '%';
		}
	}
}(window));