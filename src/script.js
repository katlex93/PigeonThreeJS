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
guiObjects.colorBody = 0xBFC5FF
guiObjects.colorEyeLids = 0xBFC5FF
guiObjects.colorBeak = 0xE7970D
guiObjects.colorBeakSkin = 0xFF3A26
guiObjects.colorEyesX = 0x000000
guiObjects.colorHat1 = 0x5D65FF
guiObjects.colorHat2 = 0xFF3A26

gui
    .addColor(guiObjects, 'colorBG')
    .onChange(() => {
        // Update the scene background color properly
        scene.background = new THREE.Color(guiObjects.colorBG);
    })
    .name('BG')


    gui
    .addColor(guiObjects, 'colorBody')
    .onChange(() => {
        
        bodyMaterial.color.set(guiObjects.colorBody);
    })
    .name('Body')

    gui
    .addColor(guiObjects, 'colorEyeLids')
    .onChange(() => {
        
        eyelidsMaterial.color.set(guiObjects.colorEyeLids);
    })
    .name('EyeLids')

    gui
    .addColor(guiObjects, 'colorBeak')
    .onChange(() => {
        
        beakMaterial.color.set(guiObjects.colorBeak);
    })
    .name('Beak')

    gui
    .addColor(guiObjects, 'colorBeakSkin')
    .onChange(() => {
        
        beakSkinMaterial.color.set(guiObjects.colorBeakSkin);
    })
    .name('Beak Skin')

    gui
    .addColor(guiObjects, 'colorEyesX')
    .onChange(() => {
        
        eyesXMaterial.color.set(guiObjects.colorEyesX);
    })
    .name("Eye's X")

    gui
    .addColor(guiObjects, 'colorHat1')
    .onChange(() => {
        
        hat1Material.color.set(guiObjects.colorHat1);
    })
    .name("Hat 1")

    gui
    .addColor(guiObjects, 'colorHat2')
    .onChange(() => {
        
        hat2Material.color.set(guiObjects.colorHat2);
    })
    .name("Hat 2")





// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(guiObjects.colorBG)



/**
 * Materials
 */

//Bird's Body
const bodyMaterial= new THREE.MeshStandardMaterial({
    color: guiObjects.colorBody,
    roughness: 1
})


const eyelidsMaterial= new THREE.MeshStandardMaterial({
    color: guiObjects.colorEyeLids,
    roughness: 1
})

const beakMaterial= new THREE.MeshStandardMaterial({
    color: guiObjects.colorBeak,
    roughness: 1
})

const beakSkinMaterial= new THREE.MeshStandardMaterial({
    color: guiObjects.colorBeakSkin,
    roughness: 1
})

const eyesMaterial= new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0
})

const eyesXMaterial= new THREE.MeshStandardMaterial({
    color: guiObjects.colorEyesX,
    roughness: 0
})

//Hat
const hat1Material= new THREE.MeshStandardMaterial({
    color: guiObjects.colorHat1,
    roughness: 0
})

const hat2Material= new THREE.MeshStandardMaterial({
    color: guiObjects.colorHat2,
    roughness: 0
})


/**
 * Model
 */

const gltfloader= new GLTFLoader()

let pigeonHead= null
let pigeonSkeleton = null

gltfloader.load(
    'GLTF/pigeonHead.glb',
    (gltf)=>
    {
        pigeonHead= gltf.scene
       pigeonHead.scale.multiplyScalar(0.6)
       pigeonHead.rotation.set(-0.35, -0.45, -0.4)

       // Change materials directly by name if they are named in the model
       pigeonHead.traverse((child) => {
        if (child.isMesh) {
            if (child.material.name === 'Body') {
                child.material = bodyMaterial; 
            }
            
            if (child.material.name === 'eyebag') {
                    child.material = eyelidsMaterial; 
                }
            
            if (child.material.name === 'beak') {
                    child.material = beakMaterial; 
                }
            
            if (child.material.name === 'beakskin') {
                    child.material = beakSkinMaterial; 
                }

            if (child.material.name === 'eyes') {
                    child.material = eyesMaterial; 
                }

            if (child.material.name === 'eyesx') {
                    child.material = eyesXMaterial; 
                }

            if (child.material.name === 'Hat1') {
                    child.material = hat1Material; 
                }

            if (child.material.name === 'hat2') {
                    child.material = hat2Material; 
                }
           
        }
    })

        scene.add(pigeonHead)
    }
)

gltfloader.load(
    'GLTF/pigeonSkeleton.glb',
    (gltf)=>
    {
       pigeonSkeleton =gltf.scene
       pigeonSkeleton.scale.multiplyScalar(0.6)
       pigeonSkeleton.rotation.set(-0.35, -0.45, -0.4)
       pigeonSkeleton.visible=false

       // Change materials directly by name if they are named in the model
       pigeonSkeleton.traverse(
        (child) => {
        if (child.isMesh) {
            if (child.material.name === 'beak') {
                child.material = beakMaterial; 
            }
        }
    })
       
       scene.add(pigeonSkeleton)


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
       const elapsedTime= clock.getElapsedTime() 

       //Raycaster
       raycaster.setFromCamera(mouse,camera)

       if (pigeonHead && pigeonSkeleton) {
        // Check for intersections with the duck model
        const intersects = raycaster.intersectObject(pigeonHead);
    
        if (intersects.length) {
          // Show skeleton when hovering over the duck
         pigeonHead.visible=false
          pigeonSkeleton.visible = true;
          // Optionally highlight parts of the skeleton based on intersects
        } else {
          // Hide skeleton if not hovering over the duck
          pigeonSkeleton.visible = false;
          pigeonHead.visible=true
        }
      }

    
        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

       // Call tick again on the next frame
       window.requestAnimationFrame(tick)
    
        
    }

    tick()