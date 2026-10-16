// preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
export default class Psy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.scene.add.existing(this); // Nos añadimos a la escena para ser mostrados

    }

    preUpdate(t, dt){
        // lógica de psy
        super.preUpdate(t, dt);
    }

    create(){

    }
    
}


