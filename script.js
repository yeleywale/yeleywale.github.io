
const hilite = document.querySelectorAll('pre.highlight');
console.log(hilite)

hilite.forEach(element => {
    if (element.getBoundingClientRect().height >= 300) {
        element.style.cssText = "height: 300px";
        element.style.overflowY = "scroll";
    } else {
        element.style.overflowY = "noscroll"
    }
});
