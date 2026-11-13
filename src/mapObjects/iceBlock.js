import resourceObject from "./resourceObject.js";

export default class IceBlock extends resourceObject {
    constructor(scene, x, y, texture, itemGroup) {
        super(scene, x, y, texture, itemGroup, "pick", "ice", 3);
    }
}