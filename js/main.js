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
            toggleBodyScroll();
        }, 200)
        menuOpen = false;
    } else {
        toggleBodyScroll();
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
    if (searchOpen) {
        // things to do when closing search
        oBtn.setAttribute("class", "button buttonClicked searchButton");
        setTimeout(function(){
            SW.style.opacity = "0";
            setTimeout(function(){
                SW.style.display = "none";
                oBtn.setAttribute("class", "button searchButton");
                toggleBodyScroll();
            }, 300)
        }, 250)
        searchOpen = false;
    } else {
        // things to do when opening search
        toggleBodyScroll();
        oBtn.setAttribute("class", "button openSearchBtn buttonClicked");
        SW.style.display = "block";
        setTimeout(function(){
            SW.style.opacity = "1";
            setTimeout(function(){
                oBtn.setAttribute("class", "button openSearchBtn");
            }, 300)
        }, 250)
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

function toggleSearchTextBox(boxID) {
    var box = document.getElementById(boxID);
    if (box.dataset.state.toLowerCase() == "off") {
        box.setAttribute("class", "button searchTextBox searchTextBoxClicked");
        box.dataset.state = "on";
    } else {
        box.setAttribute("class", "button searchTextBox");
        box.dataset.state = "off";
    }
}

var refineOpen = false;
function toggleRefine(id) {
    var btn = document.getElementById(id),
        refBtn = document.getElementById("searchRefineBtn"),
        refBox = document.getElementById("searchRefineItems");
    if (refineOpen) {
        // closing refine
        refBtn.setAttribute("class", "button searchButton");
        btn.setAttribute("class", "button buttonClicked searchButton")
        setTimeout(function(){
            refBtn.style.display = "inline-block";
            refBox.style.opacity = "0";
            setTimeout(function(){
                refBtn.style.opacity = "1";
                refBox.style.display = "none";
                btn.setAttribute("class", "button searchButton");
                runSearch();
            }, 250)
        }, 250)
        refineOpen = false;
    } else {
        // opening refine
        btn.setAttribute("class", "button buttonClicked searchButton");
        refBox.style.display = "inline-block";
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


function triggerSearch(btnID) {
    var btn = document.getElementById(btnID);
    btn.setAttribute("class", "button buttonClicked searchButton");
    setTimeout(function(){
        setTimeout(function(){
            
            btn.setAttribute("class", "button searchButton");
        }, 250)
        runSearch()
    }, 250)
}
var studentPageList = [
    ["", "", ["10"]],
    ["first", "last", ["1", "2"]],
    ["chris", "last", ["3"]],
    ["billy", "last", ["4"]],
    ["first", "last", ["5"]],
    ["first", "lool", ["6", "7"]]
]
function runSearch() {
    var firstName = document.getElementById("searchTextBox1Input").value.toLowerCase(), 
        lastName = document.getElementById("searchTextBox2Input").value.toLowerCase(),
        matchExact = [],
        matchFirst = [],
        matchLast = [],
        student;
    for (student in studentPageList) {
        if ((studentPageList[student][0] == firstName)&&(studentPageList[student][1] == lastName)) {
            // If the first name AND the last name is in the list we found the person
            matchExact.push(studentPageList[student])
        }
        if (studentPageList[student][0] == firstName) {
            // student(s) with first name __
            matchFirst.push(studentPageList[student]);
        }
        if (studentPageList[student][1] == lastName) {
            // student(s) with last name __
            matchLast.push(studentPageList[student]);
        }
    }
    
    buildSearchResults((firstName + " " + lastName), matchExact, "searchResultFull");
    buildSearchResults(firstName, matchFirst, "searchResultFirst");
    buildSearchResults(lastName, matchLast, "searchResultLast");
}
function buildSearchResults(name, nameList, destID) {
    var finalDest = document.getElementById(destID),
        pageNumDest = document.getElementById(destID + "Pages"),
        destName = document.getElementById(destID + "Name"),
        refCB = destID + "CB";
    pageNumDest.innerHTML = "";
    if (getCBstate(refCB).toLowerCase() == "checked") {
        finalDest.style.display = "block";
        destName.innerHTML = name;
        // build layout here
        for (var s in nameList) {
            for (var p in nameList[s][2]) {
                var img = document.createElement("img"), // this is the button to select a search result page
                    div = document.createElement("div");
                img.setAttribute("class", "searchResultSectionImg");
                // pageDistanceFromHome is determined in script element on a page by page basis
                img.src= pageDistanceFromHome + "media/pages/" + nameList[s][2][p] + ".jpg"; // change to _small.jpg
                img.alt = "Page: " + nameList[s][2][p]
                
                div.setAttribute("class", "searchResultSectionImgCont");
                div.setAttribute("id", "SRP" + pageNumDest.id + nameList[s][2][p]);
                div.setAttribute("data-page", pageDistanceFromHome + "media/pages/" + nameList[s][2][p] + ".jpg");
                div.setAttribute("onmousedown", "openSearchImg(this.id)");
                div.appendChild(img);
                pageNumDest.appendChild(div);
            }
        }
    } else {
        finalDest.style.display = "none";
    }
}
function openSearchImg(imgID) {
    var img = document.getElementById(imgID),
        link = document.getElementById(imgID).dataset.page;
    img.setAttribute("class", "searchResultSectionImgCont searchResultSectionImgContClicked");
    JSLink("newtab", link, 500)
    setTimeout(function(){
        img.setAttribute("class", "searchResultSectionImgCont");
    }, 500)
}