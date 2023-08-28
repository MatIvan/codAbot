//@ts-check
import AdminApi from "./api/AdminApi";
import HooksManager from './HooksManager';

const UPDATE_MS = 1000;
let timer;

function updatingStart() {
    if (!timer) {
        log('updating started.');
        timer = setInterval(update, UPDATE_MS);
    } else {
        log('updating already started.');
    }
}

function updatingStop() {
    log('updating stoped.');
    clearInterval(timer);
    timer = null;
}

function update() {
    AdminApi.status()
        .then((worldState) => {
            HooksManager.fire('admin.status', worldState);
        });
}

const logs = [];
function log(msg) {
    console.log('AdminService: ' + msg);
    logs.push(msg);
    HooksManager.fire('admin.logs', [...logs]);
}

function start() {
    AdminApi.start()
        .then(() => { log('Game start.') })
}

function stop() {
    AdminApi.stop()
        .then(() => { log('Game stop.') })
}

const AdminService = {
    start,
    stop,
    updatingStart,
    updatingStop,
}
export default AdminService;
