import Inventory from "../../objectsAndInventory/inventory.js"

export default class storageRoom extends Inventory {
    constructor(conterSlots = 8, ITEM_ENCYCLOPEDIA, texture) {
        super(conterSlots, ITEM_ENCYCLOPEDIA);
        this.maxSlots = conterSlots;
        this.level = 1;
    }

    addItemFromInventory(inventorySlotIndex, inv){
        const invItem = inv.slots[inventorySlotIndex];
        const itemInfo = this.ITEM_ENCYCLOPEDIA[invItem.id];
        const maxStack = itemInfo.stackable ? (itemInfo.maxStack || 30) : 1;
        let remaining = invItem.quantity;

        // El item es apilable
        if (itemInfo.stackable) {
            for (let i = 0; i < this.slots.length && remaining > 0; i++) {
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
                hasSpace = false;
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
            return true;
        }

        return false;
    }

    removeItemFromChest(chestSlotIndex, inv) {
        const chestItem = this.slots[chestSlotIndex];
        if (!chestItem) return false;

        const amountTransferred = inv.addItemFromChest(chestItem);
        if (amountTransferred > 0) {
            chestItem.quantity -= amountTransferred;
            if (chestItem.quantity <= 0) {
                this.slots[chestSlotIndex] = null;
            }
            return true;
        }
        return false;
    }

    //Métodos para actualizar el cofre cuando se suba de nivel la sala:

    //Aumenta el tamaño del array
    upgradeCapacity(newSlotsCount) {
        if (newSlotsCount > this.maxSlots) {
            const extraSlots = Array(newSlotsCount - this.maxSlots).fill(null);
            this.slots = this.slots.concat(extraSlots); //concat sirve para unir dos arrays
            this.maxSlots = newSlotsCount;
        }
    }
    //Asocia cada tamaño del array al nivel
    upgradeChest() {
        this.level += 1;
        if(this.level === 2) {
            this.upgradeCapacity(16);
        }
        else if (this.level === 3) {
            this.upgradeCapacity(24);
        }
    }
}