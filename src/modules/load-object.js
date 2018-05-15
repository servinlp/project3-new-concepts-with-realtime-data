
function loadObject( name ) {
	return new Promise( ( resolve, reject ) => {

		const mtlLoader = new THREE.MTLLoader()

		mtlLoader.setPath( './objects/' )

		mtlLoader.load( `${ name }.mtl` , materials => {

			materials.preload()

			const objLoader = new THREE.OBJLoader()

			objLoader.setPath( './objects/' )
			objLoader.setMaterials( materials )

			objLoader.load( `${ name }.obj`, object => {

				resolve( object )

			}, () => {},
			err => {

				reject( [ 'Object', err ] )
	
			} )

		}, () => {},
		err => {

			reject( [ 'Material', err ] ) 

		} )

	} )
}

export default loadObject