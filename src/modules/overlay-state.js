// import { TweenMax } from "gsap";

let currentOverlay = 0;
const transitionDur = .5;

function getCurrentOverlay(overlay) {
	const overlays = document.querySelectorAll(`${overlay}`);
	return overlays[currentOverlay]
}

function filterCurrentOverlay(value){
	return value.getAttribute(`[data-overlay]`) === currentOverlay
}

function getOverlayLengths(overlay) {
	const overlays = document.querySelectorAll(`${overlay}`);
	return overlays.length - 1
}

function nextOverlay() {
	if (currentOverlay >= getOverlayLengths('[data-overlay]')) {
		// If you go past the maximum number of overlays reset to zero.
		TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { 
			autoAlpha: 0,
			onComplete: function () {
				currentOverlay = 0
				TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { autoAlpha: 1 })
			}
		})
	}
	else {
		TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { 
			autoAlpha: 0,
			onComplete: function () {
				currentOverlay++
				TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { autoAlpha: 1 })
			}
		})
	}
}

function prevOverlay() {
	if (currentOverlay <= 0) {
		TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { 
			autoAlpha: 0,
			onComplete: function(){
				currentOverlay = getOverlayLengths('[data-overlay]');
				TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { autoAlpha: 1 })
			}
		})
		// If you go past the maximum number of overlays reset to highest number.
	}
	else {
		TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { 
			autoAlpha: 0,
			onComplete: function () {
				currentOverlay--
				TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { autoAlpha: 1 })
			}
		})
	}
}

function initOverlayState(){
	//Hides every overlay
	TweenMax.set('[data-overlay]', { autoAlpha: 0 })

	//Shows current overlay
	TweenMax.to(getCurrentOverlay('[data-overlay]'), .6, { autoAlpha: 1 });

	function bindEvents() {
		const next = document.querySelector('#next')
		const prev = document.querySelector('#prev')

		next.addEventListener('click', nextOverlay);
		prev.addEventListener('click', prevOverlay);

	}

	bindEvents()
}

TweenMax.to("path", 0.8, { strokeDashoffset: "-=12", repeat: -1, ease: Linear.easeNone });

initOverlayState()