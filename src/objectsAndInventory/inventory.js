/*
Clase que maneja la lógica de guardar objetos, no hay estructura de Phaser, 
ya que tiene que funcionar independientemente de en la escena que se utilice
*/

import ITEM_ENCYCLOPEDIA from "./infoItems.js";

export default class Inventory {
    constructor(numberSlots = 16) {
        this.slots = Array(numberSlots).fill(null); //Cuando el slot de inventario está null es que no hay objetos almacenados en él
    }

    findEmptySlot() { //Encuentra el primer slot vacío
        return this.slots.findIndex(slot => slot === null); //findIndex: función de javascript que busca el índice del array, si no lo encuentra devuelve -1
    }

    /*
    Añadir un objeto al inventario, si no hay más objetos con el mismo id en el inventario lo pone en el primer slot vacío y si sí está
    comprueba el slot, si el slot está lleno debe guardarlo en otro
    */
    addItemToInventory(itemId) {
        const iteminfo = ITEM_ENCYCLOPEDIA[itemId]; //La enciclopedia contiene la información de los stacks y el id del objeto

        const objectSlot = this.slots.find(slot => slot !== null && slot.id === itemId); //array.find: función de javascript que devuelve la casilla del array que cumpla las condiciones
        if(objectSlot && iteminfo && iteminfo.stackable && objectSlot.quantity < iteminfo.maxStack) { //Comprobamos si el objeto existe y si se puede apilar 
            objectSlot.quantity += 1;
            return true;
        }

        const emptySlot = this.findEmptySlot();
        if(emptySlot !== -1) { //Se ha encontrado un slot vacío
            this.slots[emptySlot] = {id: itemId, quantity: 1};
            return true;
        }

        return false; //No se pudo añadir el objeto de ninguna manera, el inventario está lleno
    }

    // mira si un objeto está en el inventario y devuelve 0 si no está y la cantidad que hay si sí
    checkInventory(itemId) {
        let numb = 0;
        let found = false;
        let i = 0;
        while(!found && i < this.slots.length) {
            if (this.slots[i].id == itemId) {
                numb = this.slots[i].quantity
                found = true;
            }     
            i++;
        }
        return numb;
    }
}