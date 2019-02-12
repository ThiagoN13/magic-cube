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

function generateMesh (wall, column, index) {
  // geometry
  const geometry = new THREE.BoxGeometry(20, 20, 20, 0)
  // material
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors
  })

  // colors
  const red = new THREE.Color(1, 0, 0)
  const green = new THREE.Color(0, 1, 0)
  const blue = new THREE.Color(0, 0, 1)
  const yellow = new THREE.Color(1, 1, 0)
  const orange = new THREE.Color(1, 0.5, 0)
  const white = new THREE.Color(1, 1, 1)
  const lightBlue = new THREE.Color(0, 1, 1)
  const colors = [red, green, blue, yellow, orange, lightBlue, white]

  for (let i = 0; i < colors.length - 1; i++) {
    for (let j = 0; j < 4; j++) {
      if (!geometry.faces[2 * i + j]) continue

      geometry.faces[2 * i + j].color = colors[i]
    }
  }

  const cube = new THREE.Mesh(geometry, material)
  cube.name = `${wall}.${column}.${index}`
  cube.position.x = index * 21
  cube.position.y = column * 21
  cube.position.z = wall * 21
  console.log(`PAREDE: ${wall}, COLUNA: ${column}, ITEM: ${index}`)

  scene.add(cube)

  cube.on('click', function (ev) {
    // console.log(ev)
    // console.log(`PAREDE: ${wall}, COLUNA: ${column}, ITEM: ${index}`)

    console.log('%c' + cube.name + '%c => click', 'color: #fff; background: #41b882; padding: 3px 4px;', 'color: #41b882; background: #fff;');
  })

  document.body.appendChild( renderer.domElement )
}

function generateCubes () {
  for (let wall = 0; wall < 3; wall++) {
    for (let column = 0; column < 3; column++) {
      for (let index = 0; index < 3; index++) {
        generateMesh(wall, column, index)
      }
    }
  }
}
