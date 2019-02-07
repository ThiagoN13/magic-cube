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

  // Interação
  const interaction = new THREE.Interaction(renderer, scene, camera);

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
        const cube = new THREE.Mesh( geometry )
        cube.name = `${wall}.${column}.${index}`
        cube.position.x = index * 21
        cube.position.y = column * 21
        cube.position.z = wall * 21
        console.log(`PAREDE: ${wall}, COLUNA: ${column}, ITEM: ${index}`)
        cube.callback = function() { console.log( this.name ); }

        scene.add(cube)

        cube.on('click', function (ev) {
          console.log(ev)
          // console.log(`PAREDE: ${wall}, COLUNA: ${column}, ITEM: ${index}`)

          console.log('%c' + cube.name + '%c => click', 'color: #fff; background: #41b882; padding: 3px 4px;', 'color: #41b882; background: #fff;');
        })

        document.body.appendChild( renderer.domElement )
      }
    }
  }
}

function onDocumentMouseDown (event) {
  // console.log(event, scene)
}