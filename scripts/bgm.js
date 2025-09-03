/*
    loads and plays the background music for the web page
*/
const BGM_FILE = "./music/ram-ranch.opus";
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

    window.addEventListener('click', () => {
        player.style.opacity = 1;
        player.style.scale = 1;
        bgm.play();
    }, { once: true });
}, { once: true });