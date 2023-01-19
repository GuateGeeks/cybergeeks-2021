import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/RGBELoader.js';
import { GCodeLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GCodeLoader.js';
import { OrbitControls  } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js'; 
import { RoughnessMipmapper } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/utils/RoughnessMipmapper.js'; 
import { DeviceOrientationControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/DeviceOrientationControls.js';
import { FlyControls  } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/FlyControls.js'; 

let audio, playButton, playIcon;
let firtPlay = true;
let is_playing = false;

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


//Play Audio
window.addEventListener("DOMContentLoaded", cotentLoaded);

function playMusic(event){
    event.preventDefault();
    if(is_playing){
        audio.pause();
        playIcon.classList.add('lni-play');
        playIcon.classList.remove('lni-pause');
        is_playing = !is_playing
    } else {
        audio.play();
        playIcon.classList.remove('lni-play');
        playIcon.classList.add('lni-pause');
        is_playing = !is_playing
    }
}


function cotentLoaded(event){
    playButton = document.getElementById( 'play-music' );
    playIcon = playButton.getElementsByTagName('i')[0];
    audio = document.querySelector("audio");
    audio.volume = 0.2;
    window.addEventListener("mousemove", event => {
        if(firtPlay){
            playMusic(event);
            firtPlay = false;
        }
    }, false)
    
    playButton.addEventListener('click', playMusic, false);
}

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 2;
    mouseY = (event.clientY - windowHalfY) * 2;
}


let screenWidth, screenHeight;

screenWidth = screenHeight = window.innerWidth

if(window.mobileCheck()){
    
} else {
}


let camera_city_banner, scene_city_banner, renderer_city_banner, controls_city_banner, clock_city_banner, mixer_city_banner, container_city_banner, animation_city_banner;
let activate_animations_city_banner = window.mobileCheck()



function createPathStrings(filename) {
    const basePath = `/threejs/textures/${filename}/`;
    const baseFilename = basePath + 'dark-s';
    const fileType = filename == 'purplenebula' ? '.png' : '.jpg';
    //const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
    const sides = [
        'px',
        'nx',
        'py',
        'ny',
        'pz',
        'nz',
    ];
    const pathStings = sides.map(side => {
      return baseFilename + '_' + side + fileType;
    });
  
    return pathStings;
  }
  
function createMaterialArray(filename) {
    const skyboxImagepaths = createPathStrings(filename);
    const materialArray = skyboxImagepaths.map(image => {
      let texture = new THREE.TextureLoader().load(image);
  
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    return materialArray;
}





let count = 0, material

init_city_banner();

function init_city_banner() {

    scene_city_banner = new THREE.Scene();
    clock_city_banner = new THREE.Clock();
    camera_city_banner = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera_city_banner.position.set( 25, 5, 30 );
    camera_city_banner.rotation.x = -0.5
    camera_city_banner.rotation.y = 0.90
    camera_city_banner.rotation.z = 0.4
    

    new THREE.CubeTextureLoader()
        .setPath( '/threejs/textures/MilkyWay/' )
        .load( [ 'dark-s_px.jpg', 
                 'dark-s_nx.jpg', 
                 'dark-s_py.jpg',
                 'dark-s_ny.jpg',
                 'dark-s_pz.jpg',
                 'dark-s_nz.jpg' ], function ( texture ) {
               
            material = new THREE.MeshBasicMaterial({
                envMap: texture,
                side: THREE.BackSide,
            });

            let sphere = new THREE.Mesh( new THREE.SphereGeometry( 37, 32, 32 ), material );
            scene_city_banner.add( sphere );

            const loader = new GLTFLoader().setPath( '/threejs/models/city/' );
            loader.load( 'scene.gltf', function ( gltf ) {
                const model = gltf.scene;
                // model.scale.set( 10, 10, 10 );
                // model.position.set( 1, 1, 0 );
                
                model.traverse( function ( child ) {

                    if ( child.isMesh ) {

                        // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                        // roughnessMipmapper.generateMipmaps( child.material );

                    }

                } );

                scene_city_banner.add( model );
                mixer_city_banner = new THREE.AnimationMixer( model );
                animation_city_banner = mixer_city_banner.clipAction( gltf.animations[ 0 ] );
                // mixer_city_banner.clipAction( gltf.animations[ 1 ] ).play();
                if(activate_animations_city_banner){
                    animation_city_banner.play();
                }
                animate_city_banner();

            }, undefined, function ( e ) {

                console.error( e );

            } );

        } );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene_city_banner.add( light );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(1,1,8);
    scene_city_banner.add( directionalLight );
    
    renderer_city_banner = new THREE.WebGLRenderer( { antialias: true } );
    renderer_city_banner.autoClear = false;
    renderer_city_banner.setPixelRatio( window.devicePixelRatio );
    renderer_city_banner.setSize( window.innerWidth, window.innerHeight );
    renderer_city_banner.shadowMap.enabled = true;
    renderer_city_banner.toneMapping = THREE.ACESFilmicToneMapping;
    renderer_city_banner.toneMappingExposure = 1;
    renderer_city_banner.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new THREE.PMREMGenerator( renderer_city_banner );
    pmremGenerator.compileEquirectangularShader();
    
    controls_city_banner = new OrbitControls( camera_city_banner, renderer_city_banner.domElement );
    controls_city_banner.movementSpeed = 10;
    controls_city_banner.minPolarAngle =  Math.PI * 0.01;
    controls_city_banner.maxPolarAngle =  Math.PI * 0.45;

    controls_city_banner.minDistance = 10 ;
    controls_city_banner.maxDistance = 45 ;
    controls_city_banner.domElement = renderer_city_banner.domElement;
    controls_city_banner.rollSpeed = Math.PI / 100;
    controls_city_banner.autoForward = false;
    controls_city_banner.dragToLook = false;
    controls_city_banner.panSpeed = 0.05
    controls_city_banner.screenSpacePanning = false;
    controls_city_banner.autoRotate = false;
    container_city_banner = document.getElementById( '3d-model' );
    container_city_banner.appendChild( renderer_city_banner.domElement );

    container_city_banner.addEventListener("mouseover", (event) => {
        activate_animations_city_banner = true
        animation_city_banner.play();
        animate_city_banner();
    });
    
    container_city_banner.addEventListener("mouseout", (event) => {
        animation_city_banner.stop();
        activate_animations_city_banner = false
    });

}


function animate_city_banner() {
    if(activate_animations_city_banner){
        requestAnimationFrame( animate_city_banner );
        const delta = clock_city_banner.getDelta();
        mixer_city_banner.update( delta );
    }
    if (!window.mobileCheck()) {
        // camera_city_banner.position.x += (mouseX - camera_city_banner.position.x) * .00004;
        // camera_city_banner.position.y += (- mouseY - camera_city_banner.position.y) * .00004;
    }
    controls_city_banner.update();
    count ++;
    renderer_city_banner.render( scene_city_banner, camera_city_banner );
}

//Robot

let camera_model_2, scene_model_2, renderer_model_2, controls_model_2, clock_model_2, mixer_model_2, container_model_2, animation_model_2;
let activate_animations_model_2 = window.mobileCheck()

init_model_2();

function init_model_2() {

    scene_model_2 = new THREE.Scene();
    clock_model_2 = new THREE.Clock();
    camera_model_2 = new THREE.PerspectiveCamera( 50, screenWidth / screenHeight, 0.1, 2000 );
    camera_model_2.position.set( 3000, -200, 0 );
    // camera_model_2.rotation.x = -0.5
    camera_model_2.rotation.y = -0.55
    // camera_model_2.rotation.z = 0.4

    new THREE.CubeTextureLoader()
        .setPath( '/threejs/textures/MilkyWay/' )
        .load( [ 'dark-s_px.jpg', 
                 'dark-s_nx.jpg', 
                 'dark-s_py.jpg',
                 'dark-s_ny.jpg',
                 'dark-s_pz.jpg',
                 'dark-s_nz.jpg' ], function ( texture ) {

            // const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
            // scene_model_2.background = envMap;
            // scene_model_2.environment = envMap  ;

            // texture.dispose();
            // pmremGenerator.dispose();
            
            scene_model_2.background = texture;

            const loader = new GLTFLoader().setPath( '/threejs/models/2_legged_mech_animated/' );
            loader.load( 'scene.gltf', function ( gltf ) {
                const model = gltf.scene;
                model.scale.set( 10, 10, 10 );
                // model.position.set( 1, 1, 0 );
                
                model.traverse( function ( child ) {
        
                    if ( child.isMesh ) {
        
                        // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                        // roughnessMipmapper.generateMipmaps( child.material );
        
                    }
        
                } );
        
                scene_model_2.add( model );
                mixer_model_2 = new THREE.AnimationMixer( model );
                animation_model_2 = mixer_model_2.clipAction( gltf.animations[ 2 ] );
                if(activate_animations_model_2){
                    animation_model_2.play();
                }
                animate_model_2();
        
            }, undefined, function ( e ) {
        
                console.error( e );
        
            } );

        } );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene_model_2.add( light );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(1,1,8);
    scene_model_2.add( directionalLight );
    
    renderer_model_2 = new THREE.WebGLRenderer( { antialias: true } );
    renderer_model_2.autoClear = false;
    renderer_model_2.setPixelRatio( window.devicePixelRatio );
    renderer_model_2.setSize( screenWidth, screenHeight);
    renderer_model_2.shadowMap.enabled = true;
    renderer_model_2.toneMapping = THREE.ACESFilmicToneMapping;
    renderer_model_2.toneMappingExposure = 1;
    renderer_model_2.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new THREE.PMREMGenerator( renderer_model_2 );
    pmremGenerator.compileEquirectangularShader();
    
    controls_model_2 = new OrbitControls( camera_model_2, renderer_model_2.domElement );
    controls_model_2.movementSpeed = 10;
    // controls_model_2.minAzimuthAngle  =Math.PI * 0.05;
    // controls_model_2.maxAzimuthAngle = Math.PI * 0.33 ;
    // controls_model_2.minPolarAngle =  Math.PI * 0.337;
    // controls_model_2.maxPolarAngle =  Math.PI * 0.45;

    controls_model_2.minDistance = 10 ;
    controls_model_2.maxDistance = 100 ;
    controls_model_2.domElement = renderer_model_2.domElement;
    controls_model_2.rollSpeed = Math.PI / 100;
    controls_model_2.autoForward = false;
    controls_model_2.dragToLook = false;
    controls_model_2.panSpeed = 0.05
    controls_model_2.screenSpacePanning = false;
    controls_model_2.autoRotate = true;
    // controls_model_2.addEventListener( 'change', animate_model_2 )
    container_model_2 = document.getElementById( 'robot-model' );
    container_model_2.appendChild( renderer_model_2.domElement );

    container_model_2.addEventListener("mouseover", (event) => {
        activate_animations_model_2 = true
        animation_model_2.play();
        animate_model_2();
    });
    
    container_model_2.addEventListener("mouseout", (event) => {
        animation_model_2.stop();
        activate_animations_model_2 = false
    });

}


function animate_model_2() {
    if(activate_animations_model_2){
        requestAnimationFrame( animate_model_2 );
        const delta = clock_model_2.getDelta();
        mixer_model_2.update( delta );
    }
    controls_model_2.update();
    renderer_model_2.render( scene_model_2, camera_model_2 );

}


let camera_model_3, scene_model_3, renderer_model_3, controls_model_3, clock_model_3, mixer_model_3, container_model_3, model_3;
let activate_animations_model_3 = window.mobileCheck()
init_model_3();

function init_model_3() {

    scene_model_3 = new THREE.Scene();
    clock_model_3 = new THREE.Clock();
    camera_model_3 = new THREE.PerspectiveCamera( 50, screenWidth / screenHeight, 0.1, 2000 );
    camera_model_3.position.set( 60, 60, 100 );
    // camera_model_3.rotation.x = -0.5
    // camera_model_3.rotation.y = 0.90
    // camera_model_3.rotation.z = 0.4

    new THREE.CubeTextureLoader()
        .setPath( '/threejs/textures/MilkyWay/' )
        .load( [ 'dark-s_px.jpg', 
                 'dark-s_nx.jpg', 
                 'dark-s_py.jpg',
                 'dark-s_ny.jpg',
                 'dark-s_pz.jpg',
                 'dark-s_nz.jpg' ], function ( texture ) {

            // const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
            // scene_model_3.background = envMap;
            // scene_model_3.environment = envMap  ;

            // texture.dispose();
            // pmremGenerator.dispose();
            scene_model_3.background = texture;

            const loader = new GCodeLoader();
            loader.load( '/threejs/models/gcode/benchy.gcode', function ( object ) {
                model_3 = object;
                object.position.set( - 100, - 20, 100 );
                scene_model_3.add( object );

                animate_model_3();

            } );

        } );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene_model_3.add( light );
    
    renderer_model_3 = new THREE.WebGLRenderer( { antialias: true } );
    renderer_model_3.autoClear = false;
    renderer_model_3.setPixelRatio( window.devicePixelRatio );
    renderer_model_3.setSize( screenWidth, screenHeight);
    renderer_model_3.shadowMap.enabled = true;
    renderer_model_3.toneMapping = THREE.ACESFilmicToneMapping;
    renderer_model_3.toneMappingExposure = 1;
    renderer_model_3.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new THREE.PMREMGenerator( renderer_model_3 );
    pmremGenerator.compileEquirectangularShader();
    
    controls_model_3 = new OrbitControls( camera_model_3, renderer_model_3.domElement );
    controls_model_3.movementSpeed = 10;
    // controls_model_3.minAzimuthAngle  =Math.PI * 0.05;
    // controls_model_3.maxAzimuthAngle = Math.PI * 0.33 ;
    // controls_model_3.minPolarAngle =  Math.PI * 0.337;
    // controls_model_3.maxPolarAngle =  Math.PI * 0.45;

    controls_model_3.minDistance = 15 ;
    controls_model_3.maxDistance = 100 ;
    controls_model_3.domElement = renderer_model_3.domElement;
    controls_model_3.rollSpeed = Math.PI / 100;
    controls_model_3.autoForward = false;
    controls_model_3.dragToLook = false;
    controls_model_3.panSpeed = 0.05
    controls_model_3.screenSpacePanning = false;
    controls_model_3.autoRotate = true;
        
    container_model_3 = document.getElementById( 'benchy-model' );
    container_model_3.appendChild( renderer_model_3.domElement );

    container_model_3.addEventListener("mouseover", (event) => {
        activate_animations_model_3 = true
        animate_model_3();
    });
    
    container_model_3.addEventListener("mouseout", (event) => {
        activate_animations_model_3 = false
    });

}


function animate_model_3() {
    if(activate_animations_model_3){
        requestAnimationFrame( animate_model_3 );
    }
    const delta = clock_model_3.getDelta();
    // mixer_model_3.update( delta );
    controls_model_3.update( delta );
    renderer_model_3.render( scene_model_3, camera_model_3 );

}


// CIRCUIT

let camera_model_4, scene_model_4, renderer_model_4, controls_model_4, clock_model_4, mixer_model_4, container_model_4, model_4;
let activate_animations_model_4 = window.mobileCheck()
container_model_4 = 'circuit-model'
init_model_4();

function init_model_4() {

    scene_model_4 = new THREE.Scene();
    clock_model_4 = new THREE.Clock();
    camera_model_4 = new THREE.PerspectiveCamera( 50, screenWidth / screenHeight, 0.1, 2000 );
    camera_model_4.position.set( 6, 5, 4 );
    // camera_model_4.rotation.x = -0.5
    // camera_model_4.rotation.y = 0.90
    // camera_model_4.rotation.z = 0.4

    new THREE.CubeTextureLoader()
        .setPath( '/threejs/textures/MilkyWay/' )
        .load( [ 'dark-s_px.jpg', 
                 'dark-s_nx.jpg', 
                 'dark-s_py.jpg',
                 'dark-s_ny.jpg',
                 'dark-s_pz.jpg',
                 'dark-s_nz.jpg' ], function ( texture ) {

            // const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
            // scene_model_4.background = envMap;
            // scene_model_4.environment = envMap  ;

            // texture.dispose();
            // pmremGenerator.dispose();
            scene_model_4.background = texture;

            const loader = new GLTFLoader().setPath( '/threejs/models/breadboard/' );
            loader.load( 'scene.gltf', function ( gltf ) {
                model_4 = gltf.scene;
                // model.position.set( 1, 1, 0 );
                // model.scale.set( 0.01, 0.01, 0.01 );
                model_4.scale.set( 50, 50, 50 );
                
                model_4.traverse( function ( child ) {
        
                    if ( child.isMesh ) {
        
                        // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                        // roughnessMipmapper.generateMipmaps( child.material );
        
                    }
        
                } );
        
                scene_model_4.add( model_4 );
                // if(activate_animations_model_4){
                //     mixer_model_4 = new THREE.AnimationMixer( model_4 );
                //     mixer_model_4.clipAction( gltf.animations[ 0 ] ).play();
                // }
                animate_model_4();
        
            }, undefined, function ( e ) {
        
                console.error( e );
        
            } );

        } );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene_model_4.add( light );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(1,1,8);
    scene_model_4.add( directionalLight );
    
    renderer_model_4 = new THREE.WebGLRenderer( { antialias: true } );
    renderer_model_4.autoClear = false;
    renderer_model_4.setPixelRatio( window.devicePixelRatio );
    renderer_model_4.setSize( screenWidth, screenHeight);
    renderer_model_4.shadowMap.enabled = true;
    renderer_model_4.toneMapping = THREE.ACESFilmicToneMapping;
    renderer_model_4.toneMappingExposure = 1;
    renderer_model_4.outputEncoding = THREE.sRGBEncoding;
    
    const pmremGenerator = new THREE.PMREMGenerator( renderer_model_4 );
    pmremGenerator.compileEquirectangularShader();
    
    controls_model_4 = new OrbitControls( camera_model_4, renderer_model_4.domElement );
    controls_model_4.movementSpeed = 10;
    // controls_model_4.minAzimuthAngle  =Math.PI * 0.05;
    // controls_model_4.maxAzimuthAngle = Math.PI * 0.33 ;
    // controls_model_4.minPolarAngle =  Math.PI * 0.337;
    // controls_model_4.maxPolarAngle =  Math.PI * 0.45;

    controls_model_4.minDistance = 2     ;
    controls_model_4.maxDistance = 10 ;
    controls_model_4.domElement = renderer_model_4.domElement;
    controls_model_4.rollSpeed = Math.PI / 100;
    controls_model_4.autoForward = false;
    controls_model_4.dragToLook = false;
    controls_model_4.panSpeed = 0.05
    controls_model_4.screenSpacePanning = false;

    // controls_model_4.addEventListener( 'change', animate_model_4 )
        
    container_model_4 = document.getElementById(container_model_4);
    container_model_4.appendChild( renderer_model_4.domElement );
    container_model_4.addEventListener("mouseover", (event) => {
        activate_animations_model_4 = true
        animate_model_4();
    });
    
    container_model_4.addEventListener("mouseout", (event) => {
        activate_animations_model_4 = false
    });

}


function animate_model_4() {
    if(activate_animations_model_4){
        requestAnimationFrame( animate_model_4 );
        const delta = clock_model_4.getDelta();
        // mixer_model_4.update( delta );
        controls_model_4.update(delta);
        //model_4.rotation.x += 0.01;
        model_4.rotation.y += 0.01;
    }
    renderer_model_4.render( scene_model_4, camera_model_4 );

}


// ARTIFICIAL


let camera_model_5, scene_model_5, renderer_model_5, controls_model_5, clock_model_5, mixer_model_5, model_5;
let activate_animations_model_5 = window.mobileCheck()
let container_model_5 = 'ai-model'

init_model_5();


function init_model_5() {

    scene_model_5 = new THREE.Scene();
    clock_model_5 = new THREE.Clock();
    camera_model_5 = new THREE.PerspectiveCamera( 50, screenWidth / screenHeight, 0.1, 2000 );
    camera_model_5.position.set( 600, 500, 400 );
    // camera_model_5.position.set( 60, 60, 100 );
    // camera_model_5.rotation.x = -0.5
    // camera_model_5.rotation.y = 0.90
    // camera_model_5.rotation.z = 0.4

    new THREE.CubeTextureLoader()
        .setPath( '/threejs/textures/MilkyWay/' )
        .load( [ 'dark-s_px.jpg', 
                 'dark-s_nx.jpg', 
                 'dark-s_py.jpg',
                 'dark-s_ny.jpg',
                 'dark-s_pz.jpg',
                 'dark-s_nz.jpg' ], function ( texture ) {

                    // const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
                    // scene_model_5.background = envMap;
                    // scene_model_5.environment = envMap  ;

                    // texture.dispose();
                    // pmremGenerator.dispose();
                    scene_model_5.background = texture
                    var geometry = new THREE.BoxGeometry(400, 400, 400, 10, 10, 10);
                    var material = new THREE.MeshBasicMaterial({color: 0X00d25b, wireframe: true, wireframeLinewidth: 0.9});
                    model_5 = new THREE.Mesh(geometry, material);
                    scene_model_5.add(model_5);
                    animate_model_5()

        } );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene_model_5.add( light );
    

    renderer_model_5 = new THREE.WebGLRenderer( { antialias: true } );
    renderer_model_5.autoClear = false;
    renderer_model_5.setPixelRatio( window.devicePixelRatio );
    renderer_model_5.setSize( screenWidth, screenHeight);
    renderer_model_5.shadowMap.enabled = true;
    renderer_model_5.toneMapping = THREE.ACESFilmicToneMapping;
    renderer_model_5.toneMappingExposure = 1;
    renderer_model_5.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new THREE.PMREMGenerator( renderer_model_5 );
    pmremGenerator.compileEquirectangularShader();
    
    controls_model_5 = new OrbitControls( camera_model_5, renderer_model_5.domElement );
    controls_model_5.movementSpeed = 10;
    // controls_model_5.minAzimuthAngle  =Math.PI * 0.05;
    // controls_model_5.maxAzimuthAngle = Math.PI * 0.33 ;
    // controls_model_5.minPolarAngle =  Math.PI * 0.337;
    // controls_model_5.maxPolarAngle =  Math.PI * 0.45;

    controls_model_5.minDistance = 400 ;
    controls_model_5.maxDistance = 1500 ;
    controls_model_5.domElement = renderer_model_5.domElement;
    controls_model_5.rollSpeed = Math.PI / 100;
    controls_model_5.autoForward = false;
    controls_model_5.dragToLook = false;
    controls_model_5.panSpeed = 0.05
    controls_model_5.screenSpacePanning = false;
    controls_model_5.autoRotate = true;
    // controls_model_5.addEventListener( 'change', animate_model_5 )
    container_model_5 = document.getElementById(container_model_5);
    container_model_5.appendChild( renderer_model_5.domElement );
    container_model_5.addEventListener("mouseover", (event) => {
        activate_animations_model_5 = true
        animate_model_5();
    });
    
    container_model_5.addEventListener("mouseout", (event) => {
        activate_animations_model_5 = false
    });

}


function animate_model_5() {
    const delta = clock_model_5.getDelta();
    if(activate_animations_model_5){
        requestAnimationFrame( animate_model_5 );
        model_5.rotation.x += 0.01;
        model_5.rotation.y += 0.01;
        // mixer_model_5.update( delta );
        // controls_model_5.update( delta );
    }
    renderer_model_5.render( scene_model_5, camera_model_5 );

}
