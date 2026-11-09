/*
Clase que modifica el UI del jugador (estamina, hambre, etc).
*/

export default class StatsBar extends Phaser.GameObjects.Rectangle{
    constructor(scene, x, y, width, height, color,vertical=false){
        super(scene, x, y, width, height, color); 
        this.setOrigin(0, 0);
        scene.add.existing(this);

        this.originalWidth = width;
        this.originalHeight= height;
        this.setOrigin(0,vertical ? 1:0);
        this.vertical=vertical;
    }

    // método que modifica una barra del UI, entran el valor actual y el máximo para representar el valor restante que entra
    updateBar(current, max)
    {
        let size = Math.max(0, current / max);
         //const size = Phaser.Math.Clamp(current / max, 0, 1);
        if(!this.vertical)
        this.setSize(this.originalWidth * size, this.height);
        else 
        this.setSize(this.originalWidth, this.originalHeight* size);
        
    }
}