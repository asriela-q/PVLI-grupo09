export default class Camera {

    constructor(escena,player, lerp, zoom, ancho, alto,duration=1000,color={r:120,g:0,b:0})
    {
        this.scene=escena;
        this.player=player;
        this.lerp=lerp;
        this.zoom=zoom;
        this,ancho=ancho;
        this.alto=alto;
        this.duration=duration;
        this.timer=0;
        this.wait=600;
        this.color=color;

         this.scene.cameras.main.flashEffect.alpha = 0.3;
    }
    followPl()
    {
        const cam=this.scene.cameras.main;
        cam.startFollow(this.player, true, this.lerp, this.lerp)
        cam.setBounds(0, 0, this.ancho, this.alto);
        cam.setZoom(this.zoom);
    }

    flash(dt)
    {
        const cam=this.scene.cameras.main;
        this.timer+=dt;
        const { r, g, b } = this.color;
        if(!cam.flashEffect.isRunning&&this.timer>=this.wait){
            this.time=0;
            cam.flash(this.duration,r,0,0);
        }
    }
}