

(function toggleScroll() {
    const hilite = document.getElementById('.highlight-rouge');
    hilite.style.height = 80;
    if (hilite.clientHeight >= 100) {
        hilite.style.overflowY = "scroll"
    } else {
        hilite.style.overflowY = "noscroll"
    }
})()