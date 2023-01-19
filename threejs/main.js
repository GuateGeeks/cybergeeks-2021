import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { RoughnessMipmapper } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/utils/RoughnessMipmapper.js';
import { DeviceOrientationControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/DeviceOrientationControls.js';
import { FlyControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/FlyControls.js';

let camera, scene, renderer, controls, clock, mixer;

let reflector;

init();

function init() {

    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(25, 20, 5);
    camera.rotation.x = -0.5
    camera.rotation.y = 0.90
    camera.rotation.z = 0.4

    new THREE.CubeTextureLoader()
        .setPath('threejs/textures/MilkyWay/')
        .load(['dark-s_px.jpg',
            'dark-s_nx.jpg',
            'dark-s_py.jpg',
            'dark-s_ny.jpg',
            'dark-s_pz.jpg',
            'dark-s_nz.jpg'], function (texture) {

                const envMap = pmremGenerator.fromEquirectangular(texture).texture;
                scene.background = envMap;
                scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                const loader = new GLTFLoader().setPath('threejs/models/city/');
                loader.load('scene.gltf', function (gltf) {
                    const model = gltf.scene;
                    // model.position.set( 1, 1, 0 );
                    // model.scale.set( 0.01, 0.01, 0.01 );

                    model.traverse(function (child) {

                        if (child.isMesh) {

                            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                            // roughnessMipmapper.generateMipmaps( child.material );

                        }

                    });

                    scene.add(model);

                    mixer = new THREE.AnimationMixer(model);
                    mixer.clipAction(gltf.animations[0]).play();

                    animate();

                }, undefined, function (e) {

                    console.error(e);

                });
            });


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.autoClear = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.movementSpeed = 10;
    controls.maxDistance = 50
    controls.minAzimuthAngle = Math.PI * 0.05;
    controls.maxAzimuthAngle = Math.PI * 0.3;
    controls.minPolarAngle = Math.PI * 0.37;
    controls.maxPolarAngle = Math.PI * 0.45;

    controls.minDistance = 15;
    controls.maxDistance = 35;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 100;
    controls.autoForward = false;
    controls.dragToLook = false;
    controls.panSpeed = 0.05
    controls.screenSpacePanning = false;

    document.body.appendChild(renderer.domElement);


}


function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer.update(delta);
    controls.update(delta);
    renderer.render(scene, camera);

}

