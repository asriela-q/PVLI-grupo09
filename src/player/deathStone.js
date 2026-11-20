export default class DeathStone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory) {
        super(scene, x, y, texture);
        
        this.inv = inventory; // inventario del psy
        this.onDeathItems = [ ]; // items al morir

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }

    // metodo q se llama al pulsar la tecla F
    interact(){
        this.retrieveItems();
        // if(this.onDeathItems.length===0)this.destroy();
        this.destroy();
    }

    // metodo para recoger tus items perdidos
    retrieveItems(){
        //const sobrantes = [];            
        for (let i = 0; i < this.onDeathItems.length; i++){
            const slotLibre = this.inv.findEmptySlot(); 
            if (slotLibre !== -1) this.inv.slots[slotLibre] = this.onDeathItems[i];
            //else sobrantes.push(this.onDeathItems[i]);
            //this.inv.slots[i] = this.onDeathItems[i];
            console.log(this.inv.slots[i]);
        }
        //this.onDeathItems = sobrantes

    }

    // metodo para llenar la deathStone con los items del jugador
    fillDeath(){
        this.inv.getAllItems(this.onDeathItems); // guardamos el inventario antes de morir
    }

}