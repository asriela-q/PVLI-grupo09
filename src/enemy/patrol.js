/*Clase que maneja el comportamineto del enemigo*/

//basicamente un enumerador para gestionar el estado del enemigo
const EnemyState=Object.freeze({
    PATROL:'PATROL',
    CHASE:'CHASE'

});
export default class Patrol {
    constructor(enemy, detectDistance=100,leaveDistance=300,patrolPoints=[
            { x: 200, y: 300 },
            { x: 500, y: 300 },
            { x: 500, y: 500 },])
    {
        this.enemy=enemy;
        this.detectDistance=detectDistance;
        this.leaveDistance=leaveDistance;
        this.patrolPoints = patrolPoints;
        this.state = EnemyState.PATROL; 
        this.index=0; //indice para gestionar las posiciones donde debe ir
    }

    //método que gestiona el movimiento de perseguir el jugador
    chasePlayer(player) {
        this.enemy.scene.physics.moveToObject(this.enemy, player, this.enemy.chaseVelocity);
    }

    //método que gestiona eñ movimiento de patrullar del enemigo
    patrol()
    {
        const target = this.patrolPoints[this.index];
        const distanceToTarget = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, target.x, target.y);
        //si llega al punto, empiza a moverse al siguiente punto
        if (distanceToTarget < 5) {
            this.index = (this.index + 1) % this.patrolPoints.length;
        }
        this.enemy.scene.physics.moveToObject(this.enemy, this.patrolPoints[this.index],this.enemy.patrolVelocity);
    }

   preUpdate(t, dt){
        const player = this.enemy.player;
        const distanceToPlayer = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, player.x, player.y);
        if(this.state===EnemyState.PATROL&&distanceToPlayer<=this.detectDistance)
        {
            this.state=EnemyState.CHASE;
            
        }else if (this.state === 'CHASE' && distanceToPlayer > this.leaveDistance) {

            this.state = EnemyState.PATROL;
        }

        if (this.state === EnemyState.PATROL) {
            this.patrol();
        } else {
            this.chasePlayer(player);
        }

    }

}
