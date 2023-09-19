import * as tslib_1 from "tslib";
import * as React from "react";
import { useGestureResponder } from "react-gesture-responder";
import { animated, interpolate, useSpring } from "react-spring";
import { GridItemContext } from "./GridItemContext";
export function GridItem(_a) {
    var children = _a.children, style = _a.style, className = _a.className, other = tslib_1.__rest(_a, ["children", "style", "className"]);
    var context = React.useContext(GridItemContext);
    if (!context) {
        throw Error("Unable to find GridItem context. Please ensure that GridItem is used as a child of GridDropZone");
    }
    var top = context.top, disableDrag = context.disableDrag, endTraverse = context.endTraverse, onStart = context.onStart, mountWithTraverseTarget = context.mountWithTraverseTarget, left = context.left, i = context.i, onMove = context.onMove, onEnd = context.onEnd, grid = context.grid, isDragging = context.dragging;
    var columnWidth = grid.columnWidth, rowHeight = grid.rowHeight;
    var dragging = React.useRef(false);
    var startCoords = React.useRef([left, top]);
    var _b = tslib_1.__read(useSpring(function () {
        if (mountWithTraverseTarget) {
            // this feels really brittle. unsure of a better
            // solution for now.
            var mountXY = mountWithTraverseTarget;
            endTraverse();
            return {
                xy: mountXY,
                immediate: true,
                zIndex: "1",
                scale: 1.1,
                opacity: 0.8
            };
        }
        return {
            xy: [left, top],
            immediate: true,
            zIndex: "0",
            scale: 1,
            opacity: 1
        };
    }), 2), styles = _b[0], set = _b[1];
    // handle move updates imperatively
    function handleMove(state, e) {
        var x = startCoords.current[0] + state.delta[0];
        var y = startCoords.current[1] + state.delta[1];
        set({
            xy: [x, y],
            zIndex: "1",
            immediate: true,
            opacity: 0.8,
            scale: 1.1
        });
        onMove(state, x, y);
    }
    // handle end of drag
    function handleEnd(state) {
        var x = startCoords.current[0] + state.delta[0];
        var y = startCoords.current[1] + state.delta[1];
        dragging.current = false;
        onEnd(state, x, y);
    }
    var bind = useGestureResponder({
        onMoveShouldSet: function (state) {
            if (disableDrag) {
                return false;
            }
            onStart();
            startCoords.current = [left, top];
            dragging.current = true;
            return true;
        },
        onMove: handleMove,
        onTerminationRequest: function () {
            if (dragging.current) {
                return false;
            }
            return true;
        },
        onTerminate: handleEnd,
        onRelease: handleEnd
    }, {
        enableMouse: true
    }).bind;
    /**
     * Update our position when left or top
     * values change
     */
    React.useEffect(function () {
        if (!dragging.current) {
            set({
                xy: [left, top],
                zIndex: "0",
                opacity: 1,
                scale: 1,
                immediate: false
            });
        }
    }, [dragging.current, left, top]);
    var props = tslib_1.__assign({ className: "GridItem" +
            (isDragging ? " dragging" : "") +
            (!!disableDrag ? " disabled" : "") +
            className
            ? " " + className
            : "" }, bind, { style: tslib_1.__assign({ cursor: !!disableDrag ? "grab" : undefined, zIndex: styles.zIndex, position: "absolute", width: columnWidth + "px", opacity: styles.opacity, height: rowHeight + "px", boxSizing: "border-box", transform: interpolate([styles.xy, styles.scale], function (xy, s) {
                return "translate3d(" + xy[0] + "px, " + xy[1] + "px, 0) scale(" + s + ")";
            }) }, style) }, other);
    return typeof children === "function" ? (children(animated.div, props, {
        dragging: isDragging,
        disabled: !!disableDrag,
        i: i,
        grid: grid
    })) : (React.createElement(animated.div, tslib_1.__assign({}, props), children));
}
