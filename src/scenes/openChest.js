export default class openChest extends Phaser.Scene {
constructor() {
        super({ key: "openChest" });
    }

    create(data) {
        this.input.mouse.disableContextMenu();

        const fullscreenButton = this.add.image(730, 500, 'fullscreen', 0).setOrigin(0, 0).setInteractive().setScale(0.1).setDepth(9999);
        fullscreenButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        
        this.inventory = data.inventory;
        this.chest = data.chest;
        this.close = this.input.keyboard.addKey("Q");

        let bg = this.add.image(0, 0, "storageRoomBg").setOrigin(0, 0);
        bg.setScale(1);

        //Dibujar ambos contenedores por primera vez
        this.refreshUI();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.close)) {
            this.closeUI();
        }
    }

    closeUI() {
        this.scene.resume("main");
        this.scene.stop();
    }


    refreshUI() {
        if (this.chestContainer) this.chestContainer.destroy();
        if (this.invContainer) this.invContainer.destroy();
        
        //Se le pasa una función callback que se ejecutará al hacer clic en un slot del cofre
        this.chestContainer = this.chest.renderUI(this, 20, 60, (slotIndex) => {
            const moved = this.chest.removeItemFromChest(slotIndex, this.inventory);
            if (moved) this.refreshUI();
        });

        //Se le pasa una función callback que se ejecutará al hacer clic en un slot del inventario
         this.invContainer = this.inventory.renderUI(this, 440, 60, (slotIndex) => {
            const moved = this.chest.addItemFromInventory(slotIndex, this.inventory);
            if (moved) this.refreshUI();
        });
    }
}