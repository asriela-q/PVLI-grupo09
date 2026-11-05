export default class Craft extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory) {
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

    // se llama al pulsar la tecla F en la mesa de crafteo
    interact(){
        this.activateCrafting();
    }

    activateCrafting() {
        this.scene.scene.pause("main");
        this.scene.scene.launch("CraftUI", { inventory: this.inventory, craft: true });
    }
}