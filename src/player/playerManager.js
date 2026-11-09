/*
Clase que maneja todo lo relacionado con el jugador, desde el movimiento hasta los atributos como
sueño, hambre, estamina, etc.
*/

import StatsBar from "./barUIHandler.js";
import Camera from "./camera.js";

// velocidad:
const RUN_SPEED = 650; // velocidad al correr
const WALK_SPEED = 270; // velocidad al caminar

const INTERACT_RANGE = 160; // rango para interactuar con objetos

// estamina:
const STAMINA = 5; // segundos que puede correr el jugador (estamina máxima)
const RECOVERY_CD = 1.5; // segundos de espera antes de recuperar estamina tras dejar de correr
const EXHAUST_CD = 4; // segundos de espera si la estamina llegó a 0 (más largo)

// vida:
const maxLife = 100; // vida máxima del jugador

const baseAttack = 15; // ataque base
const baseDefense = 15; // defensa base


export default class Psy extends Phaser.GameObjects.Container {

    constructor(scene, x, y, texture, inventory){
        super(scene, x, y, []);
        //Al ser un contenedor hay que añadir el sprite por separado
        this.sprite = this.scene.add.sprite(0, 0, texture);

        this.add(this.sprite);
        this.inventory = inventory;

        this.equipedItem = this.scene.add.sprite(20, 0, undefined); 
        this.equipedItem.setOrigin(0.5, 0.5).setScale(0.5, 0.5); //Pivote del arma con respecto al jugador
        this.add(this.equipedItem);
        

        this.scene.add.existing(this); // Nos añadimos a la escena para ser mostrados
        this.scene.physics.add.existing(this); // Le añadimos físicas al jugador
        this.body.setAllowGravity(false); // Así el jugador no cae por la gravidad de la física

        //Qué lleva el jugador en la mano
        this.equippedItem = null;
        this.updateEquipedItem(); //Al principio no llevará nada

        this.cursors = this.scene.input.keyboard.createCursorKeys(); // Añadimos las flechas al input

        // variables del constructor

        // movimiento:
        // añadimos las teclas para el input
        this.up = this.scene.input.keyboard.addKey('W');
        this.left = this.scene.input.keyboard.addKey('A');
        this.down = this.scene.input.keyboard.addKey('S');
        this.right = this.scene.input.keyboard.addKey('D');
        this.run = this.scene.input.keyboard.addKey('SHIFT');
        this.openInventory = this.scene.input.keyboard.addKey('E');
        this.interactKey = this.scene.input.keyboard.addKey('F');
        this.scene.input.on("pointerdown", (pointer)=>{
            if(pointer.leftButtonDown() && !inventory.isVisible) {
                if (this.equippedItem && this.equippedItem.type === "pick") this.picar();
                else if(this.equippedItem === null || this.equippedItem.type === "weapon") this.attack();
            }
        })

        // variables de movimiento
        this.moveDir = new Phaser.Math.Vector2(0, 0); // dirección de movimiento del jugador
        this.speed = WALK_SPEED; // velocidad del player (la inicializamos a la de caminar)
        this.isRunning = false; // detecta si 

        // estamina:
        this.currentStamina = STAMINA; // estamina actual del jugador
        this.recoveryTimer = 0; // segundos que faltan para que empiece a recuperarse la estamina (cooldown)
        this.isExhausted = false; // true si la estamina llegó a 0 y aún no ha pasado el cooldown largo

        // variables con la vida
        this.maxLife = maxLife;
        this.currentLife = maxLife; //Cuando creamos al jugador su vida es la máxima

        // inventario y UI
        this.inventory.render(this.scene, x + 20, y, this);
        this.lifeBar = new StatsBar(this.scene, -170, -250, 310, 50, 0xc14f4f).setScrollFactor(0).setDepth(200); //barra de vida
        scene.add.image(-230, -260, "vida").setOrigin(0, 0).setScrollFactor(0).setDepth(1000).setScale(0.5);
        this.staminaBar = new StatsBar(this.scene, -170, -180, 310, 50, 0xe5c57e).setScrollFactor(0).setDepth(200); // barra de estamina
        scene.add.image(-230, -195, "stamina").setOrigin(0, 0).setScrollFactor(0).setDepth(1000).setScale(0.5);

        // estadísticas del player
        this.playerAttack = baseAttack;
        this.bonusAttack = 0;
        this.playerDefense = baseDefense;

        // variables de acción
        this.facingDirection = "right"; //Dirección del último movimiento;
        this.isPerformingAction = false;

        // DEBUG BORRAR LUEGO
        this.rangeCircle = this.scene.add.circle(0, 0, INTERACT_RANGE); // x, y, radio
        this.rangeCircle.setStrokeStyle(2, 0xff0000); // borde rojo de 2 px
        this.add(this.rangeCircle); // lo metemos en el contenedor para que siga al jugador

        this.deathStone = undefined; // lápida del jugador
        
        this.body.setImmovable(true);//para que no pueda ser empujado 
        this.cam=Camera;
    }

