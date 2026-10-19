import Inventory from "../ObjectsAndInventory/Inventory.js";

export default class Psy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, inventory){
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); // Nos añadimos a la escena para ser mostrados
        this.scene.physics.add.existing(this); //Le añadimos físicas al jugador
        this.body.setAllowGravity(false); //Así el jugador no cae por la gravidad de la física

        this.cursors = this.scene.input.keyboard.createCursorKeys(); // Añadimos las flechas al input

        // variables del constructor

        // añadimos las teclas de movimiento
        this.up = this.scene.input.keyboard.addKey('W');
        this.left = this.scene.input.keyboard.addKey('A');
        this.down = this.scene.input.keyboard.addKey('S');
        this.right = this.scene.input.keyboard.addKey('D');
        this.run = this.scene.input.keyboard.addKey('SHIFT');

        this.speed;

    }

    preUpdate(t, dt){
        // lógica de psy
        super.preUpdate(t, dt);

        // movimiento del jugador:
        // movimiento vertical

        if(this.run.isDown) this.speed = 200;
        else this.speed = 100;

        if (this.up.isDown) this.body.setVelocityY(-this.speed);
        else if (this.down.isDown) this.body.setVelocityY(this.speed);
        else this.body.setVelocityY(0);

        // movimiento horizontal
        if (this.right.isDown) this.body.setVelocityX(this.speed);
        else if(this.left.isDown) this.body.setVelocityX(-this.speed);
        else this.body.setVelocityX(0);



        //if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
        // Shoot once on keydown
        //}
    }

    create(){

    }

    collectItem(player, item){ //El atributo del player aunque no se use en el método, a la hora de llamar al método hace falta
        const collected = this.inventory.addItemToInventory(item.itemId);
        if(collected) { //Si se ha podido recolectar el objeto
            console.log("objeto recogido");
            item.destroy(); //Si el jugador recoge el objeto se destruye del mapa
        }
    }
}


