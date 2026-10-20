import ITEM_ENCYCLOPEDIA from "./infoItems.js";
import Inventory from "./inventory.js";
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

    // se llama al pulsar la tecla F en la mesa de crafteo
    activateCrafting(craftingTable) {
        checkAvaibleCrafts();
        ()=>this.scene.start("CraftUI");
    }

    // craftea la receta
    craftRecipe() {
        
    }

    // se llama al abrir la mesa de crafteo y detecta los crafts disponibles en ese momento
    checkAvaibleCrafts() {
        console.log(Object.keys(RECIPES_LIST).length);
        for(let i = 0; i < Object.keys(RECIPES_LIST).length; i++) {
            const recipe = RECIPES_LIST.find(r => r.number === i);
            console.log(recipe);
            if(this.inventory.checkInventory(recipe.ing1) >= recipe.quant1 &&
               this.inventory.checkInventory(recipe.ing2) >= recipe.quant2) {
                recipe.craftable = true;
            }
        }
    }

}