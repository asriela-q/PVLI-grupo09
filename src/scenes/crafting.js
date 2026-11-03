import RECIPES_LIST from "../objectsAndInventory/recipes.js";
import ROOMS_LIST from "../objectsAndInventory/rooms.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Psy from "../player/playerManager.js";

export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "CraftUI"}); // nombre de la escena
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create (data) {
        this.inventory = data.inventory;
        this.close = this.input.keyboard.addKey("Q");

        this.renderCraftableRecipes();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.close)) this.closeUI();
    }

    renderCraftableRecipes() {
        this.checkAvaibleCrafts();

        let bg = this.add.image(0, 0, "craftbg").setOrigin(0,0);
        bg.setScale(1);

        let cont = 20;
        console.log(Object.keys(RECIPES_LIST).length);
        for(let i = 0; i < Object.keys(RECIPES_LIST).length; i++) {
            const recipe = RECIPES_LIST.find(r => r.number === i);
            console.log(recipe);
            if(recipe.unlocked) {
                // se renderiza el cuadrado de la receta
                if (recipe.craftable) {
                    var green = this.add.image(20, cont, "green").setOrigin(0, 0).setInteractive();
                    green.setScale(0.4);
                    green.on("pointerdown", ()=>this.craftRecipe(recipe, this.inventory));
                }
                else {
                    var square = this.add.image(20, cont, "square").setOrigin(0, 0);
                    square.setScale(0.4);
                }

                // se renderiza la imagen del objeto de la receta
                let object = this.add.image(25, cont + 5, recipe.object).setOrigin(0, 0);
                object.setScale(0.1);

                // se renderizan los objetos necesarios para la receta
                // nota: esto esta floperisimo pero genuinamente no se como hacerlo de otra manera pq con un array no me lee el dato no se por que
                console.log(recipe.numIngredients);
                console.log(recipe.ing1);
                let ingredient1 = this.add.image(125, cont + 5, recipe.ing1).setOrigin(0, 0);
                ingredient1.setScale(0.1);
                console.log(recipe.ing2);
                let ingredient2 = this.add.image(225, cont + 5, recipe.ing2).setOrigin(0, 0);
                ingredient2.setScale(0.1);
                // if(recipe.numIngredients > 2) {
                //     let ingredient3 = this.add.image(325, cont + 5, recipe.ing3).setOrigin(0, 0);
                //     ingredient3.setScale(0.1);
                // }

                cont = cont + 170;
            }
        }
    }

    checkAvaibleCrafts() {
        console.log(Object.keys(RECIPES_LIST).length);
        for(let i = 0; i < Object.keys(RECIPES_LIST).length; i++) {
            const recipe = RECIPES_LIST.find(r => r.number === i);
            console.log(recipe);
            if(this.inventory.checkInventory(recipe.ing1) >= recipe.quant1 &&
               this.inventory.checkInventory(recipe.ing2) >= recipe.quant2) {
                recipe.craftable = true;
            }
            else {
                recipe.craftable = false;
            }
        }
    }

    craftRecipe(recipe) {
        console.log("entra en craft recipe");
        for(let i = 0; i < recipe.quant1; i++) {
            this.inventory.removeItem(recipe.ing1);
            console.log(recipe.ing1 + "removed");
        }
        for(let i = 0; i < recipe.quant2; i++) {
            this.inventory.removeItem(recipe.ing2);
            console.log(recipe.ing2 + "removed");
        }
        this.inventory.addItemToInventory(recipe.object)
        
        this.renderCraftableRecipes();;
    }

    closeUI() {
        this.scene.resume("main");
        this.scene.stop();
    }
}