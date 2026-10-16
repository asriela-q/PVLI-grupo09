/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
import mainMenu from './scenes/mainMenu.js'; 
import game from './scenes/mainScene.js'; 
import craft from './scenes/crafting.js'; 

let config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: [{preload:preload, create:create}],	// Decimos a Phaser cual es nuestra escena, en este caso la escena es un 
												//objeto formado por el método preload y create definidos más abajo en 
												//este mismo archivo
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 200 }, 
			debug: false 
		} 
	},

	// ponemos las escenas utilizando el manager de Phaser
	scene: [mainMenu, game, craft]
};

new Phaser.Game(config);

// preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
function preload () {
	
}

// create - método de las escenas que se llama una vez la escena está instanciada
function create () {
	
}

// las escenas también tienen el método init() y update(time, delta)
// init - se ejecuta cuando se carga la escena. Aquí se pueden pasar datos entre escenas.
// update - se llama cada ciclo de juego, para modificar el estado