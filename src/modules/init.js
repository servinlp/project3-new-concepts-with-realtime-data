
import loadObject from './load-object.js'
import render from './render.js'
import { renderer, scene } from './base.js'

function init() {

	const axesHelper = new THREE.AxesHelper( 5 )
	scene.add( axesHelper )

	loadObject( 'main-tank' )
		.then( object => {

			scene.add( object )

		} )
		.catch( err => {

			console.error( err )

		} )

	renderer.animate( render )

}

export default init