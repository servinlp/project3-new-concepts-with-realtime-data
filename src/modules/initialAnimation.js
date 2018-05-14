import { panCameraAndObject } from './overlay-state.js'

let waveHeight = document.querySelector('#back-wave').getBoundingClientRect().height * 2;

window.onresize = function (event) {
	waveHeight = document.querySelector('#back-wave').getBoundingClientRect().height;
	TweenMax.set('.water-filler-back', { top: `-${waveHeight + 4}px` });
};

function loaderAnimation() {
	TweenMax.set('main', { autoAlpha: 0 });		

	const water = document.querySelector('#water');
	TweenMax.set('.water-container', { y: '-20%' });

	TweenMax.set('.water-filler-front, .water_wave_front', { width: '200%', x: '-50%' });
	TweenMax.to('.water-filler-front, .water_wave_front', 1, { x: '0%', repeat: -1, ease: Linear.easeNone });

	TweenMax.set('.water-filler-back', { top: `-${waveHeight + 4}px` });
	TweenMax.set('.water-filler-back, .water_wave_back', { width: '200%', x: '0%' });
	TweenMax.to('.water-filler-back, .water_wave_back', 1.4, { x: '-50%', repeat: -1, ease: Linear.easeNone });

	const tl = new TimelineMax;
	tl
		.to('.water-container', 6, { y: '100%' })
		.to('.screen-transition .blue', .2, { height: '100%' })
		.to('.screen-transition .blue', .3, { width: '100%', ease: Power4.easeOut })
		.to('.screen-transition .white', .2, { height: '100%' })
		.to('.screen-transition .white', .3, { width: '100%', ease: Power4.easeOut })
		.to('.screen-transition .black', .2, { height: '100%' })
		.to('.screen-transition .black', .3, { width: '100%', ease: Power4.easeOut })
		.to('.initialAnimation', .5, { autoAlpha: 0 })

	tl.delay(2)
	tl.play()
	tl.eventCallback("onComplete", endInitialAnimation)

	function endInitialAnimation() {
		TweenMax.to('.initialAnimation', .3, {
			autoAlpha: 0, onComplete: function () {
				// document.querySelector('.initialAnimation').remove();
				// Show final container 
				console.log('main');
				TweenMax.to('main', .6, {autoAlpha: 1});

				setTimeout( () => {

					panCameraAndObject( 0 )
	
				}, 400 )
			}
		});
	}
}

loaderAnimation()