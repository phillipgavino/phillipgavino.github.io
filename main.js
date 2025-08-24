import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const loader = new STLLoader();
let meshes = [];
const stlGroup = new THREE.Group();
scene.add(stlGroup);

// Utility: center group based on its bounding box
function centerGroup(group) {
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.sub(center); // move so group is centered at (0,0,0)
}

// Load STL and return a Promise
function loadSTL(path, color, xOffset) {
    return new Promise((resolve) => {
        loader.load(path, (geometry) => {
            const material = new THREE.MeshPhongMaterial({ color, shininess: 80 });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(xOffset, -1, 1); // offset for separation
            mesh.rotation.x = -Math.PI / 2;

            meshes.push(mesh);
            stlGroup.add(mesh);
            resolve(mesh);
        });
    });
}

// Load both STLs, then center group
Promise.all([
    loadSTL("ut_longhorn.stl", 0xff5733, -1),
    loadSTL("ut_longhorn.stl", 0x004a9f, 1),
]).then(() => {
    centerGroup(stlGroup);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Resize handling
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

// Animation
function animate() {
    requestAnimationFrame(animate);

    meshes.forEach((mesh, i) => {
        mesh.rotation.y += 0.01 * (i % 2 === 0 ? 1 : -1);
        mesh.rotation.x += 0.005;
    });

    renderer.render(scene, camera);
}
animate();
