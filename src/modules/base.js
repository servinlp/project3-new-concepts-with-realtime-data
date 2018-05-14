
const scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
	renderer = new THREE.WebGLRenderer(),
	controls = new THREE.OrbitControls( camera )

camera.position.z = 20

renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )
document.querySelector('main').appendChild( renderer.domElement )

window.addEventListener( 'resize', resize )

const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.3 ),
	ambientLight = new THREE.AmbientLight( 0x404040 )

scene.add( ambientLight )
scene.add( hemisphereLight )

function resize() {

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.setPixelRatio( window.devicePixelRatio )

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

}

export {
	scene,
	camera,
	renderer,
	controls
}