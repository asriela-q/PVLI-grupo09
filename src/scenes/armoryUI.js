import ARMORY_COLUMNS, { ARMORY_MAX_LEVEL } from "../building/armoryUpgradeInfo.js";

// posiciones de los elementos del UI
const COL_X = [20, 280, 540]; // posiciones de las colunmnas de los tipos distintos de upgrades q hay
const ROW_Y = [105, 315]; // posiciones de las filas de las upgrades
// tamaño de las "cartas" de las upgrades
const CARD_W = 240;
const CARD_H = 190;

// listado de colores con sus hex codes pa no tener q estar copiando y pegando la misma mierda 17 veces
const CARD_FILL = 0xffffff;

// colores para cuando el jugador hace hover sobre los botones
const ATK_HOVER = 0xEDADAD; // rojo
const ST_HOVER = 0xEAEDAD; // amarillo
const VIT_HOVER = 0xADC8ED; // azul
const HOVER_CLR = [ATK_HOVER, VIT_HOVER, ST_HOVER];

// colores de los bordes de las cartas específicos de sus categorias
const YELLOW = 0xEBF24B;
const RED = 0xF24E4B;
const BLUE = 0x2F84FA;
const BRD_CLR = [RED, BLUE, YELLOW];

// colores del fondo de los orbes
const GREEN = 0x22b14c;
const GREY = 0xb5b5b5;

const FONT = "pixelFont"; // letra
const DEBUG = true; // esto de normal que esté en false (es pa yo probar cositas locas)

export default class ArmoryUI extends Phaser.Scene {
    constructor() {
        super({ key: "ArmoryUI" });
    }

