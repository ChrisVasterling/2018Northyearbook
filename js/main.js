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
window.addEventListener("mousedown", function(){
    if (searchOpen) {
        // triggered only if a box was selected and the clicked position was not the current box again
        if ((leavingSearchBoxId != null)&&(activeSearchBoxId != leaveSearchTextBox)) {
            //console.log(leavingSearchBoxId)
            document.getElementById(leavingSearchBoxId).setAttribute("class", "button searchTextBox");
            leavingSearchBoxId = null
        }
    }
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
    toggleBodyScroll();
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
var searchOpen = false;
function toggleSearch(id) {
    var oBtn = document.getElementById(id),
        SW = document.getElementById("searchWindow");
    toggleBodyScroll()
    if (searchOpen) {
        // things to do when closing search
        oBtn.setAttribute("class", "button searchButton buttonClicked");
        setTimeout(function(){
            SW.style.opacity = "0";
            setTimeout(function(){
                SW.style.display = "none";
                oBtn.setAttribute("class", "button searchButton");
            }, 300)
        }, 250)
        searchOpen = false;
    } else {
        // things to do when opening search
        oBtn.setAttribute("class", "button openSearchBtn buttonClicked");
        SW.style.display = "block";
        setTimeout(function(){
            SW.style.opacity = "1";
            oBtn.setAttribute("class", "button openSearchBtn");
        }, 300)
        searchOpen = true;
    }
    
}
var bodyScroll = true;
function toggleBodyScroll(){
    var b = document.getElementById("html");
    if (bodyScroll) {
        b.style.overflowY = "hidden";
        bodyScroll = false
    } else {
        b.style.overflowY = "auto";
        bodyScroll = true
    }
}
var activeSearchBoxId = null;
function selectSearchTextBox(boxID) {
    var box = document.getElementById(boxID);
    activeSearchBoxId = boxID;
    box.setAttribute("class", "button searchTextBox searchTextBoxClicked");
}
var leavingSearchBoxId = null;
function leaveSearchTextBox(id) {
    if (activeSearchBoxId == id) { 
        leavingSearchBoxId = id;
    }
}
var refineOpen = false;
function toggleRefine(id) {
    var btn = document.getElementById(id),
        refBtn = document.getElementById("searchRefineBtn"),
        refBox = document.getElementById("searchRefineItems");
    if (refineOpen) {
        refBtn.setAttribute("class", "button searchButton");
        btn.setAttribute("class", "button buttonClicked searchButton")
        setTimeout(function(){
            refBtn.style.display = "inline-block";
            refBox.style.opacity = "0";
            setTimeout(function(){
                refBtn.style.opacity = "1";
                refBox.style.display = "none";
                btn.setAttribute("class", "button searchButton");
            }, 250)
        }, 250)
        refineOpen = false;
    } else {
        btn.setAttribute("class", "button buttonClicked searchButton");
        refBox.style.display = "block";
        setTimeout(function(){
            btn.style.opacity = "0";
            refBox.style.opacity = "1";
            setTimeout(function(){
                btn.style.display = "none";
            }, 250)
        }, 250)
        refineOpen = true;
    }
}

function toggleCB(id) {
    var CB = document.getElementById(id).dataset,
        CBinner = document.getElementById(id + "Inner");
    if (CB.state.toLowerCase() == "unchecked") {
        CBinner.setAttribute("class", "CBboxInner CBboxInnerChecked");
        CB.state = "checked";
    } else if (CB.state.toLowerCase() == "checked") {
        CBinner.setAttribute("class", "CBboxInner");
        CB.state = "unchecked";     
    }
}
function getCBstate(id) {
    var CB = document.getElementById(id).dataset.state;
    return CB;
}