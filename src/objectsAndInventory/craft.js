import ITEM_ENCYCLOPEDIA from "./infoItems.js";
import RECIPES_LIST from "./recipes.js";

export default class Craft extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory) {
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    

}