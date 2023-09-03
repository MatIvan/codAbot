//@ts-check
///<reference path='../Types.js'/>

import View from "./View";

function show() {
    View.show();
}

function hide() {
    View.hide();
}

/* *
 * @param {WorldState} world 
 */
function tick(world) {
    if (!world) {
        View.clean();
        return;
    }
    View.drawWorld(world);
}

const Engine = {
    show,
    hide,
    tick
}
export default Engine;
