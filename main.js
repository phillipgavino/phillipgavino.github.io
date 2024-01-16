import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let mesh; // Declare the mesh variable here

const loader = new STLLoader();
loader.load("ut_longhorn.stl", function (geometry) {
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });
    mesh = new THREE.Mesh(geometry, material);
	
	mesh.position.set(-4.5, 0, 0);
    scene.add(mesh);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    if (mesh) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

animate();
