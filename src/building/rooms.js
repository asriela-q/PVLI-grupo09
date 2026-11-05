var ROOMS_LIST = [
    {  
        room: 'workshop',  // nombre de la sala
        number: 0,  // número de sala en la lista de salas (solo sirve para la lógica del juego)
        unlocked: true,  // si se ha desbloqueado la receta
        activeLevel: 0,  // nivel actual de la sala (0 = sin construir, 1 = nivel 1, 2 = nivel 2)
        craftable: false,  // si se puede craftear actualmente con los items del inventario
        numIngredients: 2,  // el número de items que requiere su crafteo
        ing1: 'metal',  // item 1
        quant1: 6,  // cantidad del item 1 rquerida
        ing2: 'wood',  // item 2
        quant2: 20  // cantidad del item 2 rquerida
        // items_lvl0: [{id: 'metal', quantity: 6}, {id: 'wood', quantity: 20}]  // items para construir la sala al nivel 0
    },
    {  
        room: 'kitchen',
        number: 1,
        unlocked: true,
        activeLevel: 0,
        craftable: false,
        numIngredients: 2,  // el número de items que requiere su crafteo
        ing1: 'metal',  // item 1
        quant1: 6,  // cantidad del item 1 rquerida
        ing2: 'wood',  // item 2
        quant2: 20  // cantidad del item 2 rquerida
        // items_lvl0: [{id: 'metal', quantity: 6}, {id: 'wood', quantity: 20}]
    },
    {  
        room: 'bedroom',
        number: 2, 
        unlocked: true,
        activeLevel: 0,
        craftable: false,
        numIngredients: 2,  // el número de items que requiere su crafteo
        ing1: 'wood',  // item 1
        quant1: 10,  // cantidad del item 1 rquerida
        ing2: 'fabric',  // item 2
        quant2: 5  // cantidad del item 2 rquerida
        // items_lvl0: [{id: 'wood', quantity: 10}, {id: 'fabric', quantity: 5}]
    },
    {  
        room: 'bathroom',
        number: 3,
        unlocked: true,
        activeLevel: 0,
        craftable: false,
        numIngredients: 2,
        ing1: 'stone',
        quant1: 8,
        ing2: 'clay',
        quant2: 12
        // items_lvl0: [{id: 'stone', quantity: 8}, {id: 'clay', quantity: 12}]        
    },
    {  
        room: 'storage_room',
        number: 4,
        unlocked: true,
        activeLevel: 0,
        craftable: false,
        numIngredients: 2,
        ing1: 'wood',
        quant1: 15,
        ing2: 'stone',
        quant2: 10
        // items_lvl0: [{id: 'wood', quantity: 15}, {id: 'stone', quantity: 10}]
    },
    {  
        room: 'armory',
        number: 5,
        unlocked: true,
        activeLevel: 0, 
        craftable: false,
        numIngredients: 2,
        ing1: 'metal',
        quant1: 10,
        ing2: 'stone',
        quant2: 5
        // items_lvl0: [{id: 'metal', quantity: 10}, {id: 'stone', quantity: 5}]
    }
]

export default ROOMS_LIST;

/*
workshop base level (level 0): 
                    (level 1): 
                    (level 2):
kitchen base level (level 0): 6 metal, 20 wood
                   (level 1): 
                   (level 2): 
bedroom base level (level 0): 
                   (level 1): 
                   (level 2): 
bathroom base level (level 0): 
                    (level 1): 
                    (level 2):  
storage_room base level (level 0):
                        (level 1): 
                        (level 2):
armory base level (level 0):
                  (level 1): 
                  (level 2):
*/