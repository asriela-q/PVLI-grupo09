export default class credits extends Phaser.Scene {
    constructor() {
        super({key: "end"});
    }

    create() {
        const { width, height } = this.scale;
        const panelWidth = width;

        this.panel = this.add.container(0, 0);

        const fondoTransparente = this.add.rectangle(0, 0, panelWidth, height, 0x000000, 0.75).setOrigin(0, 0).setAlpha(0.5).setDepth(-1);
        const bg = this.add.rectangle(panelWidth / 2, height / 2, panelWidth / 1.5, height / 1.5, 0x000000, 0.75);
        this.panel.add(bg);

        const text = [
            "Congratulations, you have completed the game!"
        ];

        let resumeButton = this.add.image(width / 2, height * 0.3, "resumeButton").setInteractive().setScale(0.25);
        resumeButton.on('pointerdown', () => {
            this.closeUI();
        });
        this.panel.add(resumeButton);

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