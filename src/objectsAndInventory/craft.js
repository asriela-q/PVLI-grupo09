import Inventory from "./inventory.js";
import RECIPES_LIST from "./recipes.js";
import ROOMS_LIST from "../objectsAndInventory/rooms.js";

export default class Craft extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory) {
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    // se llama al pulsar la tecla F en la mesa de crafteo
    activateCrafting() {
        this.scene.scene.pause("main");
        this.scene.scene.launch("CraftUI", { inventory: this.inventory });
    }
}