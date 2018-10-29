/*For some reason I do not wish to look into at this time, this
fixes the issue in firefox where styles/classes added stick when
hitting the back arrow to go back a page in the browser*/
window.addEventListener("unload", function(){})
window.addEventListener("load", function(){
    setTopBarName()
    load_displayYBPages(pageRange)
    create_backToTop()
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
    } else if (id == "classSongButton") { 
        btn.setAttribute("class", "button menuBtn buttonClicked");
        JSLink('newtab', page, 500);
        setTimeout(function(){
            btn.setAttribute("class", "button menuBtn"); 
        }, 500)
    } else {
        btn.setAttribute("class", "button menuBtn buttonClicked");
        JSLink('external', page, 500);
        setTimeout(function(){
            btn.setAttribute("class", "button menuBtn"); 
        }, 500)
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
function create_backToTop() {
    var body = document.getElementById("body"),
        btn = document.createElement("button");
    
    btn.innerHTML = "Back to Top<hr/>";
    btn.setAttribute("class", "button totop");
    btn.setAttribute("id", "backtoptop")
    btn.setAttribute("onmousedown", "backToTop(this.id)");
    body.appendChild(btn)
}
function backToTop(id) {
    var btn = document.getElementById(id);
    btn.setAttribute("class", "button totop buttonClicked");
    setTimeout(function(){
        window.scrollTo(0,0)
        setTimeout(function(){
            btn.setAttribute("class", "button totop");
        }, 250)    
    }, 250)
}


function load_displayYBPages(pageRange) {
    var YBP = document.getElementById("YBPages"), img;
    for (var i=pageRange[0]; i <= pageRange[1]; i++) {
        // i is the page number
        var imgEle = document.createElement("img"),
            imgEleCont = document.createElement("div"),
            imagePath = pageDistanceFromHome + "media/pages/" + i;
        imgEle.setAttribute("src", imagePath + "_small.jpg");
        imgEle.setAttribute("class", "YBPageImg");
        imgEleCont.setAttribute("data-page", imagePath + ".jpg");
        imgEleCont.setAttribute("id", i);
        imgEleCont.setAttribute("onmousedown", "openYBPage(this.id)");
        imgEleCont.setAttribute("class", "YBPageCont");
        imgEleCont.appendChild(imgEle)
        YBP.appendChild(imgEleCont)
    }
    for (var i=pageRange[0]; i <= pageRange[1]; i++) {
        fadeYBElementIn(i, pageRange)
    }
}
function fadeYBElementIn(num, pages) {
    var ele = document.getElementById(num);
    setTimeout(function(element){
        element.style.opacity = "1";
    }, 100*(num - pages[0]), element=ele)
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
        oBtn.setAttribute("class", "button openSearchBtn buttonClicked openSearchBtnClicked");
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
    ["student", "index", ["184", "185", "186", "187", "188", "189", "190", "191", "192"]],
    ["andrew", "accola", ["52"]],
    ["quinnlan", "acker", ["42"]],
    ["karissa", "ackerman", ["64"]],
    ["noah", "adsit", ["20", "39", "52", "61"]],
    ["charlotte", "akervik", ["26", "64", "112", "136"]],
    ["johannes", "akervik", ["42", "136"]],
    ["tyler", "albrecht", ["13", "39", "42", "136"]],
    ["larae", "allrich", ["52"]],
    ["thomas", "amort", ["74"]],
    ["isaiah", "amundson", ["38", "42"]],
    ["phaedra", "amundson", ["52"]],
    ["melissa", "amyotte", ["146"]],
    ["melissa", "amyotte-stokes", ["146"]],
    ["alexzandria", "anderson", ["42"]],
    ["brody", "anderson", ["64"]],
    ["alexis", "anderson", ["64"]],
    ["connor", "anderson", ["22", "74"]],
    ["elliana", "anderson", ["64"]],
    ["heidi", "anderson", ["64"]],
    ["jackie", "anderson", ["42"]],
    ["jordan", "anderson", ["64"]],
    ["spencer", "andrews", ["9", "38"]],
    ["madalyn", "archibald-smith", ["42"]],
    ["marley", "arel", ["52"]],
    ["sarah", "arellano", ["37", "52"]],
    ["hailey", "arneson", ["64", "108", "109", "138"]],
    ["audrey", "arrington", ["74"]],
    ["tyler", "arrington", ["74"]],
    ["keith", "ash", ["146"]],
    ["monica", "ashby", ["42", "138"]],
    ["dylan", "ashley", ["39", "52", "140", "141"]],
    ["devon", "atter", ["52", "141"]],
    ["kayla", "aubart", ["74", "141"]],
    ["gavin", "austin", ["64"]],
    ["kendra", "awe", ["146"]],
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
                // if the id (and thus page) is alread displayed >>> skip it
                if (document.getElementById("SRP" + pageNumDest.id + nameList[s][2][p]) == null) {
                    var img = document.createElement("img"), // this is the button to select a search result page
                        div = document.createElement("div");
                    img.setAttribute("class", "searchResultSectionImg");
                    // pageDistanceFromHome is determined in script element on a page by page basis
                    img.src= pageDistanceFromHome + "media/pages/" + nameList[s][2][p] + "_small.jpg";
                    img.alt = "Page: " + nameList[s][2][p]

                    div.setAttribute("class", "searchResultSectionImgCont");
                    div.setAttribute("id", "SRP" + pageNumDest.id + nameList[s][2][p]);
                    div.setAttribute("data-page", pageDistanceFromHome + "media/pages/" + nameList[s][2][p] + ".jpg");
                    div.setAttribute("onmousedown", "openSearchImg(this.id)");
                    div.appendChild(img);
                    pageNumDest.appendChild(div);
                    
                    // fading in outer div
                    fadeSearchElementIn(div.id, p)
                }
            }
        }
        
    } else {
        finalDest.style.display = "none";
    }
}
function fadeSearchElementIn(id, delayMultiplyer) {
    var ele = document.getElementById(id);
    setTimeout(function(element) {
        element.style.opacity = "1";
    }, 100*delayMultiplyer, element=ele)
}

// these 3 function are very similar and can probably be combined into one but i'm too lazy
function openSearchImg(imgID) {
    var img = document.getElementById(imgID),
        link = document.getElementById(imgID).dataset.page;
    img.setAttribute("class", "searchResultSectionImgCont searchResultSectionImgContClicked");
    JSLink("newtab", link, 500)
    setTimeout(function(){
        img.setAttribute("class", "searchResultSectionImgCont");
    }, 500)
}
function openYBImg(imgID) {
    var img = document.getElementById(imgID),
        link = document.getElementById(imgID).dataset.page;
    img.setAttribute("class", "ybSectionImg searchResultSectionImgCont searchResultSectionImgContClicked");
    JSLink("newtab", link, 500)
    setTimeout(function(){
        img.setAttribute("class", "ybSectionImg searchResultSectionImgCont");
    }, 500)
}
function openYBPage(id) {
    var img = document.getElementById(id),
        link = img.dataset.page;
    img.setAttribute("class", "YBPageCont YBPageContClicked");
    JSLink("newtab", link, 500);
    setTimeout(function(){
       img.setAttribute("class", "YBPageCont"); 
    }, 500)
}