    // método que gestiona las acciones del jugador mediante el input del usuario
    inputHandler(){
        const inventoryOpen = this.inventory.isVisible; // detecta si el inventario se abre o no
        this.moveDir.set(0, 0); // hacemos reset del vector a 0,0

        // si el inventario está abierto, ignora cualquier tipo de input relacionado con moverse
        if (!inventoryOpen) {
            // vertical
            if (this.up.isDown) {
                this.moveDir.y = -1;
                this.facingDirection = "up";
            }
            else if (this.down.isDown) {
                this.moveDir.y = 1;
                this.facingDirection = "down";
            }
            // horizontal
            if (this.right.isDown) {
                this.moveDir.x = 1;
                this.facingDirection = "right";
            }
            else if (this.left.isDown) {
                this.moveDir.x = -1;
                this.facingDirection = "left";
            }
        }

        const isMoving = this.moveDir.x !== 0 || this.moveDir.y !== 0; // true si se mueve en alguna de las dos direcciones (x o y), false si no se mueve para nada
        this.isRunning = isMoving && this.run.isDown && this.currentStamina > 0 && !this.isExhausted; // será true si se cumplen todas las condiciones para q pueda correr
        this.speed = this.isRunning ? RUN_SPEED : WALK_SPEED; // si isRunning es true, speed será igual a la velocidad de correr

        // normalizamos el vector y aplicamos el .scale() (multiplica el vector por el valor de scale, asiq ya le aplicamos la velocidad directamente y la metemos en el setVelocity)
        this.moveDir.normalize().scale(this.speed);
        this.body.setVelocity(this.moveDir.x, this.moveDir.y);
    }
    
    animationManager()
    {
        this.moveDir.normalize().scale(this.speed);
        // animaciones
        if (this.moveDir.x !== 0 || this.moveDir.y !== 0) {
            if (this.facingDirection === "left")       this.sprite.play('psyLeft', true);
            else if (this.facingDirection === "right") this.sprite.play('psyRight', true);
            else if (this.facingDirection === "up")    this.sprite.play('psyUp', true);
            else this.sprite.play('psyDown', true);
        }
        else {
         if (this.facingDirection === "left")       this.sprite.play('psyIdleL', true);
            else if (this.facingDirection === "right") this.sprite.play('psyIdleR', true);
            else if (this.facingDirection === "up")    this.sprite.play('psyIdleB', true);
            else this.sprite.play('psyIdleF', true);
        }
         this.sprite.anims.timeScale = this.isRunning ? 2:1;

    }

