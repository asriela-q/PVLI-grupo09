import Psy from "../player/playerManager.js";
import Inventory from "../objectsAndInventory/inventory.js";
import Item from "../objectsAndInventory/items.js";
import Camera from "../player/camera.js";
import Craft from "../objectsAndInventory/craft.js";
import Dog from "../enemy/dog.js";
import Ghost from "../enemy/ghost.js";
import Chest from "../mapObjects/chest.js";
import DeathStone from "../player/deathStone.js";
import buildSpace from "../building/buildSpace.js";
import Mercadona from "../mapObjects/mercadona.js";
import statHandler from "../player/statHandler.js";
import stoneBlock from "../mapObjects/stoneBlock.js";
import Tree from "../mapObjects/tree.js";
import ROOMS_LIST from "../building/rooms.js";
import Bath from "../building/rooms/bath.js";
import Room from "../building/rooms/room.js";
import StorageRoom from "../building/rooms/storageRoom.js";
import StorageChest from "../building/storageChest.js";
import { saveProgress, loadProgress, deleteProgress } from '../saves/saveGame.js';
import Anvil from "../building/anvil.js";
import Bed from "../building/bed.js";
import Grill from "../building/bed.js";



export default class Animation extends Phaser.Scene {

    constructor() {
        super ({key: "main"}); // nombre de la escena
        this.psyInventory = new Inventory();
        this.dayCounter = 1;
        this.mercadona;
        this.freezeScene = false;
        this.doubleDropChance = 0;

    }

    init(data) {
        if (data.saved) this.savedGame = true;
        else this.savedGame = false;
    }

