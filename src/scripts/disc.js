const THREE = require('three');

export default class Disc {
    constructor(gui) {
        this.config = {
            size: 100,
            magnitude: 100,
            speed: 500,
            radius: 500,
            segments: 100,
            morph: true,
            morphSpeed: 1000,
        };

        const geometry = new THREE.CircleGeometry(this.config.radius, this.config.segments);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 30,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.x = -0.3 * Math.PI;
        this.vCount = this.mesh.geometry.vertices.length;
        this.initGui(gui);
    }

    initGui(gui) {
        const folder = gui.addFolder('Plane');
        folder.add(this.config, 'size', [50, 100])
            .onChange(c => this.config.size = Number(c));
        folder.add(this.config, 'speed', 1, 1000);
        folder.add(this.config, 'magnitude', -500, 500);

        const folderMorph = gui.addFolder('Morph');
        folderMorph.add(this.config, 'morph');
        folderMorph.add(this.config, 'morphSpeed', 10, 1000);
    }

    getCircumference() {
        return 2 * Math.PI * this.config.radius;
    }

    update(timeStamp) {
        const { size, magnitude, speed, segments, morph, morphSpeed } = this.config;
        const m = (morph) ? magnitude * Math.sin(timeStamp / morphSpeed) : magnitude;

        for (let i = 1; i < this.vCount; i++) {
            const dist = (this.getCircumference() / segments) * i;
            const v = this.mesh.geometry.vertices[i];
            v.z = Math.sin(dist / -size + (timeStamp / speed)) * m;
        }

        this.mesh.geometry.verticesNeedUpdate = true;
    }
}
