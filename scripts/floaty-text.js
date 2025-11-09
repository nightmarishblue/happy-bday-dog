const DELAY_INCREMENT = 0.1;

for (const el of document.getElementsByClassName("floaty-text")) {
    /** @type {string} */
    const text = el.dataset.text;
    el.innerHTML = text
        .split('')
        .map((char, i) => {
            const displayChar = char === ' ' ? '&nbsp;' : char;
            return `<span class="floaty-char" style="animation-delay:${i * DELAY_INCREMENT}s;">${displayChar}</span>`
        })
        .join('');
}