    // create - método de las escenas que se llama una vez la escena está instanciada
    create () {
        this.createCiudad();
        this.input.mouse.disableContextMenu(); //Para quitar lo que sale por defecto al hacer click derecho

        //Música
        if (!this.sound.get('bgMusic')) {
        this.musicaFondo = this.sound.add('bgMusic', {
            volume: 0.5, 
            loop: true //Se repite infinitamente
        });
            this.musicaFondo.play();
        }

        const fullscreenButton = this.add.image(1000, 700, 'fullscreen', 0).setOrigin(0, 0).setInteractive().setScale(0.15).setDepth(9999).setScrollFactor(0);
        fullscreenButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        this.pauseKey = this.input.keyboard.addKey('SPACE');
        this.pauseKey.on('down', () => {
            this.scene.pause();
            this.scene.launch('pause');
        });

        let ITEM_ENCYCLOPEDIA = this.cache.json.get("infoItems");
        this.psyInventory.ITEM_ENCYCLOPEDIA = ITEM_ENCYCLOPEDIA;

        // let bggame = this.add.image(0, 0, "bggame").setOrigin(0,0);
        // bggame.setScale(2.5);

        let hudContenedor = this.add.container(40, 40).setScale(0.4); // contenedor anclado a la esquina superior de la camara
        hudContenedor.setScrollFactor(0);
        hudContenedor.setDepth(100000);

        let rueda = this.add.image(0, 0, "dayWheel").setOrigin(0.5, 0.5).setScale(0.15); // rueda para el ciclo de dia
        hudContenedor.add(rueda);

        this.flecha = this.add.image(0, 0, "arrow").setOrigin(0.5, 0.5).setScale(0.25); // creacion de la flecha
        
        this.flecha.x = 0;
        this.flecha.y = 0;

        hudContenedor.add(this.flecha);
        this.flecha.setAngle(-135);

        this.spawn = new Phaser.Math.Vector2(this.sys.game.canvas.width + 325, this.sys.game.canvas.height + 400); //coordenadas de la base (sitio de spawn)
        // creacion de elementos del juego:
        this.player = new Psy(this, this.sys.game.canvas.width + 325, this.sys.game.canvas.height + 400, "psy", this.psyInventory).setScale(0.3);
        this.physics.add.collider(this.player, this.murosLayer);
        this.physics.add.collider(this.player, this.vallasLayer);
        this.physics.add.collider(this.player, this.tejadosLayer);
        this.physics.add.collider(this.player, this.basuraLayer);

        this.physics.add.collider(this.player, this.colisiones);
        
        //quitar
        this.stats = new statHandler(this,this.player);

        //Grupo de Phaser para gestionar las físicas de todos los objetos al mismo tiempo
        this.itemsGroup = this.physics.add.group({
            allowGravity: false
        });

        // hay que definir primero el grupo de los items
        let testChest = new Chest(this, 500, 400, "chest", 'WOODEN', this.itemsGroup).setScale(0.25);
        //testChest.on("pointerdown", ()=> testChest.getRandomItem());
        
        //Grupo de Phaser para gestionar las físicas de los enemigos
        this.enemiesGroup = this.physics.add.group({
            allowGravity: false,
        });
        let enemy = new Dog(this, this.sys.game.canvas.width * 0.8, this.sys.game.canvas.height * 0.8, this.player, this.itemsGroup).setScale(0.2);
        let enemy2 = new Ghost(this, this.sys.game.canvas.width, this.sys.game.canvas.height * 0.8, this.player, this.itemsGroup).setScale(0.2);
        this.enemiesGroup.add(enemy);
        this.enemiesGroup.add(enemy2);

        // grupo con todos los objetos interactuables del juego
        this.interactGroup = this.physics.add.group({
            allowGravity: false,
        });
        this.interactGroup.add(testChest);

        this.resourcesGroup = this.physics.add.group({
            allowGravity: false,
        });
        let rocks = new stoneBlock(this, 600, 600, "stoneBlock", this.itemsGroup).setScale(0.25);
        let tree = new Tree(this, 600, 800, "tree", this.itemsGroup).setScale(0.25);
        this.resourcesGroup.add(rocks).add(tree);

        this.mercadona = new Mercadona(this, 1500, 200, "mercadona").setScale(0.1);
        this.interactGroup.add(this.mercadona);

        let contX = 920;
        let contY = 900;
        let complete = false;
        for (let i = 0; i < 6; i++) {
            let blankSpace = new buildSpace(this, contX, contY, "room_template", this.psyInventory).setScale(0.2);
            blankSpace.on("pointerdown", () => blankSpace.activateCrafting());
            if (contX > 1200 && !complete) { 
                contY += 200;
                contX = 920;
                complete = true;
            }
            else {
                contX += 200;
            }
            this.interactGroup.add(blankSpace);
        }
        
        let w = this.scale.width;
        let h = this.scale.height;
        //llamada a la función que organiza todo de la cámara
        this.cam = new Camera(this, this.player, 1, 1, this.mapaCiudad.widthInPixels, this.mapaCiudad.heightInPixels);        
        this.cam.followPl();
        
        //Creación de objetos
        this.itemsGroup.add(new Item(this, 1000, 1000, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 1055, 1055, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        this.itemsGroup.add(new Item(this, 800, 800, "coal", "coal", ITEM_ENCYCLOPEDIA).setScale(0.15));

        // esto es para cratear una sala y probar brochachos
        for (let i = 0; i < 20; i++)  {
            this.itemsGroup.add(new Item(this, 100 * i, 1100, "wood", "wood", ITEM_ENCYCLOPEDIA).setScale(0.15));
        }
        for (let i = 0; i < 5; i++)  {
            this.itemsGroup.add(new Item(this, 100 * i, 1150, "fabric", "fabric", ITEM_ENCYCLOPEDIA).setScale(0.15));
        }
        for (let i = 0; i < 15; i++)  {
            this.itemsGroup.add(new Item(this, 100 * i, 1150, "stone", "stone", ITEM_ENCYCLOPEDIA).setScale(0.15));
        }
        for (let i = 0; i < 15; i++)  {
            this.itemsGroup.add(new Item(this, 100 * i, 1150, "clay", "clay", ITEM_ENCYCLOPEDIA).setScale(0.15));
        }
        for (let i = 0; i < 20; i++)  {
            this.itemsGroup.add(new Item(this, 100 * i, 1200, "metal", "metal", ITEM_ENCYCLOPEDIA).setScale(0.15));
        }
        this.itemsGroup.add(new Item(this, 100, 1150, "stone_pick", "stone_pick", ITEM_ENCYCLOPEDIA).setScale(0.10));
        this.itemsGroup.add(new Item(this, 130, 1150, "stone_sword", "stone_sword", ITEM_ENCYCLOPEDIA).setScale(0.10));
        this.itemsGroup.add(new Item(this, 130, 1150, "iron_axe", "iron_axe", ITEM_ENCYCLOPEDIA).setScale(0.10));
        this.itemsGroup.add(new Item(this, 0, 1150, "iron_armor", "iron_armor", ITEM_ENCYCLOPEDIA).setScale(0.10));

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

        // aqui se ve si hay partida guardada o no
        if (this.savedGame) {
            const save = loadProgress();
            if (save) {
                this.player.x = save.player.x;
                this.player.y = save.player.y;
                this.player.currentLife = save.player.life;
                this.player.currentStamina = save.player.stamina;
                this.psyInventory.slots = save.inventory.slots;
                this.psyInventory.blockedSlots = save.inventory.blockedSlots;
            }
        }

        this.capaLuz = this.add.rectangle(0, 0, w, h, 0xffffff).setAlpha(0);
        this.capaLuz.setScrollFactor(0);
        this.capaLuz.setDepth(100);
        
        this.cicloDia();
    }

   
    createCiudad(){
    const map = this.make.tilemap({key: 'ciudad'});
    this.mapaCiudad = map;

    const tilesets = [
        map.addTilesetImage('Background_Bleak-Yellow_TileSet', 'bgYellow'),
        map.addTilesetImage('Background_Green_TileSet', 'bgGreen'),
        map.addTilesetImage('Background_Dark-Green_TileSet', 'bgDark'),
        map.addTilesetImage('Brick-Wall_TileSet', 'brick'),
        map.addTilesetImage('Garbage_TileSet', 'garbage'),
        map.addTilesetImage('Grass_On-Top_TileSet', 'grassTop'),
        map.addTilesetImage('Gutter-And-Downspout', 'gutter'),
        map.addTilesetImage('Iron-Fence_TileSet', 'fence'),
        map.addTilesetImage('Roof_TileSet', 'roof'),
        map.addTilesetImage('Background_Snow_TileSet', 'bgSnow'),
        map.addTilesetImage('Snow_On-Top_TileSet', 'snowTop'),
        map.addTilesetImage('Gutter-And-Downspout', 'pipe'),
    ];

    this.sueloLayer = map.createLayer('Terreno/Suelo', tilesets);
    this.bordesLayer = map.createLayer('Terreno/Suelo_bordes', tilesets);
    this.callesLayer = map.createLayer('Terreno/Calles', tilesets);
    this.interioresLayer = map.createLayer('Terreno/Interiores', tilesets);
    this.escombrosLayer = map.createLayer('Terreno/Escombros', tilesets);
    this.basuraLayer = map.createLayer('Obstaculos/Basura', tilesets);
    this.murosLayer = map.createLayer('Edificios/Muros', tilesets);
    this.tejadosLayer = map.createLayer('Edificios/Tejados', tilesets);
    this.vallasLayer = map.createLayer('Edificios/Vallas', tilesets);
    this.canalonesLayer = map.createLayer('Edificios/Canalones', tilesets);
    this.musgoLayer = map.createLayer('Edificios/Musgo', tilesets);

    this.basuraLayer.setCollisionByProperty({ colision: true });
    this.murosLayer.setCollisionByProperty({ colision: true });
    this.tejadosLayer.setCollisionByProperty({ colision: true });
    this.vallasLayer.setCollisionByProperty({ colision: true });

    map.addTilesetImage('Objetos_Ciudad', 'objetos');  

    map.addTilesetImage('Objetos_Ciudad', 'objetos');

    // objetos de Tiled
    map.createFromObjects('Decoracion_suelo', {});
    map.createFromObjects('Fachadas', {});
    const objetos = map.createFromObjects('Objetos', {});
    objetos.forEach(o => o.setDepth(10 + o.y / 10000));

    // colisiones de Tiled
    this.colisiones = this.physics.add.staticGroup();
    map.getObjectLayer('Colisiones').objects.forEach(c => {
        this.colisiones.add(this.add.rectangle(c.x + c.width / 2, c.y + c.height / 2, c.width, c.height));
    });
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }


    update(t,dt) {
        this.player.setDepth(10 + this.player.y / 10000);
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

            this.psyInventory.slots.fill(null); //vaciamos el inventario

            // TODO: que aqui aparezca un gui o algo de q se murio el psy :3
            // ...

            this.player.revive(this.spawn.x, this.spawn.y); // revivimos al jugador
        }

        //Comprobamos si todas las salas han llegado al nivel máximo para sacar la escena de fin
        const todasAlMaximo = ROOMS_LIST.every(room => room.activeLevel == 3);
        if (todasAlMaximo) {
            console.log("Todas las salas han alcanzado el nivel máximo");
            this.scene.pause();
            this.scene.launch('end');
        }
    }

    /*
    Método que cambia la pantalla de color según el tiempo, de momento está en pocos segundos para que sea fácil de ver y probar
    Además, este método se encarga de resetear los recursos, los enemigos y los cofres (estos últimos por añadir) que se encuentran por el mapa
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
                    duration: 120000, //Dos minutos
                    onStart: () => { 
                        this.actualizarFantasmas(false); 
                        this.doubleDropChance = 0.5;
                    },
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorNoche, colorDia, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b));
                    }
                },
                {
                    alpha: 0,
                    duration: 120000, 
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorDia.r, colorDia.g, colorDia.b));
                    }
                    
                },
                //Tarde
                {
                    alpha: 0.4, 
                    duration: 120000,
                    onStart: () => { this.doubleDropChance = 0},
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
                    alpha: 0.3, 
                    duration: 5000,
                    onStart: () => { this.actualizarFantasmas(true); },
                    onUpdate: (tween) => {
                        let colorInterpolado = Phaser.Display.Color.Interpolate.ColorWithColor(colorTarde, colorNoche, 100, tween.progress * 100);
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorInterpolado.r, colorInterpolado.g, colorInterpolado.b));
                    }
                },
                {
                    alpha: 0.8,
                    duration: 5000,
                    onStart: () => {
                        this.capaLuz.setFillStyle(Phaser.Display.Color.GetColor(colorNoche.r, colorNoche.g, colorNoche.b));
                    },
                    onComplete: () => {
                        this.dayCounter++;
                        if (this.dayCounter % 3 === 0) {
                            this.mercadona.refreshProducts();
                            this.actualizarRecursos();
                        }
                        this.actualizarEnemigos();
                        this.cicloDia();
                    }
                }
            ]
        });
    }

    actualizarFantasmas(visibles) {
    const fantasmas = this.enemiesGroup.getChildren().filter(enemy => enemy.key === "ghost");
    fantasmas.forEach(fantasma => {
        fantasma.setActive(visibles).setVisible(visibles);
        
        if (fantasma.body) {
            fantasma.body.enable = visibles;
        }
        if(fantasma.lifeBar) {
            fantasma.lifeBar.setVisible(visibles);
        }
        });
    }

    actualizarRecursos() {
        this.resourcesGroup.getChildren().forEach(recurso => {
            if (!recurso.active) {
                recurso.respawn();
            }
        });
    }

    actualizarEnemigos() {
        this.enemiesGroup.getChildren().forEach(enemy => {
            if (!enemy.active) {
                enemy.respawn();
            }
        });
    }

    saveGame() {
        const estado = {
            player: {
                x: this.player.x,
                y: this.player.y,
                stamina: this.player.currentStamina,
                life: this.player.currentLife
            },
            inventory: {
                slots: this.psyInventory.slots,
                blockedSlots: this.psyInventory.blockedSlots
            }
        };
        saveProgress(estado);
    }

    // crea las habitaciones (se llama desde el buildspace justo antes de que se destruya)
    createRoom(room, posX, posY) {
        const roomToCraft = ROOMS_LIST.find(r => r.room === room);
        roomToCraft.activeLevel = 1;
        if (room === "kitchen") {
            let kitchen = new Room(this, posX, posY, "kitchen", this.psyInventory, "kitchen").setScale(0.3);
            this.interactGroup.add(kitchen);
            let grill = new Grill(this, posX, posY, "grill", this.psyInventory).setScale(0.3);
            this.interactGroup.add(grill);
        }
        else if (room === "bedroom") {
            let bedroom = new Room(this, posX, posY, "bedroom", this.psyInventory, "bedroom").setScale(0.3);
            this.interactGroup.add(bedroom);
            let bed = new Bed(this, posX, posY, "bed", this.stats).setScale(0.3);
            this.interactGroup.add(bed);
        }
        else if (room == "storage_room") {
            let storageRoom = new Room(this, posX, posY, "storage_room", this.psyInventory, "storage_room").setScale(0.1);
            this.interactGroup.add(storageRoom);
            this.chestStorage = new StorageRoom(8, this.psyInventory.ITEM_ENCYCLOPEDIA);
            const storagChest = new StorageChest(this, posX, posY, "storageChest", this.psyInventory, this.chestStorage).setScale(0.25);
            this.interactGroup.add(storagChest);
        }
        else if (room == "bathroom") {
            const bathroom = new Room(this, posX, posY, "bathroom", this.psyInventory, "bathroom").setScale(0.45);
            const bath = new Bath(this, posX, posY, "bath", this.stats).setScale(0.15);
            this.interactGroup.add(bathroom);
            this.interactGroup.add(bath);
        }
        else if (room === "workshop") {
            const workshop = new Room(this, posX, posY, "workshop", this.psyInventory, "workshop").setScale(0.25);
            this.interactGroup.add(workshop);
            let craftingTable = new Craft(this, posX, posY, "craft", this.psyInventory).setScale(0.3);
            craftingTable.on("pointerdown", () => craftingTable.activateCrafting());
            this.interactGroup.add(craftingTable);
        }
        else if (room === "armory") {
            const armory = new Room(this, posX, posY, "armory", this.psyInventory, "armory").setScale(0.25);
            this.interactGroup.add(armory);
            let anvil = new Anvil(this, posX, posY, "anvil", this.player, this.stats).setScale(0.1);
            this.interactGroup.add(anvil);
        }
    }
}