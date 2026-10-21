import ITEM_ENCYCLOPEDIA from "../objectsAndInventory/infoItems.js";
import RECIPES_LIST from "../objectsAndInventory/recipes.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Psy from "../player/playerManager.js";

export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "CraftUI"}); // nombre de la escena
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        this.load.image("craftbg", "../assets/images/placeholders/craftbg.jpg");
        this.load.image("square", "../assets/images/placeholders/square.jpg");
        this.load.image("green", "../assets/images/placeholders/verde.jpg");
        this.load.image("metal", "../assets/images/placeholders/metal.jpg");
        this.load.image("metal_sword", "../assets/images/placeholders/metal_sword.jpg");
        this.load.image("stone_sword", "../assets/images/placeholders/stone_sword.png");
        this.load.image("torch", "../assets/images/placeholders/torch.png");
        this.load.image("iron", "../assets/images/placeholders/iron.jpg");
        this.load.image("stone", "../assets/images/placeholders/stone.jpg");
        this.load.image("coal", "../assets/images/placeholders/coal.jpg");
        this.load.image("wood", "../assets/images/placeholders/Wood.jpg");

        // this.close = this.scene.input.keyboard.addKey('Q');
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create (data) {
        let bg = this.add.image(0, 0, "craftbg").setOrigin(0,0);
        bg.setScale(1);
        // const iteminfo = ITEM_ENCYCLOPEDIA[itemId];
        console.log(data.inventory);
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
                    green.on("pointerdown", ()=>this.craftRecipe(recipe, data.inventory));
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

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        
        if (this.close.isDown) this.scene.remove(this);
    }

    craftRecipe(recipe, inventory) {
        console.log("entra en craft recipe");
        for(let i = 0; i < recipe.quant1; i++) {
            inventory.removeItem(recipe.ing1);
            console.log(recipe.ing1 + "removed");
        }
        for(let i = 0; i < recipe.quant2; i++) {
            inventory.removeItem(recipe.ing2);
            console.log(recipe.ing2 + "removed");
        }
        inventory.addItemToInventory(recipe.object);
        console.log("polnito muy muy riko");
    }
}