// import { TweenMax } from "gsap";
import statePosition from './state-positions.js'
import { scene, camera } from './base.js'

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

		panCameraAndObject( 0 )
	}
	else {
		TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { 
			autoAlpha: 0,
			onComplete: function () {
				currentOverlay++
				TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { autoAlpha: 1 })
			}
		})

		panCameraAndObject( currentOverlay + 1 )
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
		panCameraAndObject( getOverlayLengths('[data-overlay]') )
	}
	else {
		TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { 
			autoAlpha: 0,
			onComplete: function () {
				currentOverlay--
				TweenMax.to(getCurrentOverlay('[data-overlay]'), transitionDur, { autoAlpha: 1 })
			}
		})
		panCameraAndObject( currentOverlay - 1 )
	}
}

function panCameraAndObject( index ) {

	const object = scene.getObjectByName( 'object' ),
		targetPosition = statePosition[ index ],
		camPos = {
			x: targetPosition.camPosition[ 0 ],
			y: targetPosition.camPosition[ 1 ],
			z: targetPosition.camPosition[ 2 ]
		},
		camPosAfter = {
			x: targetPosition.camPositionAfter[ 0 ],
			y: targetPosition.camPositionAfter[ 1 ],
			z: targetPosition.camPositionAfter[ 2 ]
		},
		camRot = {
			x: targetPosition.camRotation[ 0 ],
			y: targetPosition.camRotation[ 1 ],
			z: targetPosition.camRotation[ 2 ],
		},
		objectPos = {
			x: targetPosition.objectPosition[ 0 ],
			y: targetPosition.objectPosition[ 1 ],
			z: targetPosition.objectPosition[ 2 ]
		}

	TweenMax.to( object.position, 2, {
		x: objectPos.x,
		y: objectPos.y,
		z: objectPos.z
	} )

	TweenMax.to( camera.position, 2, {
		x: camPos.x,
		y: camPos.y,
		z: camPos.z
	} )

	TweenMax.to( camera.rotation, 2, {
		x: camRot.x,
		y: camRot.y,
		z: camRot.z,
		onComplete() {

			TweenMax.to( camera.position, 20, {
				x: camPosAfter.x,
				y: camPosAfter.y,
				z: camPosAfter.z
			} )

		}
	} )

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

export { panCameraAndObject }