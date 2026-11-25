export default class credits extends Phaser.Scene {
    constructor() {
        super({key: "controls"});
    }

    create() {
        const { width, height } = this.scale;
        const panelWidth = width;

        this.panel = this.add.container(0, 0);

        const bg = this.add.rectangle(panelWidth / 2, height / 2, panelWidth / 1.5, height / 1.5, 0x000000, 0.75);
        this.panel.add(bg);

        const text = [
            'WASD: move around the map',
            'LShift: run',
            'E: open inventory',
            'Q: quit interfaces',
            'F: interact',
            'G: save progress',
            'Left clic: perform action',
            'Right clic: unequip item',
            'Tab: consult stats',
            'Space: open pause menu'
        ];

        const format = this.add.text(width / 2, height * 0.2, text.join('\n'), {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 6
        }).setOrigin(0.5, 0);
        this.panel.add(format);

        let returnButton = this.add.image(width / 2, height * 0.7, "exitButton").setInteractive().setScale(0.25);
        returnButton.on('pointerdown', () => {
            this.volver();
        });
        this.panel.add(returnButton);

        const fullscreenButton = this.add.image(730, 500, 'fullscreen', 0).setOrigin(0, 0).setInteractive().setScale(0.1);

        fullscreenButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
    }

    volver() {
        this.scene.resume("pause");
        this.scene.stop();
    }
}