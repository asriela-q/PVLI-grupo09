/*
Clase que modifica el UI del jugador (estamina, hambre, etc).
*/
import Psy from "../player/playerManager.js";

export default class StatsBar extends Phaser.GameObjects.Rectangle{
    constructor(scene, x, y){
        super(scene, x, y, 50, 8, 0x56F85400) 
        this.setOrigin(0, 0.5);
        scene.add.existing(this) 

        this.originalWidth = 50; 
    }

    preUpdate(t, dt){ 
        
    }

    // método que modifica la barra de estamina según la restante
   updateStamina(currentStamina, maxHealth) 
   {
        let size = Math.max(0, currentHealth / maxHealth);
        this.setSize(this.originalWidth * size, this.height);
   }
}