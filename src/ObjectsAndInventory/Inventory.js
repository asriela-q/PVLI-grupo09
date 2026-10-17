/*
Clase que maneja la lógica de guardar objetos, no hay estructura de Phaser, 
ya que tiene que funcionar independientemente de en la escena que se utilice
*/

export default class Inventory {
    constructor(numberSlots = 16) {
        this.slots = Array(numberSlots).fill(null);
    }

    findEmptySlot() {
        return this.slots.findIndex(slot => slot === null);
    }
}