    create(data) {
        // variables del constructor, cogen los datos del data q le pasamos
        this.armory = data.armory;
        this.player = data.armory.player;
        this.close = this.input.keyboard.addKey("Q"); // añadimos la tecla para salir de la escena

        // fondo
        this.add.image(0, 0, "armoryCraftBg").setOrigin(0, 0).setScale(2.5);

        // titulo
        this.add.text(400, 22, "ARMORY", { fontFamily: FONT, fontSize: "28px", color: "#000000" }).setOrigin(0.5, 0);
        this.levelText = this.add.text(780, 28, "", { fontFamily: FONT, fontSize: "16px", color: "#555555" }).setOrigin(1, 0);

        ARMORY_COLUMNS.forEach((column, i) => { // lo q hace .forEach es lit un for each d toda la vida pero x alguna razon en phaser se pde hacer asi (gracias api de phaser)
            this.add.text(COL_X[i] + 43, 70, column.title, { fontFamily: FONT, fontSize: "22px", color: "#000000" });
        });

        // icono de el orbe y textos
        this.orbIcon = this.add.image(30, 548, "auraOrb").setScale(0.08);
        this.orbText = this.add.text(46, 538, "", { fontFamily: FONT, fontSize: "20px", color: "#000000" });
        //this.msgText = this.add.text(400, 573, "", { fontFamily: FONT, fontSize: "16px", color: "#000000" }).setOrigin(0.5, 0.5);
        this.add.text(780, 545, "Q: exit", { fontFamily: FONT, fontSize: "16px", color: "#555555" }).setOrigin(1, 0.5);

        // mis cheats loquillos, L es para subir d nivel la sala y la O te da orbes
        if (DEBUG) {
            //this.add.text(20, 585, "[DEBUG] L: upgrade room lvl  |  O: +100 orbs", { fontFamily: "Arial", fontSize: "11px", color: "#999999" }).setOrigin(0, 0.5);
            this.input.keyboard.on("keydown-L", () => { this.armory.upgradeArmory(); this.refreshUI(); });
            this.input.keyboard.on("keydown-O", () => { this.player.auraOrbs += 100; this.refreshUI(); });
        }

        this.refreshUI();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.close)) this.closeUI();
    }

    closeUI() {
        this.scene.resume("main");
        this.scene.stop();
    }

    refreshUI() {
        if (this.cardsContainer) this.cardsContainer.destroy();
        this.cardsContainer = this.add.container(0, 0);

        this.levelText.setText(`Room lvl: ${this.armory.level} / ${ARMORY_MAX_LEVEL}`);
        this.orbText.setText(`Aura orbs: ${this.player.auraOrbs}`);

        // bucle anidado para recorrer todas las upgrades
        ARMORY_COLUMNS.forEach((column, col) => {
            column.upgrades.forEach((upgrade, row) => {
                this.cardsContainer.add(this.createCard(upgrade, COL_X[col], ROW_Y[row], col));
            });
        });
    }

    // metodo para crear una carta con una mejora, contiene los colores de la carta dependiendo de el estado (se pde comprar o no) además de todos los textos necesarios para la informacion del buff
    createCard(up, x, y, index) {
        const armory = this.armory;
        const tier = armory.getTier(up.id);
        const maxTier = up.values.length;
        const state = armory.checkUpgrade(up.id);

        const card = this.add.container(x, y);

        // creacion d la carta como tal (el visual)
        const frame = this.add.rectangle(0, 0, CARD_W, CARD_H, CARD_FILL).setOrigin(0, 0).setStrokeStyle(4, BRD_CLR[index]);
        card.add(frame);

        // añadimos el texto de la upgrade
        card.add(this.add.text(12, 12, up.label, { fontFamily: FONT, fontSize: "22px", color: "#000000" }));

        // cambiamos el color del fondo de la carta dependiendo del estado: ok = verde, locked y max = gris, si no es blanco
        const boxFill = state === "ok" ? GREEN : (state === "locked" || state === "max") ? GREY : 0xffffff;

        // color del cuadrado de los orbes
        const box = this.add.rectangle(CARD_W - 100, 10, 88, 30, boxFill).setOrigin(0, 0).setStrokeStyle(3, state === "locked" || state === "max" ? GREY : GREEN);
        card.add(box);

        if (state === "max") // si ha llegado al maximo, ponemos un texto q ya diga MAX para dejarlo claro
            card.add(this.add.text(CARD_W - 56, 25, "MAX", { fontFamily: FONT, fontSize: "18px", color: "#ffffff" }).setOrigin(0.5, 0.5));
        else {
            const cost = up.costs[tier];

            // definimos el color del texto del coste dependiendo de si se puede comprar o no (rojo = no)
            const costColor = state === "ok" ? "#ffffff" : state === "noOrbs" ? "#cc2222" : "#eeeeee";
            card.add(this.add.image(CARD_W - 88, 25, "auraOrb").setScale(0.06));
            card.add(this.add.text(CARD_W - 18, 25, `x${cost}`, { fontFamily: FONT, fontSize: "18px", color: costColor }).setOrigin(1, 0.5));
        }

        // texto con el nivel de upgrade en el q estamos
        card.add(this.add.text(12, 58, `Upgrade: ${tier} / ${maxTier}`, { fontFamily: FONT, fontSize: "16px", color: "#333333" }));

        const current = armory.getCurrentValue(up); // valor de la upgrade en la q estamos ahora mismo
        // texto con la info del valor de la mejora q se aplicará al jugador
        card.add(this.add.text(12, 88, `${up.statName}: +${current}${up.suffix}`, { fontFamily: FONT, fontSize: "18px", color: "#000000" }));

        // aqui ponemos el texto de la siguiente mejora dependiendo de si existe o no
        if (tier < maxTier) card.add(this.add.text(12, 112, `Next: +${up.values[tier]}${up.suffix}`, { fontFamily: FONT, fontSize: "16px", color: "#2a7a3a" }));
        else card.add(this.add.text(12, 112, "Max upgrade lvl", { fontFamily: FONT, fontSize: "16px", color: "#888888" }));
        
        // cuadraditos que muestran el progreso de cada mejora, green = comprada, blanca = se pde comprar y gris = no se pde
        for (let i = 0; i < maxTier; i++) {
            const owned = i < tier; // bool q controla si tenemos o no la upgrade
            const locked = i + 1 > armory.level; // comprueba si la mejora esta bloqueada o no
            // cuadrados con el progreso
            const uRect = this.add.rectangle(12 + i * 30, 146, 24, 12, owned ? GREEN : 0xffffff).setOrigin(0, 0).setStrokeStyle(2, owned ? GREEN : locked ? GREY : 0x000000);
            if (!owned && locked) uRect.setFillStyle(0xe6e6e6);
            card.add(uRect);
        }
        
        // texto q sale cuando no pdes comprar la upgrade
        if (state === "locked") {
            card.add(this.add.text(12, 166, `Requires lvl ${tier + 1} of armory`, { fontFamily: FONT, fontSize: "14px", color: "#cc2222" }));
        } else if (state === "noOrbs") {
            card.add(this.add.text(12, 166, "Insufficient orbs", { fontFamily: FONT, fontSize: "14px", color: "#cc2222" }));
        }

        // comportamiento de las cartas
        frame.setInteractive({ useHandCursor: state !== "max" });
        frame.on("pointerover", () => { if (state === "ok") frame.setFillStyle(HOVER_CLR[index]); }); // cambia d color cuando el raton esta encima
        frame.on("pointerout", () => frame.setFillStyle(CARD_FILL)); // quita el color cuando sale
        frame.on("pointerdown", () => this.onCardClicked(up, card, x)); // llama a onCardClicked al pulsar

        return card;
    }

    // metodo q se llama cuando se hace click sobre una carta
    onCardClicked(up, card, baseX) {
        const result = this.armory.buyUpgrade(up.id);

        if (result === "ok") this.refreshUI();
        else this.shake(card, baseX);
    }

    // metodo q hace una pequeña animacion de shaking cuando no se pde comprar
    shake(card, baseX) {
        this.tweens.killTweensOf(card);
        card.x = baseX;
        // utilizamos lo del yoyo para q cuando termina se repita d manera inversa
        this.tweens.add({ targets: card, x: baseX + 6, duration: 40, yoyo: true, repeat: 3, onComplete: () => { card.x = baseX; } });
    }
}
