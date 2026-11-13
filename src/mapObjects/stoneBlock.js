import resourceObject from "./resourceObject.js";

export default class stoneBlock extends resourceObject {
    constructor(scene, x, y, texture, itemGroup) {
        super(scene, x, y, texture, itemGroup, "pick", "stone", 3);
    }
}