    // método para gestionar la stamina del jugador
    staminaManager(dt){
        const s = dt / 1000; // pasamos dt a segundos

        // comprobamos si el jugador está corriendo
        if (this.isRunning) {
            // drenamos la estamina mientras corremos y reiniciamos el cooldown de recuperación
            this.currentStamina -= s;
            this.recoveryTimer = RECOVERY_CD;

            // si se acaba la stamina empezamos el cooldown de exhausted (cooldown mas largo)
            if (this.currentStamina <= 0) {
                this.currentStamina = 0;
                this.isExhausted = true; // variable que no permite que el jugador corra mientras sea true
                this.recoveryTimer = EXHAUST_CD; // ponemos el timer al cooldown largo (cuando stamina = 0)
            }
        }
        // si caminamos mientras el cooldown siga en pie, lo vamos restando (se va agotando el cooldown y cuando sea = 0 podremos correr de nuevo)
        else if (this.recoveryTimer > 0) this.recoveryTimer -= s;
        else {
            this.isExhausted = false;
            // vamos recuperando estamina (para no pasarnos usamos el min entre el maximo y la actual)
            this.currentStamina = Math.min(STAMINA, this.currentStamina + s);
        }

        this.staminaBar.updateBar(this.currentStamina, STAMINA);
    }

    // metodo q devuelve si el jugador esta muerto (true) o no
    isDead(){
        return this.currentLife <= 0;
    }

    revive(xBase, yBase){
        this.currentLife = maxLife; // lo curamos por completo
        this.currentStamina = STAMINA; // recuperamos toda la stamina

        this.equippedItem = null;
        this.updateEquipedItem();
        // ponemos al jugador de nuevo en la base
        this.x = xBase;
        this.y = yBase;
    }

    preUpdate(t, dt){
        // lógica de psy
        this.sprite.preUpdate(t, dt);

        if (Phaser.Input.Keyboard.JustDown(this.interactKey) && !this.inventory.isVisible)
            this.checkInteractable();

        this.inputHandler();
        this.staminaManager(dt);
        this.animationManager();
        this.inventory.updatePosition(this.x + 20, this.y);
        if(Phaser.Input.Keyboard.JustDown(this.openInventory)) this.inventory.showInventory();
        
        const cam=this.scene.cameras.main;
        this.lifeBar.updateBar(this.currentLife, maxLife);
        if(this.currentLife<=maxLife/3)
        {
            this.scene.cam.flash(dt);
        }
    }

    checkInteractable(){
        const objects = this.scene.interactGroup.getChildren();
        let nearest = null; // guarda que objeto interactuable esta mas cerca del jugador (en el caso de que haya múltiples dentro del rango)
        let minDist = INTERACT_RANGE; // distancia del objeto mas cercano

        if (objects.length < 1) return; // si no hay objetos return

        for (let i = 0; i < objects.length; i++){
            // calculamos la distancia entre el jugador y el objeto
            const newDist = Phaser.Math.Distance.Between(this.x, this.y, objects[i].x, objects[i].y);

            if (newDist < minDist){
                nearest = objects[i];
                minDist = newDist; // cambiamos la distancia mínima
            }
        }

        if (nearest && nearest.interact) nearest.interact();
    }

    collectItem(player, item){ //El atributo del player aunque no se use en el método, a la hora de llamar al método hace falta
        const collected = this.inventory.addItemToInventory(item.itemId);
        if(collected) { //Si se ha podido recolectar el objeto
            item.destroy(); //Si el jugador recoge el objeto se destruye del mapa
        }
    }

    takeDamage(damageAmount) {
        let totalDamage = damageAmount - this.playerDefense;
        totalDamage = Math.max(1, totalDamage); //Esto es para que si por lo que sea sale que el daño es negativo hacer 1 de daño
        this.currentLife -= totalDamage;
        if(this.currentLife <= 0)
        {
            this.currentLife = 0; //Se evita que tomen valores negativos
            //Si hay que hacer alguna animación/comportamiento de muerte o algo se pone aquí
        }
        this.lifeBar.updateBar(this.currentLife, this.maxLife);
      
    }

