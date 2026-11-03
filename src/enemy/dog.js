import Enemy from "../enemy/enemy.js"
import Patrol from "../enemy/patrol.js"

/*
Clase del enemigo perro
Hereda de atributos Enemy y usa Patrol como comportamiento
*/
 
export default class Dog extends Enemy {
    constructor(scene, x, y, player, patrolPoints)
    {   const texture = 'dog';
        const vel = 200;
        const chaseVel=400;
        const damage = 20;
        const defense = 5;
        const life = 500;
        const cooldown = 800;
 
        super(scene, x, y, texture, vel,chaseVel, damage, defense, life, cooldown, player);
 
        // Comportamiento
        this.status = new Patrol(this, 200, 400, patrolPoints = [
            { x: x,       y: y },
            { x: x + 300, y: y },
            { x: x + 300, y: y + 250 },
            { x: x,       y: y + 250 },
        ]);
 
        this.scene.physics.add.collider(this, this.player, () => this.attack());
 
    }
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);
 
        const x = this.body.velocity.x;
        const y = this.body.velocity.y;

        if(Math.abs(x)>Math.abs(y))
        {
            if(x>0)
            this.play('dogRight', true);
            else 
            this.play('dogLeft', true);
        }
        else if(y>0)
        {
             this.play('dogDown', true);
        }
        else if(y<0)
        {
             this.play('dogUp', true);
        }
        
    }

}
