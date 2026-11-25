import StatsBar from "../player/barUIHandler.js";
 
const BAR_WIDTH = 30;
const BAR_HEIGHT = 250;
const BAR_BOTTOM = 380; 
const FRAME_W = 50;   //ancho borde de stat    
const FRAME_H = 300; //alto borde de stat
 
export default class stats extends Phaser.Scene {
    constructor() {
        super({ key: "stats" }); // nombre de la escena
    }
    
    create(data) {
        //recibe las estadisticas y player
        this.stats = data.stats;
        this.player = data.player;

        const { width, height } = this.scale;
        const panelWidth = width / 3;
 
        this.closeTab = this.input.keyboard.addKey("TAB");
        this.closeQ = this.input.keyboard.addKey("Q");
 
        // panel dentro de un contenedor
        this.panel = this.add.container(width / 2, 0);
 
        const bg = this.add.rectangle(0, 0, panelWidth, height, 0x000000, 0.75).setOrigin(0, 0);
        this.panel.add(bg);
 
        const title = this.add.text(panelWidth / 2, 30, "ESTADÍSTICAS", {
            fontFamily: "Pixelify Sans", fontSize: "28px", color: "#ffffff", fontStyle: "bold"
        }).setOrigin(0.5, 0);
        this.panel.add(title);
 
        const stats = this.stats;
        
        //creacion de las columnas de estadisticas de supervivencia
        this.createStatColumn(panelWidth * 0.25, "sueño", 0x908f9a, stats.sleepyness, stats.maxSleepyness);
        this.createStatColumn(panelWidth * 0.50, "hunger", 0xE67E22, stats.hunger, stats.maxHunger);
        this.createStatColumn(panelWidth * 0.75, "higiene", 0x5b94e0, stats.hygiene, stats.maxHygiene);
       
        //estadisticas
        const player = this.player;
        const extra = this.add.text(panelWidth / 2, 470, [
            `Life: ${Math.max(0, (player.currentLife))} / ${player.maxLife}`,
            `Attack: ${player.playerAttack + player.bonusAttack}`,
            `Defense: ${player.playerDefense + player.bonusDefense}`,
        ], {
            fontFamily: "Pixuf", fontSize: "18px", color: "#ffffff", align: "center", lineSpacing: 6
        }).setOrigin(0.5, 0);
        this.panel.add(extra);
    }
 
    //método que ayuda a crear todo relacionado con las barras de estadistica dentro del panel de estadisticas
    createStatColumn(centerX, framek, color, value, max) {
        const x = centerX - BAR_WIDTH / 2;
 
        const bar = new StatsBar(this, x, BAR_BOTTOM, BAR_WIDTH, BAR_HEIGHT, color, true);
        bar.updateBar(Math.max(0, value), max);
 
        //bnorde
        const frame = this.add.image(x-10 , BAR_BOTTOM, framek)
            .setScale(0.6)
            .setOrigin(0, 1)
            .setDisplaySize(FRAME_W, FRAME_H);

            //porcentaje
            const percent = Phaser.Math.Clamp(Math.round((value / max) * 100), 0, 100);
            const text = this.add.text(centerX, BAR_BOTTOM  + 15, `${percent}%`, {
            fontFamily: "Arial", fontSize: "18px", color: "#ffffff"
        }).setOrigin(0.5, 0);
 
        this.panel.add([bar, frame, text]);
    }
 
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.closeTab) || Phaser.Input.Keyboard.JustDown(this.closeQ))
            this.closeUI();
    }
 
    closeUI() {
        this.scene.resume("main");
        this.scene.stop();
    }
}