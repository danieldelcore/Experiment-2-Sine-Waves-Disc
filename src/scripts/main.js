/* globals Detector */

import THREE from 'three';
import Disk from './disk';

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
    document.getElementById('container').innerHTML = '';
}

let container;
let controls;
let camera;
let scene;
let renderer;

const disk = new Disk();

function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0x17293a);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.set(0, 500, 1000);
    camera.lookAt(scene.position);
}

function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.center.set(0, 0, 0);
}

function initLight() {
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    hemisphereLight.position.set(-20, 20, 30);
    scene.add(hemisphereLight);
}

function init() {
    initRenderer();

    container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    window.addEventListener('resize', onResize);

    initCamera();
    initControls();
    initLight();

    scene.add(disk.mesh);
}

function render(ts) {
    disk.update(ts);
    controls.update();
    renderer.render(scene, camera);
}

function animate(timeStamp) {
    requestAnimationFrame(animate);
    render(timeStamp);
}

init();
animate();
