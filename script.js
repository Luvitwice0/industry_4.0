// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a tube geometry and material
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(-1, 1, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(2, 0, 0)
]);
const geometry = new THREE.TubeGeometry(path, 20, 0.1, 8, false);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const tube = new THREE.Mesh(geometry, material);
scene.add(tube);

// Position the camera
camera.position.z = 5;

let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Add event listeners for mouse events
document.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const deltaMove = {
        x: event.offsetX - previousMousePosition.x,
        y: event.offsetY - previousMousePosition.y
    };
    tube.rotation.y += deltaMove.x * 0.01;
    tube.rotation.x += deltaMove.y * 0.01;
    previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY
    };
});

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
