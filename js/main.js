/*For some reason I do not wish to look into at this time, this
fixes the issue in firefox where styles/classes added stick when
hitting the back arrow to go back a page in the browser*/
window.addEventListener("unload", function(){})
window.addEventListener("load", function(){
    setTopBarName()
})
window.addEventListener("resize", function(){
    setTopBarName()
})
function setTopBarName() {
    var TB = document.getElementById("topBar"),
        TBN = document.getElementById("topBarName"),
        M = document.getElementById("menu"),
        TLB = document.getElementById("toolBar");
    if (window.innerWidth > 700) {
        TBN.style.top = ((TB.offsetHeight - M.offsetHeight)/2) - (TBN.offsetHeight/2) + "px";        
    } else {
        TBN.style.top = ((TB.offsetHeight + TLB.offsetHeight)/2) - (TBN.offsetHeight/2) + "px";
    }
}
function menuItemSelect(id) {
    var btn = document.getElementById(id),
        page = btn.dataset.page,
        cvr = document.getElementById("cover");
    if (id == "menuTog") {
        btn.setAttribute("class", "button TBButton TBButtonClicked buttonClicked");
        cvr.style.display = "block";
        setTimeout(function(){
            toggleMenu(btn, cvr);
        }, 300)
    } else if (id == "cover") {
        toggleMenu(document.getElementById("menuTog"), cvr)
    } else {
        btn.setAttribute("class", "button menuBtn buttonClicked");
        JSLink('external', page, 500);
    }
}
function backBtn(id, delay) {
    var btn = document.getElementById(id);
    btn.setAttribute("class", "button buttonClicked");
    setTimeout(JSLink("back", "NULL", delay*2));
}
function JSLink(IntExt, page, delay) {
    setTimeout(function(){
        if (IntExt.toLowerCase() == 'external') {
            window.open(page, "_self")
        } else if (IntExt.toLowerCase() == 'newtab') {
            window.open(page, "_blank")
        } else if (IntExt.toLowerCase() == 'back') {
            window.history.back()
        } else if (IntExt.toLowerCase() == 'internal') {
            var location = document.getElementById(btn).dataset.page,
                section = document.getElementById(location).offsetTop - 10;
            window.scrollTo(0, section);
        }
    }, delay)
}
var menuOpen = false;
function toggleMenu(btn, cvr) {
    var mnu = document.getElementById("menu");
    if (menuOpen) {
        mnu.setAttribute("class", "menu");
        btn.setAttribute("class", "button TBButton");
        btn.style.opacity = "1";
        cvr.style.opacity = "0";
        setTimeout(function(){
            cvr.style.display = "none";
        }, 200)
        menuOpen = false;
    } else {
        mnu.setAttribute("class", "menu menuOpen");
        btn.style.opacity = "0";
        cvr.style.opacity = "1";
        menuOpen = true;
    }
}