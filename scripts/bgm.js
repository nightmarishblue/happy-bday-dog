/*
    loads and plays the background music for the web page
*/
/** @type {HTMLAudioElement} */
const bgm = document.getElementById('bgm');
const player = document.getElementById('now-playing');

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

// show the player and start the music
function playMusic() {
    player.style.opacity = '';
    player.style.scale = '';
    bgm.play();
}

// hide and pause
function pauseMusic() {
    player.style.opacity = 0;
    player.style.scale = 0;
    bgm.pause();
}

pauseMusic();
addEventsListener(['mousedown', 'touchend'], playMusic);

export {playMusic, pauseMusic};