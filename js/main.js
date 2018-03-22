window.addEventListener("load", function(){
    navBarBackFill();
})
/*For some reason I do not wish to look into at this time, this
fixes the issue in firefox where styles/classes added stick when
hitting the back arrow to go back a page in the browser*/
window.addEventListener("unload", function(){})

window.addEventListener("resize", function(){
    navBarBackFill();
})
function menuItemSelect(id) {
    var btn = document.getElementById(id),
        page = btn.dataset.page,
        cvr = document.getElementById("cover");
    if (id == "menuTog") {
        btn.setAttribute("class", "menuTog menuTogClicked");
        cvr.style.display = "block";
        setTimeout(function(){
            toggleMenu(btn);
        }, 300)
    } else if (id == "cover") {
        toggleMenu(document.getElementById("menuTog"))
    } else {
        btn.setAttribute("class", "navButton navButtonClicked");
        JSLink('external', page, 600);
    }
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
                section = document.getElementById(location).offsetTop - navBarBackFill() - 10;
            window.scrollTo(0, section);
        }
    }, delay)
}

function toggleMenu(tog) {
    var mnu = document.getElementById("mainNav"),
        cvr = document.getElementById("cover");
    if (tog.dataset.state.toLowerCase() == "close") {
        openMenu(mnu, tog, cvr)
    } else if (tog.dataset.state.toLowerCase() == "open") {
        closeMenu(mnu, tog, cvr)
    }
}
function closeMenu(mnu, tog, cvr) {
    mnu.setAttribute("class", "mainNav");
    cvr.setAttribute("class", "cover");
    tog.setAttribute("class", "menuTog");
    tog.style.opacity = "1";
    tog.dataset.state = "close";
    setTimeout(function(){
        cvr.style.display = "none";
    }, 300)
}
function openMenu(mnu, tog, cvr) {
    mnu.setAttribute("class", "mainNav mainNavOpen")
    cvr.setAttribute("class", "cover coverOn");
    tog.style.opacity = "0";
    tog.dataset.state = "open"
}

/*Adds padding to top of header so header content is positioned correct*/
function navBarBackFill() {
    var navBar = document.getElementById("navBar"),
        header = document.getElementById("header");
    header.style.paddingTop = navBar.offsetHeight + "px";
    return navBar.offsetHeight;
}
