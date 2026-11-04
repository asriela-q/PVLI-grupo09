export default class DeathStone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory) {
        super(scene, x, y, texture);
        
        this.inv = inventory; // inventario del psy

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

}