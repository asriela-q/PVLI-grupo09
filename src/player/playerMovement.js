import Inventory from "../ObjectsAndInventory/Inventory.js";

export default class Psy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, inventory){
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); // Nos añadimos a la escena para ser mostrados
        this.scene.physics.add.existing(this); //Le añadimos físicas al jugador
        this.body.setAllowGravity(false); //Así el jugador no cae por la gravidad de la física

    }

    preUpdate(t, dt){
        // lógica de psy
        super.preUpdate(t, dt);
    }

    create(){

    }

    collectItem(player, item){ //El atributo del player aunque no se use en el método, a la hora de llamar al método hace falta
        const colledted = this.inventory.addItemToInventory(item.itemId);
        if(colledted) { //Si se ha podido recolectar el objeto
            item.destroy(); //Si el jugador recoge el objeto se destruye del mapa
        }
    }
}


