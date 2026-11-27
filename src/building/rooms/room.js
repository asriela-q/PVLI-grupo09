export default class Room extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory, roomId) {
        super(scene, x, y, texture);
        this.inventory = inventory;
        this.roomId = roomId;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

    interact(){
        this.activateLevelingUp();
    }

    activateLevelingUp() {
        this.scene.scene.pause("main");
        this.scene.scene.launch("CraftUI", { inventory: this.inventory, craft: 3, roomId: this.roomId });
    }
}