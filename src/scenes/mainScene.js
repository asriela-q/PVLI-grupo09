import Psy from "../player/playerManager.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Item from "../objectsAndInventory/items.js";
import Camera from "../player/camera.js";
import Craft from "../objectsAndInventory/craft.js";
import Dog from "../enemy/dog.js";
import Chest from "../mapObjects/chest.js";
import DeathStone from "../player/deathStone.js";
import buildSpace from "../building/buildSpace.js";
import Mercadona from "../mapObjects/mercadona.js";
import statHandler from "../player/statHandler.js";

const SPAWN = new Phaser.Math.Vector2(300, 300); //coordenadas de la base (sitio de spawn)

export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "main"}); // nombre de la escena
        this.psyInventory = new Inventory();
        this.dayCounter = 0;
        this.mercadona;
        this.freezeScene = false;
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

        let hudContenedor = this.add.container(-300, -200); // contenedor anclado a la esquina superior de la camara
        hudContenedor.setScrollFactor(0);
        hudContenedor.setDepth(1000);

        let rueda = this.add.image(0, 0, "dayWheel").setOrigin(0.5, 0.5).setScale(0.15); // rueda para el ciclo de dia
        hudContenedor.add(rueda);

        this.flecha = this.add.image(0, 0, "arrow").setOrigin(0.5, 0.5).setScale(0.25); // creacion de la flecha
        
        this.flecha.x = 0;
        this.flecha.y = 0;

        hudContenedor.add(this.flecha);
        this.flecha.setAngle(-135);

        // creacion de elementos del juego:
        this.player = new Psy(this, this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, "psy", this.psyInventory).setScale(0.9);


        //quitar
        this.stats =new statHandler(this,this.player);

        //Grupo de Phaser para gestionar las físicas de todos los objetos al mismo tiempo
        this.itemsGroup = this.physics.add.group({
            allowGravity: false
        });

        let enemy = new Dog(this, this.sys.game.canvas.width * 0.8, this.sys.game.canvas.height * 0.8, this.player, this.itemsGroup).setScale(0.9);

        // hay que definir primero el grupo de los items
        let testChest = new Chest(this, 500, 400, "chest", 'WOODEN', this.itemsGroup).setScale(0.6);
        testChest.on("pointerdown", ()=> testChest.getRandomItem());
        
        //Grupo de Phaser para gestionar las físicas de los enemigos
        this.enemiesGroup = this.physics.add.group({
            allowGravity: false,
        });
        this.enemiesGroup.add(enemy);

        // grupo con todos los objetos interactuables del juego
        this.interactGroup = this.physics.add.group({
            allowGravity: false,
        });
        this.interactGroup.add(testChest);

        let craftingTable = new Craft(this, 200, 400, "craft", this.psyInventory).setScale(0.3);
        craftingTable.on("pointerdown", () => craftingTable.activateCrafting());
        this.interactGroup.add(craftingTable);

        this.mercadona = new Mercadona(this, 1500, 200, "mercadona").setScale(0.3);
        this.interactGroup.add(this.mercadona);

        let contX = 800;
        let contY = 400;
        let complete = false;
        for (let i = 0; i < 6; i++) {
            let blankSpace = new buildSpace(this, contX, contY, "room_template", this.psyInventory).setScale(0.2);
            blankSpace.on("pointerdown", () => blankSpace.activateCrafting());
            if (contX > 1000 && !complete) { 
                contY += 200;
                contX = 800;
                complete = true;
            }
            else {
                contX += 200;
            }
            this.interactGroup.add(blankSpace);
        }
        
        //coger las dimensiones que ocupa el juego 
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;

        let w = bggame.width * 2.5;
        let h = bggame.height * 2.5;
        //llamada a la función que organiza todo de la cámara
        this.cam=new Camera(this,this.player,1,0.5,w,h);
        this.cam.followPl();
        
        //Creación de objetos
        this.itemsGroup.add(new Item(this, 1000, 1000, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 1055, 1055, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 800, 800, "coal", "coal", ITEM_ENCYCLOPEDIA).setScale(0.15));

        // esto es para cratear una sala y probar brochachos
        for (let i = 0; i < 10; i++)  {
            this.itemsGroup.add(new Item(this, 100 * i, 1100, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        }
        for (let i = 0; i < 5; i++)  {
            this.itemsGroup.add(new Item(this, 100 * i, 1150, "fabric", "fabric", ITEM_ENCYCLOPEDIA).setScale(0.15));
        }
        

        //new Item(this, 10, 10, "wood", "wood").setScale(0.15)
        //Mira si el jugador ha colisionado con un objeto
        this.physics.add.overlap(this.player, this.itemsGroup, this.player.collectItem, null, this.player); //Null: callback 
        //this.physics.add.collider(player,this.enemiesGroup);
        //mira si el jugador ha colisionado con un enemigo y le resta vida al jugador,collider para que los dos no se transpasen
        // this.physics.add.overlap(player, this.enemiesGroup, (player, enemy) => {
        // if (enemy.canAttack()) {
        //     player.takeDamage(enemy.damage);
        //     }
        // });
        // this.physics.add.overlap(player, craftingTable, craftingTable.activateCrafting, null, player);  // esto no va uwu

        this.capaLuz = this.add.rectangle(0, 0, w / 0.25, h / 0.25, 0xffffff).setAlpha(0);
        this.capaLuz.setScrollFactor(0);
        this.capaLuz.setDepth(100);
        
        this.cicloDia();
    }

    update(t,dt) {
        if (this.capaLuz) {
            this.capaLuz.x = this.cameras.main.worldView.centerX;
            this.capaLuz.y = this.cameras.main.worldView.centerY;
        }

        if(!this.freezeScene && this.flecha) {
            this.flecha.angle += 0.2;
        }
        this.stats.preUpdate(t,dt);

        if (this.player.isDead()){
            // si ya existía una death stone, la borramos del mapa
            if (this.player.deathStone != undefined) this.player.deathStone.destroy();
            
            // creamos y llenamos la deathStone del jugador
            this.player.deathStone = new DeathStone(this, this.player.x, this.player.y, "deathStone", this.psyInventory).setScale(0.3);
            this.interactGroup.add(this.player.deathStone);
            this.player.deathStone.fillDeath();

            this.psyInventory.slots.fill(null); // vaciamos el inventario

            // TODO: que aqui aparezca un gui o algo de q se murio el psy :3
            // ...

            this.player.revive(SPAWN.x, SPAWN.y); // revivimos al jugador

        }
    }

    /*
    Método que cambia la pantalla de color según el tiempo, de momento está en segundos para que sea fácil de ver y probar
    */
    cicloDia() {
        const colorDia = Phaser.Display.Color.HexStringToColor('#ffffff');      
        const colorTarde = Phaser.Display.Color.HexStringToColor('#e67e22');    
        const colorNoche = Phaser.Display.Color.HexStringToColor('#0a1128');    
        this.metodoCicloDia = this.tweens.chain({
        targets: this.capaLuz,
        tweens: [
                //Dia
                {
                    alpha: 0, 
                    duration: 5000,
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorNoche, colorDia, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b));
                    }
                },
                {
                    alpha: 0,
                    duration: 5000, 
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorDia.r, colorDia.g, colorDia.b));
                    }
                    
                },
                //Tarde
                {
                    alpha: 0.4, 
                    duration: 5000,
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorDia, colorTarde, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b)); 
                    }
                },
                //Transición de colores
                {
                    alpha: 0.4,
                    duration: 5000, 
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorTarde.r, colorTarde.g, colorTarde.b));
                    }
                },
                //Noche
                {
                    alpha: 0.5, 
                    duration: 5000,
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorTarde, colorNoche, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b));
                    }
                },
                //Transición de colores
                {
                    alpha: 0.8,
                    duration: 5000,
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorNoche.r, colorNoche.g, colorNoche.b));
                    },
                    onComplete: () => {
                        this.dayCounter++;
                        console.log(this.dayCounter);
                        if (this.dayCounter % 3 === 0) this.mercadona.refreshProducts();
                        this.cicloDia();
                    }
                }
            ]
        });
    }
}