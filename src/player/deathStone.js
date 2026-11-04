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
        this.destroy();
    }

    // metodo para recoger tus items perdidos
    retrieveItems(){
        for (let i = 0; i < this.onDeathItems.length; i++){
            this.inv.slots[i] = this.onDeathItems[i];
            console.log(this.inv.slots[i]);

        }
    }

    // metodo para llenar la deathStone con los items del jugador
    fillDeath(){
        this.inv.getAllItems(this.onDeathItems); // guardamos el inventario antes de morir
    }

}