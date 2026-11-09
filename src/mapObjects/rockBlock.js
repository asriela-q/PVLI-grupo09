import Item from "../objectsAndInventory/items.js"

export default class rockBlock extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, itemGroup){
        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.group = itemGroup;
        this.itemDropId = "stone";
        this.hits = 3;
    }

    mine() {
        if (this.hits <= 0 || !this.active) return;
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
            this.dropStone();
        }
    }

    dropStone() {
        let ITEM_ENCYCLOPEDIA = this.scene.cache.json.get("infoItems");

        let cantidadDrops = Phaser.Math.Between(1, 3);
        if (this.scene.doubleDropChance > 0 && Math.random() < this.scene.doubleDropChance) {
            cantidadDrops *= 2;
        }

        for (let i = 0; i < cantidadDrops; i++) {
            //Esto es para que las piedras no aparezcan todas juntas cuando se dropean
            let offsetX = Phaser.Math.Between(-50, 50);
            let offsetY = Phaser.Math.Between(-50, 50);

            let droppedStone = new Item(this.scene, this.x + offsetX, this.y + offsetY, this.itemDropId, this.itemDropId, ITEM_ENCYCLOPEDIA).setScale(0.15);

            this.group.add(droppedStone);
        }

        this.destroy();
    }
}