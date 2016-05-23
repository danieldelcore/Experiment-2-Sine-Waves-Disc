/* globals Detector */
/* eslint-disable no-param-reassign */

import THREE from 'three';
import dat from 'dat-gui';
import Disc from './disc';
import bindAll from 'lodash/bindAll';

const gui = new dat.GUI();

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
    document.getElementById('container').innerHTML = '';
}

function initGui(main) {
    // Lights
    const folder = gui.addFolder('Light');
    folder.addColor(main.conf, 'hemisphereLightColor')
        .onChange(c => main.hemisphereLight.color = new THREE.Color(c));
    folder.addColor(main.conf, 'hemisphereLightColor2')
        .onChange(c => main.hemisphereLight.groundColor = new THREE.Color(c));
    folder.add(main.conf, 'hemisphereLightIntensity')
        .onChange(c => main.hemisphereLight.intensity = new THREE.Color(c));
    folder.addColor(main.conf, 'directionalLightColor')
        .onChange(c => main.directionalLight.color = new THREE.Color(c));
    folder.add(main.conf, 'directionalLightIntensity')
        .onChange(c => main.directionalLight.intensity = c);
}

class Main {
    constructor() {
        bindAll(this,
            'animate',
            'onResize');

        this.conf = {
            hemisphereLightColor: 0xFF004A,
            hemisphereLightColor2: 0xFFCD02,
            hemisphereLightIntensity: 1,
            directionalLightColor: 0xffffff,
            directionalLightIntensity: 0.1,
        };

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.setClearColor(0x17293a);

        // Container
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.container.appendChild(this.renderer.domElement);

        // Scene
        this.scene = new THREE.Scene();
        window.addEventListener('resize', this.onResize);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.01,
            10000);
        this.camera.position.set(0, 0, 1500);
        this.camera.lookAt(0, 0, 0);

        // Controls
        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement);
        this.controls.userPan = false;
        this.controls.userPanSpeed = 0.0;
        this.controls.maxDistance = 5000.0;
        this.controls.target.set(0, 0, 0);

        // Light
        this.directionalLight = new THREE.DirectionalLight(
            this.conf.directionalLightColor,
            this.conf.directionalLightIntensity);
        this.directionalLight.position.set(-20, 20, 30);
        this.hemisphereLight = new THREE.HemisphereLight(
            this.conf.hemisphereLightColor,
            this.conf.hemisphereLightColor2,
            this.conf.hemisphereLightIntensity);
        this.hemisphereLight.position.set(-20, 20, 30);

        // Pièce de résistance
        this.disc = new Disc(gui);

        this.scene.add(
            this.hemisphereLight,
            this.directionalLight,
            this.disc.mesh);
    }

    onResize() {
        const { innerWidth, innerHeight } = window;
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    render(timeStamp) {
        this.disc.update(timeStamp);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    animate(timeStamp) {
        requestAnimationFrame(this.animate);
        this.render(timeStamp);
    }
}

const main = new Main();
main.animate();
initGui(main);
