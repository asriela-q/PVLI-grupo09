import Psy from "../player/playerManager.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Item from "../objectsAndInventory/items.js";
import Camera from "../player/camera.js";

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
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let bggame = this.add.image(0, 0, "bggame").setOrigin(0,0);
        bggame.setScale(2.5);
        let player = new Psy(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "psy", this.psyInventory).setInteractive();
        player.setScale(0.3);

        //Grupo de Phaser para gestionar las físicas de todos los objetos al mismo tiempo
        this.itemsGroup = this.physics.add.group();

        //coger las dimensiones que ocupa el juego 
        let width=this.sys.game.config.width;
        let height=this.sys.game.config.heigth;

        //llamada a la función que organiza todo de la cámara
        Camera.followPl(this,player,0.5,0.5,width,height);
        

        //Creación de objetos
        this.itemsGroup.add(new Item(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "wood", "wood").setScale(0.15));
        this.itemsGroup.add(new Item(this, this.sys.game.canvas.width * 0.4, this.sys.game.canvas.height * 0.5, "wood", "wood").setScale(0.15));

        //Mira si el jugador ha colisionado con un objeto
        this.physics.add.overlap(player, this.itemsGroup, player.collectItem, null, player); //Null: callback  
    }

}