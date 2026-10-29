import Psy from "../player/playerManager.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Item from "../objectsAndInventory/items.js";
import Camera from "../player/camera.js";
import Craft from "../objectsAndInventory/craft.js";
import Enemy from "../enemy/enemy.js";
import Patrol from "../enemy/patrol.js";


export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "main"}); // nombre de la escena
        this.psyInventory = new Inventory();
    }

    // preload - método de las escenas donde se pueden cargar los recursos que necesitaremos
    preload() {
        
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        let ITEM_ENCYCLOPEDIA = this.cache.json.get("infoItems");
        this.psyInventory.ITEM_ENCYCLOPEDIA = ITEM_ENCYCLOPEDIA;

        let bggame = this.add.image(0, 0, "bggame").setOrigin(0,0);
        bggame.setScale(2.5);

        // 1. Creamos un contenedor en la esquina visible de la pantalla (ya no usamos coordenadas negativas locas)
        let hudContenedor = this.add.container(-300, -200); 
        hudContenedor.setScrollFactor(0); // Bloquea todo lo que esté dentro a la pantalla
        hudContenedor.setDepth(1000);     // Asegura que la noche no lo tape

        // 2. Añadimos la rueda centrada en el (0,0) del contenedor
        let rueda = this.add.image(0, 0, "dayWheel").setOrigin(0.5, 0.5).setScale(0.15);
        hudContenedor.add(rueda);

        // 3. Añadimos la flecha. Ponemos el origen en (0.5, 0.5) para que rote sobre su centro natural
        this.flecha = this.add.image(0, 0, "arrow").setOrigin(0.5, 0.5).setScale(0.25);
        
        // AJUSTE MANUAL DE PIVOTE: 
        // Si al rotar ves que la punta se desplaza, mueve estos valores de píxeles (X e Y) 
        // para "clavar" la base de la flecha exactamente en el centro (0,0) de la rueda:
        this.flecha.x = 0;   // Prueba sumando o restando píxeles si es necesario (ej: -5 o 10)
        this.flecha.y = 0;   // Prueba moviendo verticalmente (ej: 15 o -10)

        hudContenedor.add(this.flecha);
        this.flecha.setAngle(-120);

        let player = new Psy(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "psy", this.psyInventory);
        player.setScale(0.7);
        console.log(this.psyInventory);
        let craftingTable = new Craft(this, 200, 400, "craft", this.psyInventory).setOrigin(0, 0).setScale(0.3).setInteractive();
        craftingTable.on("pointerdown", () => craftingTable.activateCrafting());

        // let craftingTable = new Craft(this, 0, this.sys.game.canvas.height * 0.5, "craft", this.psyInventory).setInteractive();

        let enemy =new Enemy(this, this.sys.game.canvas.width * 0.7, this.sys.game.canvas.height * 0.7, "enemy",150,20,5,1000,900,player);
        enemy.setScale(0.5);
        
        //Grupo de Phaser para gestionar las físicas de todos los objetos al mismo tiempo
        this.itemsGroup = this.physics.add.group({
            allowGravity: false
        });
        
        //Grupo de Phaser para gestionar las físicas de los enemigos
        this.enemiesGroup = this.physics.add.group({
            allowGravity: false,
        });
        this.enemiesGroup.add(enemy);
        
        //coger las dimensiones que ocupa el juego 
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;

        //He tenido que cambiar lo de la cámara porque sino no me iba no sé que pasa me voy a suicidar
        let w = bggame.width * 2.5;
        let h = bggame.height * 2.5;
        //llamada a la función que organiza todo de la cámara
        Camera.followPl(this, player, 0.5, 0.5, w, h); 
        
        //Creación de objetos
        this.itemsGroup.add(new Item(this, 1000, 1000, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 1055, 1055, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 800, 800, "coal", "coal", ITEM_ENCYCLOPEDIA).setScale(0.15));

        //new Item(this, 10, 10, "wood", "wood").setScale(0.15)
        //Mira si el jugador ha colisionado con un objeto
        this.physics.add.overlap(player, this.itemsGroup, player.collectItem, null, player); //Null: callback 
        //this.physics.add.collider(player,this.enemiesGroup);
        //mira si el jugador ha colisionado con un enemigo y le resta vida al jugador,collider para que los dos no se transpasen
        this.physics.add.overlap(player, this.enemiesGroup, (player, enemy) => {
        if (enemy.canAttack()) {
            player.takeDamage(enemy.damage);
            }
        });
        enemy.status = new Patrol(enemy, 50);
        // this.physics.add.overlap(player, craftingTable, craftingTable.activateCrafting, null, player);  // esto no va uwu

        this.capaLuz = this.add.rectangle(0, 0, w / 0.25, h / 0.25, 0xffffff).setAlpha(0);
        this.capaLuz.setScrollFactor(0);
        this.capaLuz.setDepth(100);
        
        this.cicloDia();
    }

    update() {
        if (this.capaLuz) {
            this.capaLuz.x = this.cameras.main.worldView.centerX;
            this.capaLuz.y = this.cameras.main.worldView.centerY;
        }
    }

    /*
    Método que cambia la pantalla de color según el tiempo, de momento está en segundos para que sea fácil de ver y probar
    */
    cicloDia() {
        const colorDia = Phaser.Display.Color.HexStringToColor('#ffffff');      
        const colorTarde = Phaser.Display.Color.HexStringToColor('#e67e22');    
        const colorNoche = Phaser.Display.Color.HexStringToColor('#0a1128');    
        this.tweens.chain({
        targets: this.capaLuz,
        tweens: [
                //Tarde
                {
                    alpha: 0.4, 
                    duration: 5000,
                    onStart: () => {
                        this.tweens.add({ targets: this.flecha, angle: 0, duration: 5000 }); //De -90° a 0°
                    },
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorDia, colorTarde, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b)); 
                    }
                },
                //Transición de colores
                {
                    alpha: 0.4,
                    duration: 3000, 
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorTarde.r, colorTarde.g, colorTarde.b));
                    }
                },
                //Noche
                {
                    alpha: 0.5, 
                    duration: 5000,
                    onStart: () => {
                        this.tweens.add({ targets: this.flecha, angle: 135, duration: 5000 });
                    },
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorTarde, colorNoche, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b));
                    }
                },
                //Transición de colores
                {
                    alpha: 0.8,
                    duration: 6000, // Reemplaza al 'hold' inestable
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorNoche.r, colorNoche.g, colorNoche.b));
                    }
                },
                //Dia
                {
                    alpha: 0, 
                    duration: 5000,
                    onStart: () => {
                        this.tweens.add({ targets: this.flecha, angle: 235, duration: 5000 });
                    },
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorNoche, colorDia, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b));
                    }
                },
                {
                    alpha: 0,
                    duration: 8000, 
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorDia.r, colorDia.g, colorDia.b));
                        this.tweens.add({ 
                            targets: this.flecha, 
                            angle: -120, 
                            duration: 8000,
                            onComplete: () => {
                                this.flecha.angle = -90; 
                            }
                        });
                    },
                    onComplete: () => {
                        this.cicloDia();
                    }
                }
            ]
        });
    }
}