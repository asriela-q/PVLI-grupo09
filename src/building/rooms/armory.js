import statHandler from "../../player/statHandler.js";
import ROOMS_LIST from "../rooms.js";

export default class Armory extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, inventory) {
        super(scene, x, y, texture);
        this.inventory = inventory;

        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this, true);
    }

    interact(){
        //const room = ROOMS_LIST.find(r => r.room === 'armory');
        //this.stats.resetSleepyness(room.activeLevel);

        this.activateLevelingUp();
    }

    activateLevelingUp() {
        this.scene.scene.pause("main");
        console.log("sugoi");
        this.scene.scene.launch("CraftUI", { inventory: this.inventory, craft: 3, roomId: 'armory' });
    }
}