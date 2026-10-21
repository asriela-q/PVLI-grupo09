import Psy from "../player/playerManager.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Item from "../objectsAndInventory/items.js";
import Camera from "../player/camera.js";
import Craft from "../objectsAndInventory/craft.js";

export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "main"}); // nombre de la escena
        this.psyInventory = new Inventory();
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        this.load.image("psy", "./assets/images/placeholders/psy.jpg");
        this.load.image("wood", "./assets/images/placeholders/Wood.jpg");
        this.load.image("bggame", "./assets/images/placeholders/bggame.jpg");
        this.load.image("craft", "./assets/images/placeholders/craft.jpg");
        this.load.image("coal", "../assets/images/placeholders/coal.jpg");
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let bggame = this.add.image(0, 0, "bggame").setOrigin(0,0);
        bggame.setScale(2.5);
        let player = new Psy(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "psy", this.psyInventory);
        player.setScale(0.3);
        console.log(this.psyInventory);
        let craftingTable = this.add.image(200, 400, "craft").setOrigin(0 ,0).setInteractive();
        craftingTable.setScale(0.3);
        craftingTable.on("pointerdown", ()=>this.scene.start("CraftUI", { inventory: this.psyInventory }));

        // let craftingTable = new Craft(this, 0, this.sys.game.canvas.height * 0.5, "craft", this.psyInventory).setInteractive();

        let staminaBar = player.staminaBar;

        //Grupo de Phaser para gestionar las físicas de todos los objetos al mismo tiempo
        this.itemsGroup = this.physics.add.group({
            allowGravity: false
        });

        //Grupo de Phaser para gestionar las físicas de los enemigos
        this.enemiesGroup = this.physics.add.group({
            allowGravity: false
        });

        //coger las dimensiones que ocupa el juego 
        let width=this.sys.game.config.width;
        let height=this.sys.game.config.heigth;

        //llamada a la función que organiza todo de la cámara
        Camera.followPl(this,player,0.5,0.5,width,height);
        
        //Creación de objetos
        this.itemsGroup.add(new Item(this, 10, 10, "wood", "wood").setScale(0.15));
        this.itemsGroup.add(new Item(this, 55, 55, "wood", "wood").setScale(0.15));
        this.itemsGroup.add(new Item(this, 100, 100, "coal", "coal").setScale(0.15));

        //new Item(this, 10, 10, "wood", "wood").setScale(0.15)
        //Mira si el jugador ha colisionado con un objeto
        this.physics.add.overlap(player, this.itemsGroup, player.collectItem, null, player); //Null: callback 
        // this.physics.add.overlap(player, craftingTable, craftingTable.activateCrafting, null, player);  // esto no va uwu
    }
}