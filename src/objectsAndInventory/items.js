export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, itemId, ITEM_ENCYCLOPEDIA) {
        super(scene, x, y, texture);
        this.itemId = itemId;
        //this.iteminfo = ITEM_ENCYCLOPEDIA[this.itemId];
        if (ITEM_ENCYCLOPEDIA && ITEM_ENCYCLOPEDIA[this.itemId]) {
            this.iteminfo = ITEM_ENCYCLOPEDIA[this.itemId];
        } else {
            console.error(`No se pudo encontrar la información para el item: ${this.itemId}`);
            this.iteminfo = { name: "Desconocido", stackable: false, type: "error" };
        }

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

}