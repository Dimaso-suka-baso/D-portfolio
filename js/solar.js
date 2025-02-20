import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("solarCanvas") });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create planets with different orbits
const planets = [];
const planetColors = [0x0000ff, 0xff0000, 0x00ff00, 0xffff00, 0xff8800]; // Earth, Mars, Venus, etc.
const distances = [5, 8, 11, 14, 18]; // Orbital radii

for (let i = 0; i < planetColors.length; i++) {
    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({ color: planetColors[i] });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    
    planet.position.x = distances[i];
    scene.add(planet);
    planets.push({ mesh: planet, radius: distances[i], speed: 0.01 + i * 0.005 });
}

// Light source
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 0, 0);
scene.add(light);

// Adjust camera to top-down view
camera.position.set(0, 20, 0); // Tinggi di atas pusat tata surya
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update planet positions
    const time = Date.now() * 0.001;
    planets.forEach((planet, index) => {
        const angle = time * planet.speed;
        planet.mesh.position.x = Math.cos(angle) * planet.radius;
        planet.mesh.position.z = Math.sin(angle) * planet.radius;
    });

    renderer.render(scene, camera);
}

animate();
