/*
    loads and plays the background music for the web page
*/
const BGM_FILE = "./music/ram-ranch.opus";

function addEventsListener(events, listener) {
    const func = (event) => {
        listener(event);
        for (const event of events) {
            window.removeEventListener(event, func);
        }
    };
    for (const event of events) {
        window.addEventListener(event, func);
    }
}

window.addEventListener('load', () => {
    // load the bgm file
    const bgm = document.createElement('audio');
    bgm.src = BGM_FILE;
    bgm.load();
    bgm.loop = true;
    // hide the player
    const player = document.getElementById('now-playing');
    player.style.opacity = 0;
    player.style.scale = 0;


    addEventsListener(['mousedown', 'touchend'], () => {
        player.style.opacity = '';
        player.style.scale = '';
        bgm.play();
    });
}, { once: true });