import resourceObject from "./resourceObject.js";

export default class Tree extends resourceObject {
    constructor(scene, x, y, texture, itemGroup) {
        super(scene, x, y, texture, itemGroup, "axe", "wood", 3);
    }
}