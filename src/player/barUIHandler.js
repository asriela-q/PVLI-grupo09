/*
Clase que modifica el UI del jugador (estamina, hambre, etc).
*/

export default class StatsBar extends Phaser.GameObjects.Rectangle{
    constructor(scene, x, y, width, height, color){
        super(scene, x, y, width, height, color); 
        this.setOrigin(0, 0);
        scene.add.existing(this);

        this.originalWidth = width;
    }

    // método que modifica la barra de estamina según la restante
    updateStamina(currentStamina, maxStamina)
    {
        let size = Math.max(0, currentStamina / maxStamina);
        this.setSize(this.originalWidth * size, this.height);
    }

    // método que modifica la barra de estamina según la restante
    updateLife(currentLife, maxLife)
    {
        let size = Math.max(0, currentLife / maxLife);
        this.setSize(this.originalWidth * size, this.height);
    }
}