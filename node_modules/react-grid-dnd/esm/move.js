import * as tslib_1 from "tslib";
export function move(source, destination, droppableSource, droppableDestination) {
    var sourceClone = Array.from(source);
    var destClone = Array.from(destination);
    var _a = tslib_1.__read(sourceClone.splice(droppableSource, 1), 1), removed = _a[0];
    destClone.splice(droppableDestination, 0, removed);
    return [sourceClone, destClone];
}
