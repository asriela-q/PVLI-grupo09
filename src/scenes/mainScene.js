import Psy from "../player/playerManager.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Item from "../objectsAndInventory/items.js";
import Camera from "../player/camera.js";
import Craft from "../objectsAndInventory/craft.js";
import Enemy from "../enemy/enemy.js";
import Patrol from "../enemy/patrol.js";


export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "main"}); // nombre de la escena
        this.psyInventory = new Inventory();
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let ITEM_ENCYCLOPEDIA = this.cache.json.get("infoItems");
        this.psyInventory.ITEM_ENCYCLOPEDIA = ITEM_ENCYCLOPEDIA;

        let bggame = this.add.image(0, 0, "bggame").setOrigin(0,0);
        bggame.setScale(2.5);
        let player = new Psy(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "psy", this.psyInventory);
        player.setScale(0.7);
        console.log(this.psyInventory);
        let craftingTable = new Craft(this, 200, 400, "craft", this.psyInventory).setOrigin(0, 0).setScale(0.3).setInteractive();
        craftingTable.on("pointerdown", () => craftingTable.activateCrafting());

        // let craftingTable = new Craft(this, 0, this.sys.game.canvas.height * 0.5, "craft", this.psyInventory).setInteractive();

        let staminaBar = player.staminaBar;

        let enemy =new Enemy(this, this.sys.game.canvas.width * 0.7, this.sys.game.canvas.height * 0.7, "enemy",150,20,5,1000,900,player);
        enemy.setScale(0.5);
        
        //Grupo de Phaser para gestionar las físicas de todos los objetos al mismo tiempo
        this.itemsGroup = this.physics.add.group({
            allowGravity: false
        });
        
        //Grupo de Phaser para gestionar las físicas de los enemigos
        this.enemiesGroup = this.physics.add.group({
            allowGravity: false,
        });
        this.enemiesGroup.add(enemy);
        
        //coger las dimensiones que ocupa el juego 
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;

        //llamada a la función que organiza todo de la cámara
        Camera.followPl(this,player,0.5,0.5,width,height);
        
        //Creación de objetos
        this.itemsGroup.add(new Item(this, 10, 10, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 55, 55, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 100, 100, "coal", "coal", ITEM_ENCYCLOPEDIA).setScale(0.15));

        //new Item(this, 10, 10, "wood", "wood").setScale(0.15)
        //Mira si el jugador ha colisionado con un objeto
        this.physics.add.overlap(player, this.itemsGroup, player.collectItem, null, player); //Null: callback 
        //this.physics.add.collider(player,this.enemiesGroup);
        //mira si el jugador ha colisionado con un enemigo y le resta vida al jugador,collider para que los dos no se transpasen
        this.physics.add.overlap(player, this.enemiesGroup, (player, enemy) => {
        if (enemy.canAttack()) {
        player.takeDamage(enemy.damage);}});
        enemy.status=new Patrol(enemy,50);
        // this.physics.add.overlap(player, craftingTable, craftingTable.activateCrafting, null, player);  // esto no va uwu
    }


}