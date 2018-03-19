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
    ["first", "last", ["318", "31415926.."]],
    ["chris", "last", ["555"]],
    ["BILLY", "last", ["111"]],
    ["first", "last", ["99"]],
    ["first", "lool", ["333", "265"]]
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
        SRLast = document.getElementById("searchResultLast");
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
    
}