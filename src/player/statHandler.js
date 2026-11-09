/*Clase que modifica los valores de las estadisticas de supervivencia*/

import StatBar from "./barUIHandler.js"
import Camera from "./camera.js"
import{RUN_SPEED,baseDefense} from "./playerManager.js"

const hunger=100;
const hygiene=100;
const sleepyness=100;

//para controlar como de rapido o lento se quite
const hungerRate=2;
const sleepRate=1;
const hygieneRate=20;
const hpLossRate=2; 


export default class statHandler
{
    constructor(scene,player){
        this.Player = player;

        this.hunger = hunger;
        this.hygiene = hygiene
        this.sleepyness = sleepyness;

        this.maxHunger = hunger;
        this.maxHygiene = hygiene;
        this.maxSleepyness = sleepyness;
        this.defense = this.Player.playerDefense;
        this.cam = Camera;
        this.scene = scene;
        this.runSpeed = RUN_SPEED;

        this.wait = 10000; //tiempo que espera entre cada pulga
        this.timer = 0;
        this.Inventory = scene.psyInventory;
        this.hungerBar = new StatBar(this.scene, 1170, 300, 30,200, 0xE67E22,true).setScrollFactor(0).setDepth(200); //barra de hunger
            scene.add.image(1170, 55, "hunger").setOrigin(0, 0).setScrollFactor(0).setDepth(1000).setScale(3);
        this.hygienetBar = new StatBar(this.scene, 1140, 300, 30, 200, 0x5b94e0,true).setScrollFactor(0).setDepth(200); //barra de higiene
            scene.add.image(1140, 55, "higiene").setOrigin(0, 0).setScrollFactor(0).setDepth(1000).setScale(3);

        this.sleepynessBar = new StatBar(this.scene, 1110, 300, 30, 200, 0x908f9a,true).setScrollFactor(0).setDepth(200); //barra de sueño
            scene.add.image(1110, 55, "sueño").setOrigin(0, 0).setScrollFactor(0).setDepth(1000).setScale(3);
        }
        
        preUpdate(t, dt){
            this.timer += dt;
            const s = dt / 1000; // pasamos dt a segundos
            if(this.hunger > 0)
                this.hunger -= s*hungerRate;
            if(this.hygiene>0)
                this.hygiene -= s*hygieneRate;
            if(this.sleepyness > 0)
                this.sleepyness -= s*sleepRate;
            
            this.hungerBar.updateBar(this.hunger,this.maxHunger);
            this.hygienetBar.updateBar(this.hygiene,this.maxHygiene);
            this.sleepynessBar.updateBar(this.sleepyness,this.maxSleepyness);
            
            //si llega a 0 , empieza a quitar vida
            if(this.hunger<=0)
            {
                this.Player.currentLife -= s*hpLossRate;
                this.Player.lifeBar.updateBar(this.Player.currentLife, this.Player.maxLife);
                //efecto de flasheo en pantalla
                this.scene.cam.flash(dt)
            }
            //si llega a 0 cambia vel de correr
            if (this.sleepyness <= 0)
            {
               this.Player.runSpeed = 400;
            }
            else this.Player.runSpeed=this.runSpeed;
            
            //si llega a 0 disminuye defensa
            if(this.hygiene <= 0)
            {
                if(this.Player.playerDefense/2 > baseDefense)//cambiar
                this.Player.playerDefense = this.defense - this.defense/2;

                if(this.timer > this.wait){
                this.timer = 0;
                this.Inventory.blockInventory();
                }
            }

            // if(this.hygiene<=0&&this.timer>this.wait)
            // {
            //     this.timer=0;
            //     this.Inventory.blockInventory();
            // }
            console.log(this.Player.playerDefense);

    }
}
