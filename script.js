
const hilite = document.querySelectorAll('pre.highlight');

hilite.forEach(element => {
    if (element.getBoundingClientRect().height >= 300) {
        element.style.cssText = "height: 300px";
        element.style.overflowY = "scroll";
    } else {
        element.style.overflowY = "noscroll"
        element.style.cssText = "box-shadow: 2px 0px 1px #46e4db";
    }
});
