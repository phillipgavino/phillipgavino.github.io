import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let mesh_1; // Declare the mesh variable here

const loader = new STLLoader();
loader.load("ut_longhorn.stl", function (geometry) {
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });
    mesh_1 = new THREE.Mesh(geometry, material);
	
	mesh_1.position.set(-5, 0.5, 0);
    scene.add(mesh_1);
});

let mesh_2; // Declare the mesh variable here

loader.load("ut_longhorn.stl", function (geometry) {
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733});
    mesh_2 = new THREE.Mesh(geometry, material);
	
	mesh_2.position.set(4.5, 0.5, 0);
    scene.add(mesh_2);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
	
    if (mesh_1) {
        mesh_1.rotation.x += 0.01;
        mesh_1.rotation.y += 0.01;
	}
	
	if (mesh_2) {
        mesh_2.rotation.x += 0.01;
        mesh_2.rotation.y += 0.01;
	}
	
    renderer.render(scene, camera);
}

animate();
