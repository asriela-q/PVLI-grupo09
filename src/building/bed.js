import ROOMS_LIST from "./rooms.js";

export default class Bed extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture);
        this.stats = stats;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

    interact(){
        const room = ROOMS_LIST.find(r => r.room === 'bedroom');
        this.stats.resetSleepyness(room.activeLevel);
    }
}