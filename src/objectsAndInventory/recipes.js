var RECIPES_LIST = [
    {  
        object: 'stone_sword',  // nombre del objeto
        number: 0,  // número de receta en la lista de recetas (solo sirve para la lógica del juego)
        unlocked: true,  // si se ha desbloqueado la receta
        craftable: false,  // si se puede craftear actualmente con los items del inventario
        numIngredients: 2,  // el número de items que requiere su crafteo
        ing1: 'stone',  // item 1
        quant1: 6,  // cantidad del item 1 rquerida
        ing2: 'wood',  // item 2
        quant2: 2  // cantidad del item 2 rquerida
        // items: [{id: 'stone', quantity: 6}, {id: 'wood', quantity: 2}]
    },
    {  
        object: 'metal_sword',
        number: 1,
        unlocked: true,
        craftable: false,
        numIngredients: 2,
        ing1: 'metal',
        quant1: 6,
        ing2: 'wood',
        quant2: 2
        // items: [{id: 'metal', quantity: 6}, {id: 'wood', quantity: 2}]
    },
    {
        object: 'metal',
        number: 2,
        unlocked: true,
        craftable: false,
        numIngredients: 2,
        ing1: 'coal',
        quant1: 1,
        ing2: 'iron',
        quant2: 2
        // items: [{id: 'coal', quantity: 1}, {id: 'iron', quantity: 2}]
    },
    {
        object: 'torch',
        number: 3,
        unlocked: true,
        craftable: false,
        numIngredients: 2,
        ing1: 'coal',
        quant1: 1,
        ing2: 'wood',
        quant2: 1
        // items: [{id: 'coal', quantity: 1}, {id: 'wood', quantity: 1}]
    }
];

export default RECIPES_LIST;