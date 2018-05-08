
import render from './render.js'
import { renderer, scene } from './base.js'

function init() {

	const axesHelper = new THREE.AxesHelper( 5 )
	scene.add( axesHelper )

	renderer.animate( render )

}

export default init