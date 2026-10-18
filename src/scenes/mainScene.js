import Psy from "../player/playerMovement.js";
import Inventory from "../ObjectsAndInventory/Inventory.js";
import Item from "../ObjectsAndInventory/Items.js";

export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "main"}); // nombre de la escena
        this.psyInventory = new Inventory();
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        this.load.image("psy", "./assets/images/placeholders/psy.jpg");
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let player = new Psy(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "psy", this.myInventory).setInteractive();
        player.setScale(0.3);

        //Grupo de Phaser para gestionar las físicas de todos los objetos al mismo tiempo
        this.itemsGroup = this.physics.add.group();

        //Creación de objetos
        //...

        //Mira si el jugador ha colisionado con un objeto
        this.pshyics.add.overlap(player, this.itemsGroup, player.collectItem, null, this); //Null: callback / This: escena 
    }

}