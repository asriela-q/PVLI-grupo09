import resourceObject from "./resourceObject.js";

export default class plants extends resourceObject {
    constructor(scene, x, y, texture, itemGroup) {
        super(scene, x, y, texture, itemGroup, "shove,", "sheeds", 3);
    }
}