export default class credits extends Phaser.Scene {
    constructor() {
        super({key: "credits"});
    }

    create() {
        const { width, height } = this.scale;

        let creditsbg = this.add.image(0, 0, "creditsbg").setOrigin(0,0);
        creditsbg.setScale(1);

        const text = [
            'PSY: PURRS & CRAFT',
            '',
            'A game developed by Uroboros Studios',
            '',
            'Developers:',
            'Celia García Riaza',
            'Diego Martín Gutiérrez',
            'Carmen Rosino Vílchez',
            'Hao Zheng',
            '',
            'Artist:',
            'Hao Zheng',
            '',
            'Made with Phaser 4',
            '',
            'Thank you for playing our game!',
        ];

        // formato del texto (yo he puesto un poco lo que me ha parecido pero se puede cambiar)
        const format = this.add.text(width / 2, height + 50, text.join('\n'), {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            lineSpacing: 12
        }).setOrigin(0.5, 0);

        // esto es lo que hace que vaya hacia arriba el texto
        this.tweens.add({
            targets: format,
            y: -format.height - 50,
            duration: 15000,
            ease: 'Linear',
            onComplete: () => this.volver()
        });

        // para salir
        this.input.keyboard.once('keydown-Q', () => this.volver());
        this.input.once('pointerdown', () => this.volver());

        this.add.text(width - 10, height - 10, 'Q to leave', {
            fontSize: '14px',
            color: '#888888'
        }).setOrigin(1, 1);
    }

    volver() {
        this.scene.start('start');
    }
}