    /*
    Método que maneja la lógica de ataque de Psy.
    Este método también manejará la animación de ataque cuando exista
    */
    attack(){
        if (this.isPerformingAction) return;

        let posAttackX = this.x, posAttackY = this.y, colliderHeight = 50, colliderWidth = 70; 

        //Miramos la última dirección del jugador y colocamos el collider en función de ello
        if (this.facingDirection === 'right') {
            posAttackX = this.x + 50;
        } else if (this.facingDirection === 'left') {
            posAttackX = this.x - 50;
        } else if (this.facingDirection === 'up') {
            posAttackY = this.y - 50;
        } else if (this.facingDirection === 'down') {
            posAttackY = this.y + 50;
        }

        if (!this.equippedItem || this.equippedItem.type === "weapon") {
            this.isPerformingAction = true;
            //Creamos el collider del arma
            let attackCollider = this.scene.add.zone(posAttackX, posAttackY, colliderWidth, colliderHeight);
            this.scene.physics.add.existing(attackCollider);
            attackCollider.body.setAllowGravity(false);

            //Si hay un enemigo con la capacidad de ser atacado le resta vida
            if(this.scene.enemiesGroup) {
                this.scene.physics.add.overlap(attackCollider, this.scene.enemiesGroup, (hitbox, enemy)=>{
                    if(enemy.takeDamage) {
                        let totalAttack = this.playerAttack + this.bonusAttack; //TODO: variar el bonus attack en función de qué arma esté equipada
                        enemy.takeDamage(totalAttack);
                    }
                }, null, this);
            }

            //El collider desaparece después de un cooldown
            this.scene.time.delayedCall(150, () => {
                attackCollider.destroy();
                this.isPerformingAction = false;
            });
        }
    }

    picar(){
        if (this.isPerformingAction) return;

        let posColliderX = this.x, posColliderY = this.y, colliderHeight = 50, colliderWidth = 70; 

        //Miramos la última dirección del jugador y colocamos el collider en función de ello
        if (this.facingDirection === 'right') {
            posColliderX = this.x + 50;
        } else if (this.facingDirection === 'left') {
            posColliderX = this.x - 50;
        } else if (this.facingDirection === 'up') {
            posColliderY = this.y - 50;
        } else if (this.facingDirection === 'down') {
            posColliderY = this.y + 50;
        }

        if(this.equippedItem.type === "pick") {
            this.isPerformingAction = true;
            let pickZone = this.scene.add.zone(posColliderX, posColliderY, colliderWidth, colliderHeight);
            this.scene.physics.add.existing(pickZone);
            pickZone.body.setAllowGravity(false);
            if (this.scene.stoneGroup) {
                this.scene.physics.add.overlap(pickZone, this.scene.stoneGroup, (hitbox, rockBlock) => { rockBlock.mine();}, null, this);
            }
        
            this.scene.time.delayedCall(150, () => {
                pickZone.destroy();
                this.isPerformingAction = false;
            });
        }
        
    }

    updateEquipedItem() {
        if (this.equippedItem && this.scene.textures.exists(this.equippedItem.id)) {
            this.equipedItem.setTexture(this.equippedItem.id);
            this.equipedItem.setVisible(true);
        } 
        else {
            this.equipedItem.setVisible(false);
        }
    }

    equipItemFromInventory(itemId) {
        const itemInfo = this.inventory.ITEM_ENCYCLOPEDIA[itemId];
        if (itemInfo && (itemInfo.type === "weapon" || itemInfo.type === "pick")) {
        //Guardamos el id y su tipo para saber qué puede hacer después
        this.equippedItem = {
            id: itemId,
            type: itemInfo.type
        };} 
        else {
            this.equippedItem = null; //Desequipa si seleccionas algo que no es una herramienta
        }
    
        console.log(itemInfo);
        this.updateEquipedItem();
    }
}
