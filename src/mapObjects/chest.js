export default class Chest extends Phaser.GameObjects.Sprite {

    // que necesito para ponerlo en escena?: escena, pos, textura, 
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        // chest tier
        this.tier = 1;

    }

    // método que selecciona un objeto aleatorio (mediante probabilidad) de los posibles a salir
    getRandomItem(){

    }

    // hace aparecer el objeto seleccionado en getRandomItem()
    spawnItem(item){

    }


} 
