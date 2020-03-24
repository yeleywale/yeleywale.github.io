
function toggleScroll() {
    const hilite = document.getElementsByClassName('highlight');
    
    for (let index = 0; index < hilite.length; index++) {
        console.log(hilite[index])
        const element = hilite[index];
        if(element.height > 100) {
            element.style.scrollY = "scroll";
        }        
    }
}

toggleScroll();

