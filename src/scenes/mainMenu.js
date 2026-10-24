export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "start"}); // nombre de la escena
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let bg = this.add.image(300, 300, "bg"); // cargamos la imagen en el juego
        bg.setScale(0.38);

        let startButton = this.add.image(200, 200, "button").setOrigin(0 ,0).setInteractive();
        startButton.setScale(0.5);
        startButton.on("pointerdown", ()=>this.scene.start("main"));
    }

}
