import { pauseMusic, playMusic } from "./bgm.js";

// loads random videos of che
const NUM_FILES = 4;

/** @type {HTMLVideoElement} */
const PLAYER = document.getElementById("el-comandante");
/** @type {HTMLAudioElement} */
const BGM = document.getElementById('bgm');
const QUEUE = [...Array(NUM_FILES).keys()];
shuffle(QUEUE);

function shuffle(a, _b, _c, _d) { // hacky; only pass a
    _c = a.length; while (_c) _b = Math.random() * (--_c + 1) | 0, _d = a[_c], a[_c] = a[_b], a[_b] = _d
}

function path(n) {
    return `./video/che/${QUEUE[n] + 1}.webm`;
}

let next = 0;
const preloaded = document.createElement('video');
function preload() {
    const file = path(next);
    preloaded.src = file;
    preloaded.load();
}

function loadNext() {
    PLAYER.src = preloaded.src;
    next = (next + 1) % NUM_FILES;
    preload();
}

let musicWasPlaying = !BGM.paused;
function playVideo() {
    musicWasPlaying = !BGM.paused;
    if (musicWasPlaying) pauseMusic();
    PLAYER.play();
}

function pauseVideo() {
    PLAYER.pause();
    if (musicWasPlaying) playMusic();
}

preload();
loadNext();

PLAYER.addEventListener('ended', () => {
    loadNext();
    PLAYER.play();
});

const OBSERVER = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            playVideo();
        } else {
            pauseVideo();
        }
    })
});

OBSERVER.observe(PLAYER);