export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "pause"}); // nombre de la escena
    }

    create() {
        this.closeMenu = this.input.keyboard.addKey('SPACE');

        const { width, height } = this.scale;
        const panelWidth = width;

        this.panel = this.add.container(0, 0);

        const bg = this.add.rectangle(0, 0, panelWidth, height, 0x000000, 0.75).setOrigin(0, 0);
        this.panel.add(bg);

        let resumeButton = this.add.image(width / 2, height * 0.3, "resumeButton").setInteractive().setScale(0.25);
        resumeButton.on('pointerdown', () => {
            this.closeUI();
        });
        this.panel.add(resumeButton);

        let mainMenuButton = this.add.image(width / 2, height * 0.7, "exitButton").setInteractive().setScale(0.25);
        mainMenuButton.on('pointerdown', () => {
            this.scene.start('start'); 
            this.scene.stop('main'); 
        });
        this.panel.add(mainMenuButton);

        const fullscreenButton = this.add.image(730, 500, 'fullscreen').setOrigin(0, 0).setInteractive().setScale(0.1);
        fullscreenButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        this.panel.add(fullscreenButton);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.closeMenu))
            this.closeUI();
    }
 
    closeUI() {
        this.scene.resume("main");
        this.scene.stop();
    }
}