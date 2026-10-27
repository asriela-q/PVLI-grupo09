export default class Chest extends Phaser.GameObjects.Sprite {

    // un "enum" con los distintos tiers posibles
    CHEST_TIERS = {
        WOODEN: 'WOODEN', // tier mas baja
        IRON: 'IRON', // tier media
        AURA: 'AURA' // tier mas alta
    };

    // que necesito para ponerlo en escena?: escena, pos, textura, 
    constructor(scene, x, y, texture, tier){
        super(scene, x, y, texture, tier);


    }

    create(){
        const CHEST_ITEM_INFO = this.cache.json.get("infoChest"); // cargamos el json
    }

    // método que selecciona un objeto aleatorio (mediante probabilidad) de los posibles a salir
    getRandomItem(){

    }

    // hace aparecer el objeto seleccionado en getRandomItem()
    spawnItem(item){

    }


} 
