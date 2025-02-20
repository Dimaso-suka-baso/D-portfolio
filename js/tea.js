import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(300, 300);
document.querySelector('.tea-container').appendChild(renderer.domElement);

// Create a tea cup
const cupGeometry = new THREE.CylinderGeometry(1.5, 1.5, 2, 32);
const cupMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.3, roughness: 0.6 });
const cup = new THREE.Mesh(cupGeometry, cupMaterial);
scene.add(cup);

// Create tea inside
const teaGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.2, 32);
const teaMaterial = new THREE.MeshStandardMaterial({ color: 0xa67c52, metalness: 0.1, roughness: 0.8 });
const tea = new THREE.Mesh(teaGeometry, teaMaterial);
tea.position.y = -0.8;
scene.add(tea);

// Light setup
const light = new THREE.PointLight(0xffffff, 1, 10);
light.position.set(2, 3, 2);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Set camera position
camera.position.y = 1;
camera.position.z = 4;

// Animation
function animate() {
    requestAnimationFrame(animate);
    tea.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
