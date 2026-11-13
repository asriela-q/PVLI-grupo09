import resourceObject from "./resourceObject.js";

export default class rubbleBlock extends resourceObject {
    constructor(scene, x, y, texture, itemGroup) {
        super(scene, x, y, texture, itemGroup, "shovel", "brick", 3);
    }
}