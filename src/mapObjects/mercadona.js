export default class Mercadona extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene.add.existing(this);

        this.productInfo = this.scene.cache.json.get("infoProducts"); 
        this.ITEM_ENCYCLOPEDIA = this.scene.cache.json.get("infoItems");

        this.container = this.scene.add.container(0, 0).setVisible(false).setDepth(1000).setScrollFactor(0);

        this.isSelectingItem = false; //Para saber si está o no abierto el UI
        this.close = this.scene.input.keyboard.addKey("Q");

        this.productosAExhibir = [];
        this.interactiveProducts = [];
        this.yaHaComprado = false;
        this.refreshProducts();
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.isSelectingItem && Phaser.Input.Keyboard.JustDown(this.close)) this.closeUI();
    }

    interact() {
        if (!this.isSelectingItem) {
            this.isSelectingItem = true;
            this.showUI();
        }
    }

    /*
    Método que toma dos objetos aleatorios del json de productos
    */
    getRandomItems() {
        const rng = Math.random() * 100; // num entre 0 y 100 (no incluye el 100)
        let chance = 0;
        const itemRanks = [this.productInfo.common, this.productInfo.uncommon];

        //Si las probabilidades no suman 100, devuelve null (están mal puestas)
        if (this.outOfRange(itemRanks)) {
            console.warn("Item probabilities don't add to 100, please check infoProducts.json");
            return null;
        }

        for (let i = 0; i < itemRanks.length; i++){
            //Aquí comprobamos en qué categoría se encuentra el item
            chance += itemRanks[i].probability;
            if (rng < chance) return Phaser.Utils.Array.GetRandom(itemRanks[i].items);
        }
    }

    outOfRange(pArray){
        let add = 0;
        for (let i = 0; i < pArray.length; i++){
            add += pArray[i].probability;
            if (add == 100) return false;
        }
        return true; // si sale del for, add != 100 por lo q devolvemos true
    }

    refreshProducts() {
        this.yaHaComprado = false;
        this.productosAExhibir = [];
        while (this.productosAExhibir.length < 2) {
            const itemSeleccionado = this.getRandomItems();
            if (itemSeleccionado) {
                if (!this.productosAExhibir.includes(itemSeleccionado)) {
                    //El producto se añade solo si no estaba ya antes
                    this.productosAExhibir.push(itemSeleccionado);
                }
            }
        }
    }

    showUI() {
        this.isSelectingItem = true;
        this.container.removeAll(true);
        this.scene.metodoCicloDia.pause();
        this.scene.freezeScene = true;
        this.interactiveProducts = [];

        if(!this.ITEM_ENCYCLOPEDIA) this.ITEM_ENCYCLOPEDIA = this.scene.cache.json.get("infoItems");
        if(!this.productInfo) this.productInfo = this.scene.cache.json.get("infoProducts");

        let diasRestantes = 3 - (this.scene.dayCounter % 3);
        
        const xPos = (this.scene.sys.game.config.width - 800) / 2;
        const yPos = (this.scene.sys.game.config.height - 500) / 2;

        const bg = this.scene.add.rectangle(xPos, yPos, 800, 500, 0x000000, 1).setOrigin(0).setAlpha(0.5).setScrollFactor(0);
        this.container.add(bg);

        let textoContador = this.scene.add.text(
            xPos + 400, 
            yPos + 40, 
            `Next products will come in ${diasRestantes} ${diasRestantes === 1 ? 'day' : 'days'}`, 
            { font: "35px Arial", fill: "#ffffff" }
        ).setOrigin(0.5).setScrollFactor(0);
        this.container.add(textoContador);
       
        for (let i = 0; i < this.productosAExhibir.length; i++)
        {
            let itemId = this.productosAExhibir[i];
            let productoX = xPos + 250 + (i * 300);
            let productoY = yPos + 200;

            if (this.ITEM_ENCYCLOPEDIA && this.ITEM_ENCYCLOPEDIA[itemId]) {
                let itemImage = this.scene.add.image(productoX, productoY, this.ITEM_ENCYCLOPEDIA[itemId].texture).setScale(0.25).setScrollFactor(0);
                this.container.add(itemImage);
                itemImage.setInteractive();
                this.interactiveProducts.push(itemImage);
                itemImage.on("pointerdown", () => {
                    if (!this.yaHaComprado) {
                        this.buy(itemId);
                        console.log("Producto comprado");
                    }
                });
            }
        }

        this.container.setVisible(true);
        this.scene.physics.world.pause();
    }

    closeUI() {
        if (this.isSelectingItem) {
            this.isSelectingItem = false; 
            this.container.setVisible(false);
            this.scene.metodoCicloDia.resume();
            this.scene.freezeScene = false;
            this.scene.physics.world.resume(); 
        }
    }

    /*
    Método que añade el objeto comprado al inventario
    */
    buy(itemId) {
        const playerInventory = this.scene.psyInventory;
        if (playerInventory) {
            if (playerInventory.addItemToInventory(itemId)) {
                this.yaHaComprado = true;
                for (let i = 0; i < this.interactiveProducts.length; i++) {
                    this.interactiveProducts[i].disableInteractive().setAlpha(0.5);
                }
                this.interactiveProducts = [];
            }
            else {
                this.textoAviso.setText("Your inventory is full");
            }
        }
    }
}