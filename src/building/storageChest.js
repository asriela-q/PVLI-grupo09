export default class storageChest extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory, storageChest) {
        super(scene, x, y, texture);
        this.inventory = inventory;
        this.storageChest = storageChest;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    interact() {
        this.scene.scene.pause("main");
        this.scene.scene.launch("openChest", { 
            inventory: this.inventory, 
            chest: this.storageChest,
        });
    }
}