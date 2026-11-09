/*
Clase que maneja la lógica de guardar objetos, no hay estructura de Phaser, 
ya que tiene que funcionar independientemente de en la escena que se utilice
*/

export default class Inventory {
    constructor(conterSlots = 16, ITEM_ENCYCLOPEDIA) {
        this.slots = Array(conterSlots).fill(null); //Cuando el slot de inventario está null es que no hay objetos almacenados en él
        this.ITEM_ENCYCLOPEDIA = ITEM_ENCYCLOPEDIA;
        this.player = null;
        this.blockedSlots = Array(conterSlots).fill(false); //false bloqueado //true libre
    }

    findEmptySlot() { //Encuentra el primer slot vacío
        return this.slots.findIndex((slot,i) => slot === null&&!this.blockedSlots[i]); //findIndex: función de javascript que busca el índice del array, si no lo encuentra devuelve -1
    }

    /*
    Añadir un objeto al inventario, si no hay más objetos con el mismo id en el inventario lo pone en el primer slot vacío y si sí está
    comprueba el slot, si el slot está lleno debe guardarlo en otro
    */
    addItemToInventory(itemId) {
        if (!this.ITEM_ENCYCLOPEDIA) {
            console.error("La enciclopedia de items no está cargada");
            return false;
        }

        const iteminfo = this.ITEM_ENCYCLOPEDIA[itemId]; //La enciclopedia contiene la información de los stacks y el id del objeto

        const objectSlot = this.slots.find(slot => slot !== null && slot.id === itemId && iteminfo && iteminfo.stackable && slot.quantity < iteminfo.maxStack);
        if (objectSlot) {
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

    blockInventory()
    {
        //recorre slots y mira si hay objeto o no, si no lo hay, se marca ese slot como libre,añadiendolo al array
        const freeSlot =[];
        for(let i = 0;i<this.slots.length;i++)
        {
             if(this.slots[i] === null&&!this.blockedSlots[i])freeSlot.push(i);
        }
        //coge una posicion random que este libre y lo bloquea
        const rng = freeSlot[Math.floor(Math.random()*freeSlot.length)];
        this.blockedSlots[rng] = true;
        
    }

    unblockInventory()
    {
        for(let i = 0;i<this.blockedSlots.length;i++)
        {
            if(this.blockedSlots[i])this.blockedSlots[i] = false;
        }
    }

    // metodo para obtener todos los items del inventario
    getAllItems(items){
        let index = 0; // indice para el array items
        for (let i = 0; i < this.slots.length; i++){
            if (this.slots[i] !== null) { 
                items[index] = this.slots[i];
                index++;
            }
        }
    }

    removeItem(itemId) {
        let removed= true;
        const index= this.slots.findIndex(slot => slot!==null && slot.id===itemId);
        if (index!==-1) {
            this.slots[index].quantity-=1;
            if (this.slots[index].quantity <= 0) {
                this.slots[index]=null;
            }
        }
        else {
            removed= false;
        }
        return removed;
    }

    // mira si un objeto está en el inventario y devuelve 0 si no está y la cantidad que hay si sí
    checkInventory(itemId) {
        let cont = 0;
        for (const slot of this.slots) {
            if (slot !== null && slot.id === itemId) {
                cont += slot.quantity;
            }
        }
        return cont;
    }

    render(scene, x, y, player) {
        //Guardar datos iniciales
        this.currentScene = scene;
        this.currentX = x;
        this.currentY = y;
        this.player = player;

        if (!this.container) {
            this.container = scene.add.container(x, y);
            this.container.setVisible(this.isVisible);
            this.container.setDepth(1000);
        }

        //Sirve para que se actualice mientras se renderiza el inventario
        this.container.removeAll(true);

        const bg = scene.add.rectangle(0, 0, 425, 425, 0x000000, 1).setOrigin(0);
        this.container.add(bg);

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

            const slotVisual = scene.add.rectangle(posX, posY, slotSize, slotSize,bloqueado? 0x555555:0xffffff, 1).setOrigin(0);
            slotVisual.setInteractive();
            this.container.add(slotVisual); 
            //Si el item existe indicamos su imagen y cantidad
            if (item !== null) {
                const itemIcono = scene.add.image(posX + slotSize / 2, posY + slotSize / 2, item.id);
                itemIcono.setDisplaySize(slotSize * 0.8, slotSize * 0.8).setInteractive();
                this.container.add(itemIcono);

                itemIcono.on("pointerdown", () => {
                    if (this.player) {
                        this.player.equipItemFromInventory(item.id)
                    }
                });

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
            if(bloqueado)
            {
                const pulga = scene.add.image(posX + slotSize / 2, posY + slotSize / 2, 'tick');
                pulga.setDisplaySize(slotSize * 0.8, slotSize * 0.8); 
                this.container.add(pulga);
            }
        }
    }

    showInventory() {
        this.isVisible = !this.isVisible;
        if (this.container) {
            this.container.setVisible(this.isVisible);
            
            // Si el jugador lo abre, volvemos a generar el render con los items actuales (actualizar básicamente)
            if (this.isVisible && this.currentScene) {
                this.render(this.currentScene, this.currentX, this.currentY, this.player);
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