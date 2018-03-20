function toggleSearch(id) {
    var btn = document.getElementById(id),
        searchBox = document.getElementById("searchBox"),
        tog = document.getElementById("searchTog");
    if (id.toLowerCase() == "searchtog") {
        // if searh button is pressed
        btn.setAttribute("class", "searchButtonBtn searchButtonBtnClicked");
        searchBox.style.display = "block";
        setTimeout(function(){
            searchBox.setAttribute("class", "studentSearchBox studentSearchBoxOpen");
            btn.style.opacity = 0;
        }, 300)
    } else if (id.toLowerCase() == "cancelsearch") {
        // if the close button is pressed
        btn.setAttribute("class", "searchButton searchButtonBtnClicked");
        setTimeout(function(){
            searchBox.setAttribute("class", "studentSearchBox");
            tog.setAttribute("class", "searchButtonBtn");
            tog.style.opacity = 1;
            setTimeout(function(){
                searchBox.style.display = "none";
                btn.setAttribute("class", "searchButton");
            }, 300)
        }, 300)
    } else if (id.toLowerCase() == "searchbtn") {
        // if a search is performed
        btn.setAttribute("class", "searchButton searchButtonBtnClicked");
        setTimeout(function(){
            searchBox.setAttribute("class", "studentSearchBox");
            tog.setAttribute("class", "searchButtonBtn");
            tog.style.opacity = 1;
            setTimeout(function(){
                runSearch();
                searchBox.style.display = "none";
                btn.setAttribute("class", "searchButton");
            }, 300)
        }, 300)
    }
}

var studentPageList = [
    ["first", "last", ["1", "2"]],
    ["chris", "last", ["3"]],
    ["billy", "last", ["4"]],
    ["first", "last", ["5"]],
    ["first", "lool", ["6", "7"]]
]
function runSearch() {
    var firstName = document.getElementById("firstNameSearch").value.toLowerCase(), 
        lastName = document.getElementById("lastNameSearch").value.toLowerCase(),
        student,
        matchFirst = [], 
        matchLast = [],
        matchExact = [], 
        SRExact = document.getElementById("searchResultExact"),
        SRFirst = document.getElementById("searchResultFirst"),
        SRLast = document.getElementById("searchResultLast"),
        SRICExact = document.getElementById("searchResultExactImgCont"),
        SRICFirst = document.getElementById("searchResultFirstImgCont"),
        SRICLast = document.getElementById("searchResultLastImgCont");
    // perform search
    // ..List[Y]-Y is index of induvidual student
    // ..List[Y][0]-first name
    // ..List[Y][1]-last name
    // ..List[Y][2]-pages student is on
    // ..List[Y][2][X]-X is induvidual page
    
    // set default input if not given
    if (firstName=="") {
        firstName = "_"
    }
    if (lastName=="") {
        lastName = "_"
    }
    
    // display search criteria stuff
    SRExact.innerHTML = firstName + " " + lastName;
    SRFirst.innerHTML = firstName;
    SRLast.innerHTML = lastName;
    for (student in studentPageList) {
        if ((studentPageList[student][0] == firstName)&&(studentPageList[student][1] == lastName)) {
            // If the first name AND the last name is in the list we found the person
            matchExact.push(studentPageList[student])
        } else {
            if (studentPageList[student][0] == firstName) {
                // student(s) with first name __
                matchFirst.push(studentPageList[student]);
            }
            if (studentPageList[student][1] == lastName) {
                // student(s) with last name __
                matchLast.push(studentPageList[student]);
            }
        }
        
    }
    
    // call function to display/build results
    loadSearchResults("searchResultExactImgCont", matchExact);
    loadSearchResults("searchResultFirstImgCont", matchFirst);
    loadSearchResults("searchResultLastImgCont", matchLast);
    

}
function loadSearchResults(destID, matchList) {
    var dest = document.getElementById(destID);
    dest.innerHTML = "";
    // matchList[s] is the data for a student
    for (var s in matchList) {
        // loop through page numbers for each student s
        for (var i in matchList[s][2]) {
            var divCont = document.createElement("div"),
                img = document.createElement("img");
            img.src = "media/pages/" + matchList[s][2][i] + ".jpg"; // change to low res
            img.alt = "Page: " + matchList[s][2][i];
            img.setAttribute("class", "searchResultImg");
            img.setAttribute("id", "SRI" + matchList[s][2][i]);
            divCont.setAttribute("class", "searchResultImgsDiv");
            divCont.setAttribute("id", "divSRI" + matchList[s][2][i]);
            divCont.setAttribute("onmousedown", "openSearchImg(this.id, 'media/pages/" + matchList[s][2][i] + ".jpg')");
            divCont.appendChild(img);
            dest.appendChild(divCont);
        }
    }
}
function openSearchImg(id, page) {
    var img = document.getElementById(id);
    img.setAttribute("class", "searchResultImgsDiv searchResultImgOpen");
    JSLink("newtab", page, "300")
    setTimeout(function(){
        img.setAttribute("class", "searchResultImgsDiv");
    }, 300)
}