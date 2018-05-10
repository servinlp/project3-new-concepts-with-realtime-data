let currentOverlay = 0;

// function getCurrentActiveOverlay(el) {
// 	const overlays = document.querySelectorAll('[data-overlay]');
// 	return overlays[currentOverlay]
// }

getCurrentOverlay('[data-overlay]');

function getCurrentOverlay(overlay) {
	const overlays = document.querySelectorAll(`${overlay}`);
	return overlays.filter(filterCurrentOverlay)
}

function filterCurrentOverlay(value){
	return value.className === `[data-overlay="${currentOverlay}"]`
}

function getOverlayLengths(overlay) {
	const overlays = document.querySelectorAll(`${overlay}`);
	return overlays.length
}

function nextOverlay() {
	if (currentOverlay > getOverlayLengths('[data-overlay]')) {
		// If you go past the maximum number of overlays reset to zero.
		currentOverlay = 0
	}
	else {
		currentOverlay++
	}
}

function prevOverlay() {
	if (currentOverlay < 0) {
		// If you go past the maximum number of overlays reset to highest number.
		currentOverlay = getOverlayLengths('[data-overlay]').length - 1
	}
	else {
		currentOverlay--
	}
}