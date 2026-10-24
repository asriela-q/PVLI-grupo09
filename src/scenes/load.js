export default class Load extends Phaser.Scene {
    constructor() {
        super({key: "loadingScene"});
    }

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
            
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
            
         var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
            
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
            
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
            
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();

            this.scene.start("start");
        });
           
        
        //Todas las imágenes que queremos cargar
        this.load.image("bg", "./assets/images/placeholders/bg.jpg");
        this.load.image("button", "./assets/images/placeholders/button.png");
        this.load.image("psy", "./assets/images/placeholders/psy.png");
        this.load.image("wood", "./assets/images/placeholders/Wood.jpg");
        this.load.image("bggame", "./assets/images/placeholders/bggame.jpg");
        this.load.image("craft", "./assets/images/placeholders/craft.jpg");
        this.load.image("coal", "../assets/images/placeholders/coal.jpg");
        this.load.image("stone_sword", "../assets/images/placeholders/stone_sword.png");
        this.load.image("craftbg", "../assets/images/placeholders/craftbg.jpg");
        this.load.image("square", "../assets/images/placeholders/square.jpg");
        this.load.image("green", "../assets/images/placeholders/verde.jpg");
        this.load.image("metal", "../assets/images/placeholders/metal.jpg");
        this.load.image("metal_sword", "../assets/images/placeholders/metal_sword.jpg");
        this.load.image("torch", "../assets/images/placeholders/torch.png");
        this.load.image("iron", "../assets/images/placeholders/iron.jpg");
        this.load.image("stone", "../assets/images/placeholders/stone.jpg");
        this.load.image("coal", "../assets/images/placeholders/coal.jpg");
        this.load.image("wood", "../assets/images/placeholders/Wood.jpg");
    }
}