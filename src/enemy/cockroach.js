import Enemy from "../enemy/enemy.js"
import Patrol from "../enemy/patrol.js"

export default class Cockroach extends Enemy { 
constructor(scene, x, y, player, itemGroup, patrolPoints)
    {   const texture = 'ghost';
        const vel = 200;
        const chaseVel = 400;
        const damage = 25;
        const defense = 60;
        const life = 500;
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
        this.key = "cockroach"; // tipo de enemigo para el drop de items
        this.group = itemGroup; // grupo de fisicas de los items

    }
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);
 
        const x = this.body.velocity.x;
        const y = this.body.velocity.y;
        
        //TODO: animación del fantasma
        
        if(Math.abs(x) > Math.abs(y))
        {
            if(x>0)
            this.play('cockroachRight', true);
            else 
            this.play('cockroachLeft', true);
        }
        else if(y > 0)
        {
            this.play('cockroachDown', true);
        }
        else 
        {
            this.play('cockroachUp', true);
        }

        this.anims.timeScale = this.status.state === 'CHASE' ? 1.7 : 1;
        
    }

}