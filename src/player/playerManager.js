/*
Clase que maneja todo lo relacionado con el jugador, desde el movimiento hasta los atributos como
sueño, hambre, estamina, etc.
*/


import Inventory from "../objectsAndInventory/inventory.js";

export default class Psy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, inventory){
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); // Nos añadimos a la escena para ser mostrados
        this.scene.physics.add.existing(this); //Le añadimos físicas al jugador
        this.body.setAllowGravity(false); //Así el jugador no cae por la gravidad de la física

        this.cursors = this.scene.input.keyboard.createCursorKeys(); // Añadimos las flechas al input

        // variables del constructor

        // movimiento:
        // añadimos las teclas de movimiento
        this.up = this.scene.input.keyboard.addKey('W');
        this.left = this.scene.input.keyboard.addKey('A');
        this.down = this.scene.input.keyboard.addKey('S');
        this.right = this.scene.input.keyboard.addKey('D');
        this.run = this.scene.input.keyboard.addKey('SHIFT');

        this.speed;

        // atributos:
        this.maxStamina = 3; // en segundos
        this.currentStamina = this.maxStamina;
        this.runThreshold = this.maxStamina * 0.25; // requerimiento mínimo de estamina para poder volver a correr
        this.runCd = 2; // cooldown cuando tu stamina llega por debajo de el threshold
        this.recoveryCd = 1; // cooldown para la recuperación de estamina, para que el jugador no pueda correr infinitamente

        this.lastFrame; // guarda una acción que se realizó en el frame anterior

    }

    // método que gestiona las acciones del jugador mediante el input del usuario
    inputHandler(){
        // movimiento vertical
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

    // método que gestiona la estamina
    staminaManager(dt){

        

        // manejo de la estamina
        if (this.run.isDown && this.currentStamina > 0) { // si esta la tecla pulsada y la estamina es > 0
            this.speed = 200;
            this.currentStamina -= dt / 1000; // restamos la stamina mientras corremos
        }
        else {
            this.speed = 100;
            if (this.currentStamina < this.maxStamina) this.currentStamina += dt / 1000;
        }

        console.log(this.currentStamina, this.maxStamina);
    }

    preUpdate(t, dt){
        // lógica de psy
        super.preUpdate(t, dt);

        // movimiento del jugador:
        this.staminaManager(dt);
        this.inputHandler();

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


