export default class Camera {

    static followPl(escena,player, lerp,zoom,ancho,alto)
    {
        const cam=escena.cameras.main;
        cam.startFollow(player,true,lerp,lerp)
        cam.setBounds(0, 0, 5000, 5000);
        cam.setZoom(zoom);
    }
}