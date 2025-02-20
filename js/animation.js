import * as THREE from 'three';

let scene, camera, renderer;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Background color or simple visual effect
    scene.background = new THREE.Color(0x000000); // Dark background for a futuristic look

    // A simple animated effect, like rotating or moving particles
    let geometry = new THREE.CircleGeometry(5, 32);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let circle = new THREE.Mesh(geometry, material);
    scene.add(circle);

    // Moving effect example: Circle rotates around the center
    circle.rotation.x = Math.PI / 4;

    // Lighting for better visibility of objects (optional)
    let light = new THREE.AmbientLight(0xffffff, 0.5);  // Soft white light
    scene.add(light);

    // Adjust camera position
    camera.position.z = 30;

    // Make the renderer responsive to window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    // Update camera and renderer when window is resized
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the simple object for visual effect
    scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01;
            child.rotation.y += 0.01;
        }
    });

    // Render the scene with camera
    renderer.render(scene, camera);
}

init();
animate();

document.addEventListener('DOMContentLoaded', function () {
    const homeElements = document.querySelectorAll('.fade-in');
    homeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`; // Delay bertambah setiap elemen
        element.classList.add('animate');
    });
});

AOS.init({
    duration: 1200, // Durasi animasi
});
