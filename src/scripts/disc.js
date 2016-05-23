const THREE = require('three');

export default class Disc {
    constructor(gui) {
        this.config = {
            // size: 50.0,
            size: 72,
            magnitude: 100,
            speed: 500,
            radius: 500,
            absolute: false,
        };

        const geometry = new THREE.CircleGeometry(this.config.radius, 100);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 30,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
            // wireframe: true,
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.x = -0.3 * Math.PI;
        this.vCount = this.mesh.geometry.vertices.length;
        this.vStart = this.mesh.geometry.vertices[1];
        this.vEnd = this.mesh.geometry.vertices[this.vCount - 1];
        this.vCentre = this.mesh.geometry.vertices[0];

        this.initGui(gui);
    }

    initGui(gui) {
        const folder = gui.addFolder('Plane');
        folder.add(this.config, 'size', 10, 250);
        folder.add(this.config, 'speed', 1, 1000);
        folder.add(this.config, 'magnitude', 10, 200);
        folder.add(this.config, 'absolute');
    }

    // Return the ArcLength between the two vectors
    getArcLength(fromVec, toVec) {
        const angle = Math.atan2(toVec.y - fromVec.y, toVec.x - fromVec.x);
        return this.config.radius * angle;
    }

    update(timeStamp) {
        const { size, magnitude, speed } = this.config;

        for (let i = 1; i < this.vCount; i++) {
            const v = this.mesh.geometry.vertices[i];
            let dist = 0;

            if (i === 1) {
                dist = -this.getArcLength(this.vEnd, v);
            } else {
                dist = this.getArcLength(this.vStart, v);
            }

            if (this.config.absolute) {
                dist = Math.abs(dist);
            }

            v.z = Math.sin(dist / -size + (timeStamp / speed)) * magnitude;
        }

        this.hasLooped = true;

        this.mesh.geometry.verticesNeedUpdate = true;
    }
}
