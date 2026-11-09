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
        
        // TODAS LAS IMAGENES A CARGAR
        // backgrounds / interfaz
        this.load.image("bg", "./assets/images/placeholders/bg.jpg");
        this.load.image("bggame", "./assets/images/placeholders/bggame.jpg");
        this.load.image("button", "./assets/images/placeholders/button.png");
        this.load.image("dayWheel", "./assets/images/placeholders/dayTimesWheel.jpg");
        this.load.image("arrow", "./assets/images/placeholders/Arrow.png");
        this.load.image("deathStone", "./assets/images/placeholders/deathStone.jpg");

        // elementos del juego
        this.load.image("craft", "./assets/images/placeholders/craft.jpg");
        this.load.image("room_template", "./assets/images/placeholders/room_template.jpg");
        this.load.image("chest", "./assets/images/placeholders/chest.png");
        this.load.image("mercadona", "./assets/images/placeholders/mercadona.jpg")

        // interfaz de crafting (tanto objetos como salas)
        this.load.image("craftbg", "./assets/images/placeholders/craftbg.jpg");
        this.load.image("roombg", "./assets/images/placeholders/roombg.jpg");
        this.load.image("square", "./assets/images/placeholders/square.jpg");
        this.load.image("green", "./assets/images/placeholders/verde.jpg");

        // objetos
        this.load.image("coal", "./assets/images/placeholders/coal.png");
        this.load.image("wood", "./assets/images/placeholders/Wood.jpg");
        this.load.image("metal", "./assets/images/placeholders/metal.png");
        this.load.image("iron", "./assets/images/placeholders/iron.png");
        this.load.image("stone", "./assets/images/placeholders/stone.png");
        this.load.image("seeds", "./assets/images/placeholders/seeds.png");
        this.load.image("straw", "./assets/images/placeholders/straw.png");
        this.load.image("an_skin", "./assets/images/placeholders/a_skin.png");
        this.load.image("fang", "./assets/images/placeholders/fang.jpg");
        this.load.image("meat", "./assets/images/placeholders/meat.jpg");
        this.load.image("brick", "./assets/images/placeholders/brick.jpg");
        this.load.image("clay", "./assets/images/placeholders/clay.jpg");
        this.load.image("fabric", "./assets/images/placeholders/fabric.jpg");
        this.load.image("stoneBlock", "./assets/images/placeholders/stoneBlock.jpg");

        // herramientas
        this.load.image("stone_sword", "./assets/images/placeholders/stone_sword.png");
        this.load.image("metal_sword", "./assets/images/placeholders/metal_sword.png");
        this.load.image("torch", "./assets/images/sprites/torch.png");
        this.load.image("pick", "./assets/images/placeholders/pick.jpg");

        //Objetos consumibles (comida)
        this.load.image("apple", "./assets/images/placeholders/apple.jpg");
        this.load.image("cereal", "./assets/images/placeholders/cereal.jpg");
        this.load.image("pineapple", "./assets/images/placeholders/pineapple.png");

        // habitaciones
        this.load.image("kitchen", "./assets/images/placeholders/kitchen.jpg");
        this.load.image("bedroom", "./assets/images/placeholders/bedroom.jpg");
        this.load.image("workshop", "./assets/images/placeholders/workshop.png");
        this.load.image("bathroom", "./assets/images/placeholders/bathroom.jpg");
        this.load.image("storage_room", "./assets/images/placeholders/storage_room.jpg");
        this.load.image("armory", "./assets/images/placeholders/armory.jpg");

        //UI
        this.load.image("vida", "./assets/images/placeholders/vida.png");
        this.load.image("stamina", "./assets/images/placeholders/staminabarra.png");
        this.load.image("hunger", "./assets/images/placeholders/hunger.png");
        this.load.image("higiene", "./assets/images/placeholders/higiene.png");
        this.load.image("sueño", "./assets/images/placeholders/sueño.png");


        // personajes y enemigos
        this.load.image("enemy", "./assets/images/placeholders/enemigo.png");
        this.load.image("ghost", "./assets/images/placeholders/ghost.png");

        this.load.spritesheet("dog","./assets/images/sprites/perro.png",{
            frameWidth:192,
            frameHeight:192
        });

        this.load.spritesheet("psyS","./assets/images/sprites/catSprite.png",{ 
            frameWidth:192,
            frameHeight:192
        });

        //Cargar json
        this.load.json("infoItems", "./src/objectsAndInventory/infoItems.json");
        this.load.json("infoChest", "./src/mapObjects/infoChest.json");
        this.load.json("infoProducts", "./src/mapObjects/infoProducts.json");
        this.load.json("enemyDrops", "./src/enemy/enemyDrops.json");

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();

            this.scene.start("start");
        }); 
    }

    create() {
        //anim perro
        this.anims.create({
                key:'dogLeft',
                frames:this.anims.generateFrameNumbers('dog',{start:0,end:4}),
                frameRate:7,
                repeat:-1
            })
        this.anims.create({
        key: 'dogRight',
        frames: this.anims.generateFrameNumbers('dog', { start: 5, end: 9 }),
        frameRate: 7,
        repeat: -1
            });
        this.anims.create({
            key:'dogDown',
            frames:this.anims.generateFrameNumbers('dog',{start:10,end:13}),
            frameRate:6,
            repeat:-1
        })

        this.anims.create({
            key:'dogUp',
            frames:this.anims.generateFrameNumbers('dog',{start:15,end:18}),
            frameRate:6,
            repeat:-1
        })

        //anim psy
        this.anims.create({
            key:'psyIdleF',
            frames:this.anims.generateFrameNumbers('psyS',{start:0,end:2}),
            frameRate:3,
            repeat:-1
        })
        this.anims.create({
            key:'psyIdleB',
            frames:this.anims.generateFrameNumbers('psyS',{start:3,end:5}),
            frameRate:3,
            repeat:-1
        })
        this.anims.create({
            key:'psyDown',
            frames:this.anims.generateFrameNumbers('psyS',{start:6,end:8}),
            frameRate:3,
            repeat:-1
        })
            this.anims.create({
            key:'psyUp',
            frames:this.anims.generateFrameNumbers('psyS',{start:9,end:11}),
            frameRate:3,
            repeat:-1
        })
            this.anims.create({
            key:'psyRight',
            frames:this.anims.generateFrameNumbers('psyS',{start:12,end:14}),
            frameRate:3,
            repeat:-1
        })
            this.anims.create({
            key:'psyLeft',
            frames:this.anims.generateFrameNumbers('psyS',{start:15,end:17}),
            frameRate:3,
            repeat:-1
        })
        this.anims.create({
            key:'psyIdleR',
            frames:this.anims.generateFrameNumbers('psyS',{start:18,end:20}),
            frameRate:3,
            repeat:-1
        })
        this.anims.create({
            key:'psyIdleL',
            frames:this.anims.generateFrameNumbers('psyS',{start:21,end:23}),
            frameRate:3,
            repeat:-1
        })
    }
}