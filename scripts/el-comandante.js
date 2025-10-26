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


let next = 0;
function loadNext() {
    player.src = `./video/che/${queue[next] + 1}.webm`;
    next = (next + 1) % NUM_FILES;
    player.load();
}

let musicWasPlaying = !bgm.paused;
function playVideo() {
    musicWasPlaying = !bgm.paused;
    if (musicWasPlaying) bgm.pause();
    player.play();
}

function pauseVideo() {
    player.pause();
    if (musicWasPlaying) bgm.play();
}

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