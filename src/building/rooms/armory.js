import ARMORY_COLUMNS, { ARMORY_MAX_LEVEL } from "../armoryUpgradeInfo.js";

export default class Armory extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, player, stats) {
        super(scene, x, y, texture);
        this.player = player;
        this.stats = stats;
        this.level = 1;

        if (!this.player.armoryTiers) {
            this.player.armoryTiers = { attack: 0, attackSpeed: 0, defense: 0, hp: 0, stamina: 0, staminaRecovery: 0 };
        }

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }

    // al interactuar sale como si fuese un skill tree con las distintas mejoras q se pueden realizar, el nivel de las mejoras está ligado al nivel de la armería
    interact() {
        this.scene.scene.pause("main");
        this.scene.scene.launch("ArmoryUI", { armory: this });
    }

    upgradeArmory() {
        if (this.level < ARMORY_MAX_LEVEL) this.level += 1;
    }

    // metodo para buscar una mejora por el id
    findUpgrade(id) {
    for (const column of ARMORY_COLUMNS) {
        const found = column.upgrades.find(u => u.id === id); // el find busca para la variable u su id (vamos q simplemente busca q exista el id)
        if (found) return found;
    }
        return null;
    }

    // es como un getter (devuelve la tier segun el id)
    getTier(id) {
        return this.player.armoryTiers[id];
    }

    // devuelve el valor del bonus q hemos comprado
    getCurrentValue(upgrade) {
        const tier = this.getTier(upgrade.id);
        return tier > 0 ? upgrade.values[tier - 1] : 0; // si es 0 es q no hemos comprado ninguna upgrade aún
    }

    // es un metodo que devuelve el 'por qué' se puede o no comprar algo
    checkUpgrade(id) {
        const upgrade = this.findUpgrade(id);
        const tier = this.getTier(id);

        // aqui comprobamos los distintos posibles casos de si se compra la upgrade o no
        if (tier >= upgrade.values.length) return 'max'; // si ha llegado al maximo, return max
        if (tier + 1 > this.level) return 'locked'; // si la armeria tiene menor niverl q la upgrade q queremos comprar, no le dejamos
        if (this.player.auraOrbs < upgrade.costs[tier]) return 'noOrbs'; // si eres pobre no compras por idiota
        return 'ok'; // puedes comprarlo no problem
    }

    // metodo q gestiona la compra de las upgrades
    buyUpgrade(id) {
        const condition = this.checkUpgrade(id); // miramos a ver si podemos comprar la upgrade seleccionada
        if (condition !== 'ok') return condition;

        const upgrade = this.findUpgrade(id);
        const tier = this.getTier(id);
        const oldValue = this.getCurrentValue(upgrade); // variable para guardar el valor de la upgrade anterior para sumar luego la diferencia

        this.player.auraOrbs -= upgrade.costs[tier]; // le restamos al jugador el coste de los orbes
        this.player.armoryTiers[id] = tier + 1; // subimos la tier de la upgrade

        this.applyBonus(id, upgrade.values[tier] - oldValue);
        return 'ok';
    }

    // método q aplica las upgrades compradas directamente (aqui estan todas las distintas upgrades)
    applyBonus(id, uValue) {
        const p = this.player;
        switch (id) {
            case 'attack': // + base atk
                p.playerAttack += uValue;
                break;
            case 'attackSpeed': // + atk speed
                p.attackSpeed += uValue / 100;
                break;
            case 'defense': // + base def
                p.playerDefense += uValue;
                if (this.stats) this.stats.defense += uValue;
                break;
            case 'hp': // + max hp
                p.maxLife += uValue;
                p.currentLife += uValue;
                break;
            case 'stamina': // + max stamina
                p.maxStamina += uValue;
                p.currentStamina += uValue;
                break;
            case 'staminaRecovery': // + vel de recovery
                p.staminaRecovery += uValue / 100;
                break;
        }
    }
}


