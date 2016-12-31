/// Project Name: Lab 5 Activity 1
/// Author: Pedram Sharif 
/// Date Last Modified: November 13, 2016
/// Description: Accessing Elements of the DOM using DOM expressions. 

///Activity 1.1
///(3) Output to the console the <ol> element encompassing the results of the search
console.log(document.getElementsByTagName("ol").b_results);

///Activity 1.2
///(4) Output to the console the code for the "onload" event on the <body> element
console.log(document.body.attributes[0]); ///This prints out the onload attribute

///Activity 1.3 
///(3) Output to the console the 2nd child node underneath the <body> element
console.log(document.body.childNodes[1])

///Activity 1.4
/// (3) Output to the console the number of <h2> tags in the page
console.log(document.getElementsByTagName("h2").length);

/// Activity 1.5
/// (3) Output to the console the value in the search bar (you must get this from the search bar not anywhere else on the page)
console.log(document.getElementById("sb_form_q").value);

///Activity 1.6
/// (4) Make the "Images of" result near the top of the search result go away
document.getElementById("vidans2").innerHTML="";
