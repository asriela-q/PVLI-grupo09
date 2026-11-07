import StatBar from "./barUIHandler.js"
import Camera from "./camera.js"


const hunger=100;
const thirst=100;
const sleepyness=100;

const hungerRate=20;
const sleepRate=5;
const thirstRate=2;
const hplossRate=2;


export default class statHandler
{
    constructor(scene,player){
        this.Player=player;

        this.hunger=hunger;
        this.thirst=thirst
        this.sleepyness=sleepyness;
        this.maxHunger=hunger;
        this.maxThirst=thirst;
        this.maxSleepyness=sleepyness;
        this.cam=Camera;
        this.scene=scene;
        
        this.hungerBar = new StatBar(this.scene, 1170, 300, 30,200, 0xE67E22,true).setScrollFactor(0).setDepth(200); //barra de vida
        this.thirstBar = new StatBar(this.scene, 1140, 300, 30, 200, 0x0000ff,true).setScrollFactor(0).setDepth(200); //barra de vida
        this.sleepynessBar = new StatBar(this.scene, 1110, 300, 30, 200, 0x808080,true).setScrollFactor(0).setDepth(200); //barra de vida
      
        }
        
        preUpdate(t, dt){
            console.log(this.hunger);
            const s = dt / 1000; // pasamos dt a segundos
            if(this.hunger>0)
                this.hunger-=s*hungerRate;
            if(this.thirst>0)
                this.thirst-=s*thirstRate;
            if(this.sleepyness>0)
                this.sleepyness-=s*sleepRate;
            
            this.hungerBar.updateBar(this.hunger,this.maxHunger);
            this.thirstBar.updateBar(this.thirst,this.maxThirst);
            this.sleepynessBar.updateBar(this.sleepyness,this.maxSleepyness);
            
            if(this.hunger<=0||this.thirst<=0||this.sleepyness<=0)
                {
                    this.Player.currentLife-=s*hplossRate;
                    this.Player.lifeBar.updateBar(this.Player.currentLife, this.Player.maxLife);
                    
            this.scene.cam.flash(dt)

        }
    }
}
