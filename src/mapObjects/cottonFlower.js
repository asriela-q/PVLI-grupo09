import resourceObject from "./resourceObject.js";

export default class cottonFlower extends resourceObject {
    constructor(scene, x, y, texture, itemGroup) {
        super(scene, x, y, texture, itemGroup, "shovel", "cotton", 3);
    }
}