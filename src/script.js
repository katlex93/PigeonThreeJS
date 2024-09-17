import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * GUI
 */
const gui= new GUI()
gui.close()
// gui.addFolder('')

const guiObjects= {}
guiObjects.colorBG = 0xffd60a
gui
    .addColor(guiObjects, 'colorBG')
    .onChange(() => {
        // Update the scene background color properly
        scene.background = new THREE.Color(guiObjects.colorBG);
    })
    .name('BG')





// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(guiObjects.colorBG)


/**
 * Model
 */

const gltfloader= new GLTFLoader()

gltfloader.load(
    'GLTF/pigeonHead.glb',
    (gltf)=>
    {
        gltf.scene.scale.set(0.8, 0.8, 0.8)
        scene.add(gltf.scene)
    }
)








/**
 * Lights
 */

const ambientLight= new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directLight = new THREE.DirectionalLight(0xffffff, 2)
directLight.position.set(1, 4, 3)
scene.add(directLight)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
    })



    

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate 
 */
const clock = new THREE.Clock()

const tick = () =>
    {
        
    
        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

       // Call tick again on the next frame
       window.requestAnimationFrame(tick)
    
        
    }

    tick()