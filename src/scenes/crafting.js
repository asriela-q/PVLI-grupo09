// import ITEM_ENCYCLOPEDIA from "../objectsAndInventory/infoItems.js";
import RECIPES_LIST from "../objectsAndInventory/recipes.js";

export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "CraftUI"}); // nombre de la escena
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        this.load.image("craftbg", "../assets/images/placeholders/craftbg.jpg");
        this.load.image("square", "../assets/images/placeholders/square.jpg");
        this.load.image("metal", "../assets/images/placeholders/metal.jpg");
        this.load.image("metal_sword", "../assets/images/placeholders/metal_sword.jpg");
        this.load.image("stone_sword", "../assets/images/placeholders/stone_sword.png");
        this.load.image("torch", "../assets/images/placeholders/torch.png");
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let bg = this.add.image(0, 0, "craftbg").setOrigin(0,0);
        bg.setScale(1);
        console.log("owo");
        // const iteminfo = ITEM_ENCYCLOPEDIA[itemId];
        
        let cont = 20;
        console.log(Object.keys(RECIPES_LIST).length);
        for(let i = 0; i < Object.keys(RECIPES_LIST).length; i++) {
            const recipe = RECIPES_LIST.find(slot => slot.number === i);
            if(recipe.unlocked) {
                // que se renderice
                let square = this.add.image(20, cont, "square").setOrigin(0, 0);
                cont = cont + 30;
                
            }
        }
    }

    preUpdate(time, delta) {
        
    }
}