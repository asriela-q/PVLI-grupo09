import Enemy from "../enemy/enemy.js"
import Patrol from "../enemy/patrol.js"

export default class Ghost extends Enemy {
    constructor(scene, x, y, player, itemGroup, patrolPoints)
    {   const texture = 'ghost';
        const vel = 200;
        const chaseVel = 400;
        const damage = 40;
        const defense = 20;
        const life = 300;
        const cooldown = 800;

        super(scene, x, y, texture, vel, chaseVel, damage, defense, life, cooldown, player);
 
        // Comportamiento
        this.status = new Patrol(this, 200, 400, patrolPoints = [
            { x: x,       y: y },
            { x: x + 300, y: y },
            { x: x + 300, y: y + 250 },
            { x: x,       y: y + 250 },
        ]);
 
        this.scene.physics.add.collider(this, this.player, () => this.attack());
        this.key = "ghost"; // tipo de enemigo para el drop de items
        this.group = itemGroup; // grupo de fisicas de los items

    }
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);
 
        const x = this.body.velocity.x;
        const y = this.body.velocity.y;
        
        //TODO: animación del fantasma

        this.anims.timeScale = this.status.state === 'CHASE' ? 1.7 : 1;
        
    }

}
