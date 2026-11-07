/*
Clase que maneja toda la lógica de ataque y atributos relacionado con el enemigo*/
import StatsBar from "../player/barUIHandler.js";
import Item from "../objectsAndInventory/items.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
constructor(scene, x, y, texture,vel,chaseVel,damage, defense, life,cooldown=1000,player)
{
    super(scene, x, y, texture);
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this);
     this.body.setAllowGravity(false);

    this.patrolVelocity = vel; //velocidad del enemigo
    this.chaseVelocity = chaseVel;
    this.damage = damage; //daño que hará el enemigo
    this.defense = defense; //defensa del enemigo
    this.currentLife = life; //vida del enemigo
    this.maxLife = life;
    this.player = player;
    this.key = null;
    this.group = null; // grupo de fisicas de los objetos

    //para manejar tiempo entre ataques
     this.cooldown = cooldown;
    //this.lastAttack=-cooldown; //inicializado a -cooldown para que el enemigo pueda atacar desde el principio

     //this.attackRange=80;

     this.lifeBar = new StatsBar(this.scene, x, y, 100, 25, 0x56F85400).setDepth(200); //barra de vida

     //comportamiento del enemigo, lo iniciamos vacio para decirlo que todavia no haga nada
     this.status = null;

     this.itemDrops = scene.cache.json.get("enemyDrops"); // json con los drops de los enemigos
     this.ITEM_ENCYCLOPEDIA = scene.cache.json.get("infoItems");

     this.minRange = 1; // cantidad minima de items
     this.maxRange = 3; // cantidad maxima de items

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

    //método que gestiona el ataque al jugador
    attack()
    {
        if (!this.canAttack()) return;
        this.player.takeDamage(this.damage);
    }

    preUpdate(t, dt){

        super.preUpdate(t,dt);

        if(this.lifeBar)
        {
            this.lifeBar.x = this.x - this.lifeBar.originalWidth /2; 
            this.lifeBar.y = this.y - this.displayHeight /2 - 10;
        }

        //si tiene algun comportamiento, lo ejecuta
        if (this.status) this.status.preUpdate(t, dt);
    }

    //método que gestiona el daño que recibe el enemigo
    takeDamage(recDamage)
    {
        //this.currentLife-=recDamage*(100/(100+this.defense));
        let totalDamage = recDamage - this.defense;
        this.currentLife -= totalDamage;
        if(this.currentLife<=0)
        {
            // TODO: hacer q el enemigo dropee bullshit
            this.currentLife = 0
            this.lifeBar.destroy();
            this.lifeBar = null;
            this.dropItems();
            this.destroy();
        }
        else{
            this.lifeBar.updateBar(this.currentLife, this.maxLife);
        }
    }

    // método para la gestión de dropear items
    dropItems(){
        const enemyData = this.itemDrops[this.key];
        console.log(this.key);
        let dataArray = Object.keys(enemyData); // array para poder utilizar la propiedad length pq los json son una mierda y me sale undefined nmo puedo mas, lo q hace el keys es coger los nombres de los objetos dentro del enemigo (los nombres de los items)

        let rng = Math.random() * 100;
        for (let i = 0; i < dataArray.length; i++){
            let n = dataArray[i]; // guarda el nombre del objeto para poder buscarlo en el json
            if (rng < enemyData[n].probability) {
                this.itemSpawner(dataArray[i]);
            }
        }

    }

    // metodo auxiliar para spawnear los items y una cantidad rtandom
    itemSpawner(data){
        if (!this.ITEM_ENCYCLOPEDIA[data]) console.log("olaolaolaolaola fea y gorda");

        let nItems = 1; // valor para los items q son armas/armaduras/key items cualquier cosa menos un resource vamos
        if (this.ITEM_ENCYCLOPEDIA[data].type == "resource"){
            const r = Math.random() * (this.maxRange - this.minRange + 1) + this.minRange; // num entre minRange y maxRange + 1
            nItems = Math.floor(r); // cogemos el entero redondeando hacia abajo
        }

        for (let i = 0; i < nItems; i++)
            this.group.add(new Item(this.scene, this.x, this.y, this.ITEM_ENCYCLOPEDIA[data].texture, data, this.ITEM_ENCYCLOPEDIA).setScale(0.15));
        return true;
    }

}