import Item from "../objectsAndInventory/items.js"

export default class resourceObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, itemGroup, requiredTool, itemDropId, hits = 3){
        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.group = itemGroup;
        this.itemDropId = itemDropId;
        this.requiredTool = requiredTool;
        this.hits = hits;
    }

    hit(toolType) {
        if (toolType !== this.requiredTool || this.hits <= 0 || !this.active) return;
        this.hits--;
        if (this.body) {
            this.body.enable = false;
        }

        if (this.hits > 0) {
            this.scene.time.delayedCall(200, () => {
                if (this.body) this.body.enable = true;
            });
        }
        else {
            this.dropItem();
        }

        return true;
    }

    dropItem() {
        let ITEM_ENCYCLOPEDIA = this.scene.cache.json.get("infoItems");

        let cantidadDrops = Phaser.Math.Between(1, 3);
        if (this.scene.doubleDropChance > 0 && Math.random() < this.scene.doubleDropChance) {
            cantidadDrops *= 2;
        }

        for (let i = 0; i < cantidadDrops; i++) {
            //Esto es para que las piedras no aparezcan todas juntas cuando se dropean
            let offsetX = Phaser.Math.Between(-100, 100);
            let offsetY = Phaser.Math.Between(-100, 100);

            let droppedItem = new Item(this.scene, this.x + offsetX, this.y + offsetY, this.itemDropId, this.itemDropId, ITEM_ENCYCLOPEDIA).setScale(0.15);

            this.group.add(droppedItem);
        }

        this.destroy();
    }
}