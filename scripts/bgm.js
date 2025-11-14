/*
    loads and plays the background music for the web page
*/
/** @type {HTMLAudioElement} */
const BGM = document.getElementById('bgm');
const PLAYER = document.getElementById('now-playing');

function addEventsListener(events, listener) {
    const subject = document.body;
    const func = (event) => {
        listener(event);
        for (const event of events) {
            subject.removeEventListener(event, func);
        }
    };
    for (const event of events) {
        subject.addEventListener(event, func);
    }
}

function showMusic() {
    PLAYER.style.opacity = '';
    PLAYER.style.scale = '';
}

function hideMusic() {
    PLAYER.style.opacity = 0;
    PLAYER.style.scale = 0;
}

const BARS = document.querySelectorAll('.spotify .bar');
const ANIMATION = BARS[0].style.animation;
function playMusic() {
    for (const bar of BARS) {
        bar.style.animation = ANIMATION;
    }
    BGM.play();
}

// hide and pause
function pauseMusic() {
    for (const bar of BARS) {
        // this affront to god extracts the current element height during the animation and forces a reflow 
        const currentHeight = bar.getBoundingClientRect().height;
        bar.style.animation = 'none';
        bar.style.height = `${currentHeight}px`;
        bar.offsetHeight;
        bar.style.height = '0';
    }
    BGM.pause();
}

hideMusic();
addEventsListener(['mousedown', 'touchend'], () => {
    showMusic();
    playMusic();
});

export {playMusic, pauseMusic};
