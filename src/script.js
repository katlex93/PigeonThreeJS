import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


// window.Ammo().then((AmmoLib) => {
//     const collisionConfiguration = new AmmoLib.btDefaultCollisionConfiguration();
//     const dispatcher = new AmmoLib.btCollisionDispatcher(collisionConfiguration);
//     const overlappingPairCache = new AmmoLib.btDbvtBroadphase();
//     const solver = new AmmoLib.btSequentialImpulseConstraintSolver();
  
//     // Initialize the physics world
//     physicsWorld = new AmmoLib.btDiscreteDynamicsWorld(
//       dispatcher,
//       overlappingPairCache,
//       solver,
//       collisionConfiguration
//     );
  
//     // Set gravity in the physics world
//     physicsWorld.setGravity(new AmmoLib.btVector3(0, -9.82, 0)); // Downward gravity
  
//     // Create a transformation helper object
//     transformAux1 = new AmmoLib.btTransform();
  
//     console.log('Physics World Initialized and Ready for Use');
//   });

window.Ammo().then((AmmoLib) => {
    const collisionConfiguration = new AmmoLib.btSoftBodyRigidBodyCollisionConfiguration();
    const dispatcher = new AmmoLib.btCollisionDispatcher(collisionConfiguration);
    const overlappingPairCache = new AmmoLib.btDbvtBroadphase();
    const solver = new AmmoLib.btSequentialImpulseConstraintSolver();
    const softBodySolver = new AmmoLib.btDefaultSoftBodySolver();

    //Create Physics world
    physicsWorld = new AmmoLib.btSoftRigidDynamicsWorld(
        dispatcher,
        overlappingPairCache,
        solver,
        collisionConfiguration,
        softBodySolver
    )

    //Gravity
    physicsWorld.setGravity(new AmmoLib.btVector3(0, -9.82, 0))


   
  
    const softBodyHelpers = new AmmoLib.btSoftBodyHelpers()

    //rope sart and end
    const ropeStart = new AmmoLib.btVector3(0, 5, 0 )
    const ropeEnd = new AmmoLib.btVector3(0,3,0)

    const rope = softBodyHelpers.CreateRope(
        physicsWorld.getWorldInfo(),
        ropeStart,
        ropeEnd, 
        10,
        0

    );


 
    console.log(rope);
  
});







  










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


// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(guiObjects.colorBG)


/**
 * Physics with Ammo
 */

let  physicsWorld;
let rigidBodies = [];
let transformAux1;

//Setup
// Ammo.js Initialization


  





/**
 * Model
 */

const gltfloader= new GLTFLoader()

let pigeonHead= null
let pigeonSkeleton = null

gltfloader.load(
    'GLTF/pigeonWithBrain.glb',
    (gltf)=>
    {
        pigeonHead= gltf.scene
       pigeonHead.scale.multiplyScalar(0.4)
      
       
    
    scene.add(pigeonHead)
})












/**
 * Lights
 */

const ambientLight= new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directLight = new THREE.DirectionalLight(0xffffff, 2)
directLight.position.set(1, 4, 3)
scene.add(directLight)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()




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
 * Cursor
 */

const mouse= new THREE.Vector2()
const circleRadius = 0.5

window.addEventListener('mousemove', (event)=>
{
    mouse.x= event.clientX/sizes.width*2 -1
    mouse.y= -(event.clientY/sizes.height*2 -1)

    
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
    canvas: canvas,
    // antialias: true,
    // alpha: true,preserveDrawingBuffer: true , logarithmicDepthBuffer: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





/**
 * Animate 
 */
const clock = new THREE.Clock()

const tick = () =>
    {
       const elapsedTime= clock.getElapsedTime() 
       
       
       // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

       // Call tick again on the next frame
       window.requestAnimationFrame(tick)
    
        
    }

    tick()