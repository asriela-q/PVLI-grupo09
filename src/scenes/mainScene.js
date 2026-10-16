
import Psy from "../player/playerMovement.js";

export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "main"}); // nombre de la escena
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        this.load.image("psy", "./assets/images/placeholders/psy.jpg");
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let player = new Psy(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "psy");
        player.setScale(0.3);
    }

}