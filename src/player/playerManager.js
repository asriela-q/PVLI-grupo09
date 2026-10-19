/*
Clase que maneja todo lo relacionado con el jugador, desde el movimiento hasta los atributos como
sueño, hambre, estamina, etc.
*/

import Inventory from "../objectsAndInventory/inventory.js";

// velocidad:
const RUN_SPEED = 250; // velocidad al correr
const WALK_SPEED = 100; // velocidad al caminar

// estamina:
const STAMINA = 3; // en segundos
const RUN_THRESHOLD = STAMINA * 0.25; // requerimiento mínimo de estamina para poder volver a correr
const RECOVERY_CD = 1; // cooldown para la recuperación de estamina, para que el jugador no pueda correr infinitamente


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

        this.speed; // velocidad del player
        this.currentStamina = STAMINA; // estamina restante del jugador
        this.modCd = RECOVERY_CD; // variable modificable del cooldown

    }

    // método que gestiona las acciones del jugador mediante el input del usuario
    walkHandler(){
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
        // comprobamos si se suelta la tecla de correr
        const cd = Phaser.Input.Keyboard.JustUp(this.run);
        // cuando termina de correr, empieza este cooldown y mientras sea > 0 el jugador no podrá volver a correr
        if (cd || (this.modCd != RECOVERY_CD && this.modCd > 0)) {
            this.speed = WALK_SPEED; // hacemos que deje de correr
            this.modCd -= dt / 1000; // empezamos el cooldown
            console.log("Cooldown: " + this.modCd);
        }
        else {
            if (this.modCd < 0) this.modCd = RECOVERY_CD; // reset del cooldown

            // manejo de la estamina
            if (this.run.isDown && this.currentStamina > 0) { // si esta la tecla pulsada y tiene estamina, corre
                this.speed = RUN_SPEED;
                this.currentStamina -= dt / 1000; // restamos la stamina mientras corremos
                if (this.currentStamina < 0) this.speed = WALK_SPEED; // si llega a 0 en este frame, ponemos la walk speed (ya que no vuelve a entrar en este if)
            }
            else {
                this.speed = WALK_SPEED;
                if (this.currentStamina < STAMINA) this.currentStamina += dt / 1000;
            }
            console.log("Current stamina: " + this.currentStamina);

        }
    }

    preUpdate(t, dt){
        // lógica de psy
        super.preUpdate(t, dt);

        // movimiento del jugador:
        this.walkHandler();
        this.staminaManager(dt);


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


