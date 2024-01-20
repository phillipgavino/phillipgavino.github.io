import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";


const aspect = window.innerWidth / window.innerHeight;
// Example calculation: adjust positions based on aspect ratio
const offset = aspect * 3; // This value controls the offset from the center

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resize for responsiveness
function onWindowResize() {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
	
	updateObjectPositions();
}
window.addEventListener('resize', onWindowResize, false);

let mesh_1, mesh_2;
const loader = new STLLoader();

loader.load("ut_longhorn.stl", function (geometry) {
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });
    mesh_1 = new THREE.Mesh(geometry, material);
    mesh_1.position.set(offset, 0.5, 0); // Adjusted position
    scene.add(mesh_1);
});

loader.load("ut_longhorn.stl", function (geometry) {
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });
    mesh_2 = new THREE.Mesh(geometry, material);
    mesh_2.position.set(-offset, 0.5, 0); // Adjusted position
    scene.add(mesh_2);
});

function updateObjectPositions() {
	
    if (mesh_1) {
        mesh_1.position.set(-offset, 0.5, 0);
	}
	
    if (mesh_2) {
        mesh_2.position.set(offset, 0.5, 0);
	}
}

function updateCameraPosition() {
    // Example camera position update
    camera.position.z = 5 + window.innerWidth / window.innerHeight;
}

window.addEventListener('resize', function() {
    onWindowResize();
    updateCameraPosition();
}, false);



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

updateCameraPosition();

