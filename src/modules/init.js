
import loadObject from './load-object.js'
import render from './render.js'
import { renderer, scene } from './base.js'

function init() {

	const axesHelper = new THREE.AxesHelper( 5 ),
		backplaneGeometry = new THREE.PlaneGeometry( 40, 40, 40 ),
		backplaneMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ),
		backplane = new THREE.Mesh( backplaneGeometry, backplaneMaterial )

	backplane.position.z = 50

	scene.add( axesHelper )
	scene.add( backplane )

	// loadObject( 'catfishRawModel' )
	// 	.then( object => {

	// 		object.position.x = 5
	// 		scene.add( object )

	// 	} )
	// 	.catch( err => console.error( err ) )

	loadObject( 'aquaphonics' )
		.then( object => {
			
			console.log( object )
			object.scale.x = 0.01
			object.scale.y = 0.01
			object.scale.z = 0.01
			scene.add( object )

		} )
		.catch( err => console.error( err ) )

	renderer.animate( render )

}

export default init