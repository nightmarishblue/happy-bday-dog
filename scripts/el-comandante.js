import { pauseMusic, playMusic } from "./bgm.js";

// loads random videos of che
const NUM_FILES = 4;

/** @type {HTMLVideoElement} */
const player = document.getElementById("el-comandante");
/** @type {HTMLAudioElement} */
const bgm = document.getElementById('bgm');
const queue = [...Array(NUM_FILES).keys()];
shuffle(queue);

function shuffle(a, _b, _c, _d) { // hacky; only pass a
    _c = a.length; while (_c) _b = Math.random() * (--_c + 1) | 0, _d = a[_c], a[_c] = a[_b], a[_b] = _d
}

function path(n) {
    return `./video/che/${queue[n] + 1}.webm`;
}

let next = 0;
const preloaded = document.createElement('video');
function preload() {
    const file = path(next);
    preloaded.src = file;
    preloaded.load();
}

function loadNext() {
    player.src = preloaded.src;
    next = (next + 1) % NUM_FILES;
    preload();
}

let musicWasPlaying = !bgm.paused;
function playVideo() {
    musicWasPlaying = !bgm.paused;
    if (musicWasPlaying) pauseMusic();
    player.play();
}

function pauseVideo() {
    player.pause();
    if (musicWasPlaying) playMusic();
}

preload();
loadNext();

player.addEventListener('ended', () => {
    loadNext();
    player.play();
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            playVideo();
        } else {
            pauseVideo();
        }
    })
});

observer.observe(player);