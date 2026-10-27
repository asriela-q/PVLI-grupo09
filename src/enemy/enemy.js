/*
Clase que maneja toda la lógica de ataque y atributos relacionado con el enemigo*/
import StatsBar from "../player/barUIHandler.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
constructor(scene, x, y, texture,vel,damage, defense, life,cooldown=1000,player)
{
    super(scene, x, y, texture);
     this.scene.add.existing(this); 
     this.scene.physics.add.existing(this); 
     this.body.setAllowGravity(false); 

    this.patrolVelocity=vel; //velocidad del enemigo
    this.chaseVelocity=vel+(vel/2)-50;
    this.damage=damage; //daño que hará el enemigo
    this.defense=defense; //defensa del enemigo
    this.currentLife=life; //vida del enemigo
    this.maxLife=life;
    this.player=player;

    //para manejar tiempo entre ataques
     this.cooldown=cooldown;
     this.lastAttack=-cooldown; //inicializado a -cooldown para que el enemigo pueda atacar desde el principio

     //this.attackRange=80;

     this.lifeBar = new StatsBar(this.scene, x, y, 100, 25, 0x56F85400).setDepth(200); //barra de vida

     //comportamiento del enemigo, lo iniciamos vacio para decirlo que todavia no haga nada
     this.status=null;
}

//método que maneja el cooldown y mirar si puede atacar o no
canAttack()
{
    const now = this.scene.time.now
    if(now-this.lastAttack<this.cooldown){
        return false;}
    this.lastAttack = now;
    return true;

}
IsAlive()
{
    if(this.vida>0)return true;
}

preUpdate(t, dt){

    super.preUpdate(t,dt);

    if(this.lifeBar)
    {
        this.lifeBar.x=this.x - this.lifeBar.originalWidth / 2; 
        this.lifeBar.y=this.y - this.displayHeight / 2 - 10;
    }

    //si tiene algun comportamiento, lo ejecuta
    if (this.status) this.status.preUpdate(t, dt);
}

//método que gestiona el daño que recibe el enemigo
takeDamage(recDamage)
{
    this.currentLife-=recDamage*(100/(100+this.defense));
    if(this.currentLife<=0)
    {
        this.currentLife=0
        this.lifeBar.destroy();
        this.lifeBar=null;
        this.destroy();
    }
    else{
        this.lifeBar.updateBar(this.currentLife, this.maxLife);
    }
}




}