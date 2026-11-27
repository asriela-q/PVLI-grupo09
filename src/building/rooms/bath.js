export default class Bathroom extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture);
        this.stats = stats;
        this.level = 1;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

    interact(){
        let amount = 30;
        if (this.level === 2) amount = 45;
        if (this.level === 3) amount = 60;
        this.stats.increaseHygiene(amount);
    }
}