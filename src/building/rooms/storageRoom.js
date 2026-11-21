export default class storageRoom {
    constructor(conterSlots = 6, ITEM_ENCYCLOPEDIA) {
        this.maxSlots = conterSlots;
        this.slots = Array(conterSlots).fill(null); //Cuando el slot de inventario está null es que no hay objetos almacenados en él
        this.ITEM_ENCYCLOPEDIA = ITEM_ENCYCLOPEDIA;
        this.player = null;
        this.level = 1;
        this.isVisible = false;
    }

    findEmptySlot() { //Encuentra el primer slot vacío
        return this.slots.findIndex((slot,i) => slot === null&&!this.blockedSlots[i]); //findIndex: función de javascript que busca el índice del array, si no lo encuentra devuelve -1
    }

    addItemFromInventory(inventorySlotIndex){
        if(!this.player || this.player.inventory) return;
        
        const inventory = this.player.inventory;
        const item = inventory.slots[inventorySlotIndex];
        const itemInfo = this.ITEM_ENCYCLOPEDIA[item];

        const maxStack = itemInfo.stackable ? (itemInfo.maxStack || 30) : 1;
        let remaining = invItem.quantity;

        // El item es apilable
        if (itemInfo.stackable) {
            for (let i = 0; i < this.slots.length; i++) {
                const slot = this.slots[i];

                if (slot !== null && !this.blockedSlots[i] && slot.id === invItem.id && slot.quantity < maxStack) {
                    const spaceAvailable = maxStack - slot.quantity;
                    const amountToAdd = Math.min(remaining, spaceAvailable);

                    slot.quantity += amountToAdd;
                    remaining -= amountToAdd;
                }
            }
        }

        let hasSpace = true;
        while (remaining > 0 && hasSpace) {
            const emptySlot = this.findEmptySlot();
            if (emptySlot === -1) {
                hasSpace = false; // Detiene el bucle en la siguiente comprobación
            } else {
                const amountToAdd = Math.min(remaining, maxStack);
                const newItem = { id: invItem.id, quantity: amountToAdd };
                if (invItem.durability !== undefined) {
                    newItem.durability = invItem.durability;
                }

                this.slots[emptySlot] = newItem;
                remaining -= amountToAdd;
            }
        }
        
        const totalTransferred = invItem.quantity - remaining;
        if (totalTransferred > 0) {
            inv.removeItemBySlot(inventorySlotIndex, totalTransferred);
            this.refreshUI();
            return true;
        }

        return false;
    }

    removeItemFromChest(chestSlotIndex) {

    }

    renderChest() {
        container.removeAll(true);

        const bg = scene.add.rectangle(0, 0, 425, 425, 0x000000, 1).setOrigin(0);
        container.add(bg);

        const totalCols = 4; //Columnas totales, luego esto se usa para calcular las filas   
        const slotSize = 100; //Tamaño en píxeles de cada cuadrícula del inventario     
        const separation = 5; //Separación entre cuadrados      

        for (let i = 0; i < this.slots.length; i++) {
            const bloqueado = this.blockedSlots[i];
            //Guardamos cada objeto
            let item = this.slots[i];

            //Calculamos las filas y las columnas de la cuadrícula del inventario
            let col = i % totalCols;
            const row = Math.floor(i / totalCols); //Math.floor: aproxima decimales
            let posX = separation + col * (slotSize + separation);
            let posY = separation + row * (slotSize + separation);

            const slotVisual = scene.add.rectangle(posX, posY, slotSize, slotSize, bloqueado? 0x555555:0xffffff, 1).setOrigin(0);
            slotVisual.setInteractive();
            container.add(slotVisual); 
            //Si el item existe indicamos su imagen y cantidad
            if (item !== null) {
                const itemIcono = scene.add.image(posX + slotSize / 2, posY + slotSize / 2, item.id);
                itemIcono.setDisplaySize(slotSize * 0.8, slotSize * 0.8).setInteractive();
                container.add(itemIcono);

                itemIcono.on("pointerdown", () => {
                    if (player) {
                        player.removeItemFromChest(i);
                    }
                
                });

                if (item.quantity >= 1) {
                    const textoCantidad = scene.add.text(
                        posX + slotSize - 2, 
                        posY + slotSize - 2, 
                        item.quantity.toString(), 
                        { font: '20px Arial', fill: '#000000' }
                    ).setOrigin(1, 1);
                    container.add(textoCantidad);
                }
            }
        }
    }

    upgradeCapacity(newSlotsCount) {
        if (newSlotsCount > this.maxSlots) {
            const extraSlots = Array(newSlotsCount - this.maxSlots).fill(null);
            this.slots = this.slots.concat(extraSlots); //concat para unir dos arrays
            this.maxSlots = newSlotsCount;
        }
    }

    openChest() {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.renderChest();
        }
    }
}