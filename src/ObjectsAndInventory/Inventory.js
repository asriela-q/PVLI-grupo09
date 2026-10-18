/*
Clase que maneja la lógica de guardar objetos, no hay estructura de Phaser, 
ya que tiene que funcionar independientemente de en la escena que se utilice
*/

export default class Inventory {
    constructor(numberSlots = 16) {
        this.slots = Array(numberSlots).fill(null); //Cuando el slot de inventario está null es que no hay objetos almacenados en él
    }

    findEmptySlot() { //Encuentra el primer slot vacío
        return this.slots.findIndex(slot => slot === null); 
    }
}