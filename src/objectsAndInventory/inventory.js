/*
Clase que maneja la lógica de guardar objetos, no hay estructura de Phaser, 
ya que tiene que funcionar independientemente de en la escena que se utilice
*/

import ITEM_ENCYCLOPEDIA from "./infoItems.js";

export default class Inventory {
    constructor(conterSlots = 16) {
        this.slots = Array(conterSlots).fill(null); //Cuando el slot de inventario está null es que no hay objetos almacenados en él
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

    removeItem(itemId) {
        const objectSlot = this.slots.find(slot => slot !== null && slot.id === itemId);
        console.log(objectSlot);
        objectSlot.quantity -= 1;
        if (objectSlot.quantity === 0) {
            objectSlot.id = null;
            objectSlot.quantity = null;
        }
    }

    // mira si un objeto está en el inventario y devuelve 0 si no está y la cantidad que hay si sí
    checkInventory(itemId) {
        let cont = 0;
        let found = false;
        let i = 0;
        while(!found && i < this.slots.length) {
            if (this.slots[i].id == itemId) {
                cont = this.slots[i].quantity
                found = true;
            }     
            i++;
        }
        return cont;
    }

    render(scene, x, y) {
        //Guardar datos iniciales
        this.currentScene = scene;
        this.currentX = x;
        this.currentY = y;

        if (!this.container) {
            this.container = scene.add.container(x, y);
            this.container.setVisible(this.isVisible);
        }

        //Sirve para que se actualice mientras se renderiza el inventario
        this.container.removeAll(true);

        const bg = scene.add.rectangle(0, 0, 425, 425, 0x000000, 1).setOrigin(0);
        this.container.add(bg);

        const totalCols = 4; //Columnas totales, luego esto se usa para calcular las filas   
        const slotSize = 100; //Tamaño en píxeles de cada cuadrícula del inventario     
        const separation = 5; //Separación entre cuadrados      

        for(let i = 0; i < this.slots.length; i++) {
            //Guardamos cada objeto
            let item = this.slots[i];

            //Calculamos las filas y las columnas de la cuadrícula del inventario
            let col = i % totalCols;
            const row = Math.floor(i / totalCols); //Math.floor: aproxima decimales
            let posX = separation + col * (slotSize + separation);
            let posY = separation + row * (slotSize + separation);

            const slotVisual = scene.add.rectangle(posX, posY, slotSize, slotSize, 0xffffff, 1).setOrigin(0);
            this.container.add(slotVisual); 
            //Si el item existe indicamos su imagen y cantidad
            if (item !== null) {
                const itemIcono = scene.add.image(posX + slotSize / 2, posY + slotSize / 2, item.id);
                itemIcono.setDisplaySize(slotSize * 0.8, slotSize * 0.8);
                this.container.add(itemIcono);

                if (item.quantity >= 1) {
                    const textoCantidad = scene.add.text(
                        posX + slotSize - 2, 
                        posY + slotSize - 2, 
                        item.quantity.toString(), 
                        { font: '20px Arial', fill: '#000000' }
                    ).setOrigin(1, 1);
                    this.container.add(textoCantidad);
                }
            }
        }
    }

    showInventory() {
        this.isVisible = !this.isVisible;
        if (this.container) {
            this.container.setVisible(this.isVisible);
            
            // Si el jugador lo abre, volvemos a generar el render con los items actuales (actualizar básicamente)
            if (this.isVisible && this.currentScene) {
                this.render(this.currentScene, this.currentX, this.currentY);
            }
        }
    }

    /*
    Método que hace que el inventario siga al objeto del cual es contenedor
    */
    updatePosition(x, y) {
        this.currentX = x;
        this.currentY = y;
        if (this.container) {
            this.container.x = x;
            this.container.y = y;
        }
    }
}