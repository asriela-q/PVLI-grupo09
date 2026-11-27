export default class credits extends Phaser.Scene {
    constructor() {
        super({key: "end"});
    }

    create() {
        const { width, height } = this.scale;

        let creditsbg = this.add.image(0, 0, "creditsbg").setOrigin(0,0);
        creditsbg.setScale(1);

        const text = [
            
        ];

        // formato del texto (yo he puesto un poco lo que me ha parecido pero se puede cambiar)
        const format = this.add.text(width / 2, height + 50, text.join('\n'), {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            lineSpacing: 12
        }).setOrigin(0.5, 0);


        const fullscreenButton = this.add.image(730, 500, 'fullscreen', 0).setOrigin(0, 0).setInteractive().setScale(0.1);

        fullscreenButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
    }

}