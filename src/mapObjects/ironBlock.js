import resourceObject from "./resourceObject.js";

export default class ironBlock extends resourceObject {
    constructor(scene, x, y, texture, itemGroup) {
        super(scene, x, y, texture, itemGroup, "pick", "iron", 3);
    }
}