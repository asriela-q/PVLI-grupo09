const RECIPES_LIST = {
    'stone_sword' : {
        number: 0,
        unlocked: false,
        items: [{id: 'stone', quantity: 6}, {id: 'wood', quantity: 2}]
    },
    'metal_sword' : {
        number: 1,
        unlocked: false,
        items: [{id: 'metal', quantity: 6}, {id: 'wood', quantity: 2}]
    },
    'metal' : {
        number: 2,
        unlocked: true,
        items: [{id: 'coal', quantity: 1}, {id: 'iron', quantity: 2}]
    },
    'torch' : {
        number: 3,
        unlocked: true,
        items: [{id: 'coal', quantity: 1}, {id: 'wood', quantity: 1}]
    },
}

export default RECIPES_LIST;