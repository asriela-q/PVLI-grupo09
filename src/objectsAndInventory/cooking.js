var COOKING_LIST = [
    {  
        dish: 'caramelized_apple',  // nombre del plato
        number: 0,  // número de receta en la lista de recetas (solo sirve para la lógica del juego)
        unlocked: true,  // si se ha desbloqueado la receta
        craftable: false,  // si se puede craftear actualmente con los items del inventario
        numIngredients: 2,  // el número de items que requiere su crafteo
        ing1: 'apple',  // item 1
        quant1: 1,  // cantidad del item 1 rquerida
        ing2: 'candy',  // item 2   
        quant2: 2  // cantidad del item 2 rquerida
        // items: [{id: 'apple', quantity: 1}, {id: 'candy', quantity: 2}]
    },
    {  
        dish: 'bistec',
        number: 1,
        unlocked: true,
        craftable: false,
        numIngredients: 2,
        ing1: 'meat',
        quant1: 2,
        ing2: 'pepper',
        quant2: 2
        // items: [{id: 'meat', quantity: 2}, {id: 'pepper', quantity: 2}]
    }
];

export default COOKING_LIST;