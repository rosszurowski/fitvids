
var fitvids = require('./')
var test = require('tape')

test('injects styles', function (t) {
	fitvids()

	var styles = document.getElementById('fit-vids-style')

	t.ok(styles.innerHTML, 'has content')
	t.equal(styles.parentNode, document.head, 'added to head')
	t.end()
})

test('wraps videos in fluid wrapper', function (t) {
	var video = player('https://www.youtube.com/embed/Bfk83WZcAI4')
	video.width = 560
	video.height = 315

	fitvids()

	var wrapper = document.querySelector('.fluid-width-video-wrapper')

	t.equal(wrapper.style.paddingTop, '56.25%', 'aspect ratio preserved')
	t.equal(video.src, 'https://www.youtube.com/embed/Bfk83WZcAI4', 'source doesn\'t change')
	t.equal(video.parentNode.className, 'fluid-width-video-wrapper', 'wrapped in fluid container')

	document.body.removeChild(wrapper)

	t.end()
})

test('wraps all default selectors', function (t) {
	var defaults = [
		player('https://www.youtube.com/embed/Bfk83WZcAI4'),
		player('http://player.vimeo.com/video/118801020'),
		player('https://www.kickstarter.com/projects/181236819/no-2-story-of-the-pencil-documentary/widget/video.html')
	]

	var extra = player('http://localhost/')

	fitvids()

	defaults.forEach(function (video) {
		t.equal(video.parentNode.className, 'fluid-width-video-wrapper', 'wrapped in fluid container')
		document.body.removeChild(video.parentNode)
	})

	t.notEqual(extra.parentNode.className, 'fluid-width-video-wrapper', 'didn\'t wrap unknown video selector')
	document.body.removeChild(extra)

	t.end()
})

test('allows custom players', function (t) {
	var video = player('http://www.dailymotion.com/embed/video/x1wt7d1')

	fitvids({
		players: ['iframe[src*="dailymotion"]']
	})

	t.equal(video.parentNode.className, 'fluid-width-video-wrapper', 'wrapped in fluid container')
	t.end()
})

/**
 * Generate a video embed from a source url
 */
function player (src) {
	var el = document.createElement('iframe')
	el.src = src
	document.body.appendChild(el)
	return el
}
