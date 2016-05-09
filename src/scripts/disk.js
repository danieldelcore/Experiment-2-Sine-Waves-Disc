const THREE = require('three');

export default class Disk {
    constructor() {
        this.radius = 500;
        const geometry = new THREE.CircleGeometry(this.radius, 100);
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
        this.vStart = this.mesh.geometry.vertices[1];
        this.vEnd = this.mesh.geometry.vertices[this.vCount - 1];
        this.vCentre = this.mesh.geometry.vertices[0];
    }

    // Return the ArcLength between the two vectors
    getArcLength(fromVec, toVec) {
        const angle = Math.atan2(toVec.y - fromVec.y, toVec.x - fromVec.x);
        return (this.radius * angle);
    }

    update(timeStamp) {
        for (let i = 1; i < this.vCount; i++) {
            const v = this.mesh.geometry.vertices[i];
            const size = 50.0;
            const magnitude = 100;
            let dist = 0;

            if (i === 1) {
                dist = - this.getArcLength(this.vEnd, v);
            } else {
                dist = this.getArcLength(this.vStart, v);
            }

            v.z = Math.sin(dist / -size + (timeStamp / 500)) * magnitude;
        }

        this.mesh.geometry.verticesNeedUpdate = true;
    }
}
