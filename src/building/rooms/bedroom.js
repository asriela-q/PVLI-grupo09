import statHandler from "../../player/statHandler.js";

export default class Bedroom extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture);
        this.stats = stats;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

    interact(){
        this.stats.resetSleepyness();
    }
}