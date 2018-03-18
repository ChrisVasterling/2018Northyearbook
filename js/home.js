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
                searchBox.style.display = "none";
                btn.setAttribute("class", "searchButton");
            }, 300)
        }, 300)
    }
}
var studentPageList = [
    ["first", "last", ["318", "31415926.."]],
]
function runSearch(id) {
    toggleSearch(id);
    // perform search
    // ..List[Y]-Y is induvidual student
    // ..List[Y][0]-first name
    // ..List[Y][1]-last name
    // ..List[Y][2]-pages student is on
    // ..List[Y][2][X]-X is induvidual page
    console.log(studentPageList[0][0])
    console.log(studentPageList[0][1])
    console.log(studentPageList[0][2])
}