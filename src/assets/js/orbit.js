// import Interaction from 'three.interaction';
let camera, controls, scene, renderer
var object = {} //your object

init()
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate()

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(400, 200, 0)
  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement)

  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25
  controls.screenSpacePanning = false

  const worldAxis = new THREE.AxesHelper(2000);

  const plane = new THREE.GridHelper(500, 20);
  scene.add(worldAxis)
  scene.add(plane)

  generateCubes()

  window.addEventListener('resize', onWindowResize, false)
  renderer.domElement.addEventListener('click', onDocumentMouseDown, true);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  requestAnimationFrame(animate)
  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render()
}

function render () {
  renderer.render(scene, camera)
}

function generateCubes () {
  for (let wall = 0; wall < 3; wall++) {
    for (let column = 0; column < 3; column++) {
      for (let index = 0; index < 3; index++) {
        const geometry = new THREE.BoxBufferGeometry(20, 20, 20)
        mesh = new THREE.Mesh( geometry )
        mesh.name = `${wall}.${column}.${index}`
        mesh.position.x = index * 21
        mesh.position.y = column * 21
        mesh.position.z = wall * 21
        console.log(`PAREDE: ${wall}, COLUNA: ${column}, ITEM: ${index}`)
        mesh.callback = function() { console.log( this.name ); }

        scene.add(mesh)

        document.body.appendChild( renderer.domElement )
      }
    }
  }
}

function onDocumentMouseDown (event) {
  console.log(event, scene)
}