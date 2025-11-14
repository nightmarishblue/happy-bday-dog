document.addEventListener("DOMContentLoaded", () => {
    const div = document.getElementById("bmw-bong-trigger");
    const audio = document.getElementById("bmw-bong");

    div.addEventListener("click", () => {
    audio.play().catch(err => console.log("Playback failed:", err));
    });
});