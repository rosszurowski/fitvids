;(function(w, undefined) {
	
	'use strict';

	/**
	 * Executes callback(s) when images have finished with loading.
	 *
	 * @param  {NodeList} container Container with images, or NodeList of images and/or containers.
	 * @param  {Function} callback  Called when all images are done loading, regardless of their state.
	 * @param  {Function} progress  Called on every image when it has finished with loading.
	 *
	 * @return {Void}
	 */
	w.fitVids = function(selector, options) {
		
		var container = document.querySelectorAll(selector);
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
		
		if(options) settings = (JSON.parse(JSON.stringify(options)));
		
		return container.forEach(function() {
			var selectors = [
				"iframe[src*='player.vimeo.com']",
				"iframe[src*='youtube.com']",
				"iframe[src*='youtube-nocookie.com']",
				"iframe[src*='kickstarter.com']",
				"object",
				"embed"
			];
			
			if(settings.customSelector) {
				selectors.push(settings.customSelector);
			}
			
			var allVideos = container.querySelectorAll(selectors.join(','));
			
			allVideos.forEach(function(element,index,array) {
				if(element.tagName.toLowerCase() === 'embed' && element.parentNode.tagName === 'object' || /fluid-width-video-wrapper/.test(element.parentNode.className)) { return; }
				var height = (element.tagName.toLowerCase() === 'object' || (this.getAttribute('height') && !isNaN(parseInt(this.getAttribute('height'), 10)))) ? parseInt(this.getAttribute('height'), 10) : element.clientHeight,
					width = !isNaN(parseInt(element.getAttribute('width'), 10)) ? parseInt(element.getAttribute('width'), 10) : element.clientWidth,
					aspectRatio = height / width;
				if(!element.getAttribute('id')) {
					var videoID = 'fitvid' + Math.floor(Math.random()*999999);
					element.setAttribute('id', videoID);
				}
				
				element.innerHTML = '<div class="fluid-width-video-wrapper">' + element.innerHTML + '</div>'
				if(/fluid-width-video-wrapper/.test(element.parentNode.className)) element.parentNode.style.paddingTop = '' + (aspectRatio * 100) + '%';
				element.removeAttribute('height');
				element.removeAttribute('width');
			});
		});
	}
}(window));
