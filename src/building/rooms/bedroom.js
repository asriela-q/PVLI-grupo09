export default class Bedroom extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory) {
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

    interact(){
        this.activateLevelingUp();
    }

    activateLevelingUp() {
        this.scene.scene.pause("main");
        console.log("sugoi");
        this.scene.scene.launch("CraftUI", { inventory: this.inventory, craft: 3, roomId: 'bedroom' });
    }
}