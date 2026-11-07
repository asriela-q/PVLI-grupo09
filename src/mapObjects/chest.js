import Item from "../objectsAndInventory/items.js";

export default class Chest extends Phaser.GameObjects.Sprite {

    // un "enum" con los distintos tiers posibles
    /* usarlo en otro sitio, aqui no
    CHEST_TIERS = {
        WOODEN: 'WOODEN', // tier mas baja
        IRON: 'IRON', // tier media
        AURA: 'AURA' // tier mas alta
    };*/

    constructor(scene, x, y, texture, tier, itemGroup){
        super(scene, x, y, texture);
        this.scene.add.existing(this); 

        this.chestTier = tier; // variable que guarda la tier del constructor
        this.chestInfo = scene.cache.json.get("infoChest"); // cargamos el json
        this.ITEM_ENCYCLOPEDIA = scene.cache.json.get("infoItems");
        this.group = itemGroup;

        // variables q controlan el rango de items q pden salir del cofre (a excepcion de las armas/armaduras y key items)
        this.minItems = 2; // mínimo de items q pden salir de el cofre
        this.maxItems = 5; // maximo de items q salen del cofre
    }

    // se llama al pulsar la tecla F
    interact(){
        this.getRandomItem();
    }

    // método que selecciona un objeto aleatorio (mediante probabilidad) de los posibles a salir
    getRandomItem(){
        // obtenemos la información el json específica de la tier de este cofre
        const tierData = this.chestInfo["tier_" + this.chestTier];

        // comprobamos que existe la tier, si no devolvemos un null
        if (!tierData) {
            console.warn(this.chestTier + " is an invalid tier & couldn't be found in infoChest.json");
            return null;
        }

        const rng = Math.random() * 100; // num entre 0 y 100 (no incluye el 100)
        let chance = 0;
        const itemRanks = [tierData.common, tierData.uncommon, tierData.rare]; // creamos un array con todos los rangos de objetos

        // si las probabilidades no suman 100, devuelve null (están mal puestas)
        if (this.outOfRange(itemRanks)) {
            console.warn("Item probabilities don't add to 100, please check infoChest.json");
            return null;
        }

        for (let i = 0; i < itemRanks.length; i++){
            // aquí comprobamos en qué categoría se encuentra el item
            chance += itemRanks[i].probability;
            if (rng < chance) return this.spawnItem(Phaser.Utils.Array.GetRandom(itemRanks[i].items));
        }

    }

    // hace aparecer el objeto seleccionado en getRandomItem()
    spawnItem(item){
        let nItems = 1; // valor para los items q son armas/armaduras/key items cualquier cosa menos un resource vamos
        if (this.ITEM_ENCYCLOPEDIA[item].type == "resource"){
            const r = Math.random() * (this.maxItems - this.minItems + 1) + this.minItems; // num entre minItems y maxItems + 1
            nItems = Math.floor(r); // cogemos el entero redondeando hacia abajo
        }

        for (let i = 0; i < nItems; i++)
            this.group.add(new Item(this.scene, this.x, this.y, this.ITEM_ENCYCLOPEDIA[item].texture, item, this.ITEM_ENCYCLOPEDIA).setScale(0.15));
        
        //console.log(this.scene + this.x + this.y + this.ITEM_ENCYCLOPEDIA[item].texture + item + this.ITEM_ENCYCLOPEDIA);
        this.destroy(this);
    }

    // método auxiliar para comprobar si las probabilidades estan correctas (suman exactamente 100)
    outOfRange(pArray){
        let add = 0;
        for (let i = 0; i < pArray.length; i++){
            add += pArray[i].probability;
            if (add == 100) return false;
        }
        return true; // si sale del for, add != 100 por lo q devolvemos true
    }
}
