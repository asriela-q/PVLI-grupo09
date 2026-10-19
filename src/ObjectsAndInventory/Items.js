import ITEM_ENCYCLOPEDIA from "./infoItems.js";

export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, itemId) {
        super(scene, x, y, texture);
        this.itemId = itemId;
        this.iteminfo = ITEM_ENCYCLOPEDIA[this.itemId];

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this); 
        this.body.setAllowGravity(false); 
    }

}