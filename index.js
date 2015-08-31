
'use strict'

var selectors = [
	'iframe[src*="player.vimeo.com"]',
	'iframe[src*="youtube.com"]',
	'iframe[src*="youtube-nocookie.com"]',
	'iframe[src*="kickstarter.com"][src*="video.html"]',
	'object'
]

var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}'

module.exports = function (selector, opts) {
	opts = opts || {}
	selector = selector || 'body'

	if (isObject(selector)) {
		opts = selector
		selector = 'body'
	}

	var containers = queryAll(selector)
	if (containers.length < 1) return

	if (!document.getElementById('fit-vids-style')) {
		var head = document.head || document.getElementsByTagName('head')[0]
		head.appendChild(styles())
	}

	var customSelector = toSelector(opts.players)
	var videoSelector = toSelector(selectors)

	if (customSelector.length) {
		videoSelector = videoSelector + ',' + customSelector
	}

	for (var i = 0, l = containers.length; i < l; i++) {
		var container = containers[i]
		var videos = queryAll(container, videoSelector)
		for (var j = 0, ll = videos.length; j < ll; j++) {
			wrap(videos[j])
		}
	}
}

function queryAll (el, selector) {
	if (typeof el === 'string') {
		selector = el
		el = document
	}
	return Array.prototype.slice.call(el.querySelectorAll(selector))
}

function wrap (el) {
	if (/fluid-width-video-wrapper/.test(el.parentNode.className)) return

	var widthAttr = parseInt(el.getAttribute('width'), 10)
	var heightAttr = parseInt(el.getAttribute('height'), 10)

	var width = !isNaN(widthAttr) ? widthAttr : el.clientWidth
	var height = !isNaN(heightAttr) ? heightAttr : el.clientHeight
	var aspect = height / width

	el.removeAttribute('width')
	el.removeAttribute('height')

	var wrapper = document.createElement('div')
	el.parentNode.insertBefore(wrapper, el)
	wrapper.className = 'fluid-width-video-wrapper'
	wrapper.style.paddingTop = (aspect * 100) + '%'
	wrapper.appendChild(el)
}

function toSelector (input) {
	if (typeof input === 'undefined') return ''
	return Array.isArray(input) ? input.join() : input
}

function styles () {
	var div = document.createElement('div')
	div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>'
	return div.childNodes[1]
}

function isObject (input) {
	return Object.prototype.toString.call(input) === '[object Object]'
}
