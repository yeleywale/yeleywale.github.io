
const hilite = document.querySelectorAll('pre.highlight');
console.log(hilite)

hilite.forEach(element => {
    if (element.getBoundingClientRect().height >= 300) {
        element.style.cssText = "height: 300px";
        element.style.overflowY = "scroll";
    } else {
        element.style.overflowY = "noscroll"
        element.style.cssText = "box-shadow: 2px 0px 1px #e5bf44";
    }
});
