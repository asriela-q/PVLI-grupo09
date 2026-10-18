/*
Aquí se guarda toda la información de todos los items, cada uno de ellos es un objeto de javascript 
*/

const ITEM_ENCYCLOPEDIA = {
    'wood' : {
        name: "Wood", //Por si hace falta este es el nombre que aparecería en la interfaz
        //texture: 
        stackable: true, //Si se puede o no acumular
        maxStack: 30, //Máximo de objetos que puedes acumular en cada slot
        type: 'resource' //Qué es el objeto
    },
    'stone_sword' : {
        name: "Stone sword",
        //texture:
        stackable: false,
        type: 'weapon'
    }
    //Información de los objetos
    //...
}

export default ITEM_ENCYCLOPEDIA;