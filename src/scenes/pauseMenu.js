export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "pause"}); // nombre de la escena
    }

    create() {
        this.closeMenu = this.input.keyboard.addKey('SPACE');

        const { width, height } = this.scale;
        const panelWidth = width;

        this.panel = this.add.container(0, 0);

        const fondoTransparente = this.add.rectangle(0, 0, panelWidth, height, 0x000000, 0.75).setOrigin(0, 0).setAlpha(0.5).setDepth(-1);
        const bg = this.add.rectangle(panelWidth / 2, height / 2, panelWidth / 1.5, height / 1.5, 0x000000, 0.75);
        this.panel.add(bg);

        let resumeButton = this.add.image(width / 2, height * 0.3, "resumeButton").setInteractive().setScale(0.25);
        resumeButton.on('pointerdown', () => {
            this.closeUI();
        });
        this.panel.add(resumeButton);

        const textoMusica = this.add.text(width / 2.75, height * 0.4, "Music and sound effects volume", {fontFamily: "Pixuf", fontSize: "18px", color: "#ffffff", align: "center"});
        this.panel.add(textoMusica);
        //Slider para controlar el volumen de los sonidos del juego (música y efectos de sonido)
        const barX = 400;
        const barY = 280;
        const barWidth = 200;
        const bar = this.add.rectangle(barX, barY, barWidth, 10, 0x888888);

        //Calcular la posición inicial del control según el volumen actual
        const startX = (barX - barWidth / 2) + (this.sound.volume * barWidth);

        //Botón arrastrable
        const handle = this.add.circle(startX, barY, 12, 0xffffff).setInteractive({ draggable: true, useHandCursor: true });

        //Evento de arrastre
        handle.on('drag', (pointer, dragX) => {
        // Limitar el movimiento dentro de los bordes de la barra
        const minX = barX - barWidth / 2;
        const maxX = barX + barWidth / 2;
        const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);
        handle.x = clampedX;
    
        // Calcular el nuevo volumen (entre 0 y 1) y aplicarlo
        const newVolume = (clampedX - minX) / barWidth;
        this.sound.volume = newVolume;
        });
        this.panel.add(bar);

        let controlsButton = this.add.image(width / 2, height * 0.6, "controlsButton").setInteractive();
        controlsButton.on('pointerdown', () => {
            this.scene.pause();
            this.scene.launch('controls');
        });
        this.panel.add(controlsButton);

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