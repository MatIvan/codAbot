const stateElem = document.getElementById('status');

setInterval(update, 300);

function update() {
    fetch('/admin/api/status', { method: 'POST' })
        .then(response => response.json())
        .then((worldState) => {
            stateElem.innerHTML = JSON.stringify(worldState, undefined, 2);;
        });
}

function start() {
    fetch('/admin/api/start', { method: 'POST' })
        .then(response => response.json())
        .then((res) => {
            console.log('start: ', res);
        });
}

function stop() {
    fetch('/admin/api/stop', { method: 'POST' })
        .then(response => response.json())
        .then((res) => {
            console.log('stop: ', res);
        });
}
