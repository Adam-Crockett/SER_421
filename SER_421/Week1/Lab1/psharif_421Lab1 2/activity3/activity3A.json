var start = 0; 
function calc(json) {
    var expr =JSON.parse(json);
    if (expr.operation=="add"){
      start += expr.number; 
      return start; 
    }
    else if (expr.operation=="subtract"){
      start -= expr.number;
      return start; 
    }
}

var test1= '{"number" : 5, "operation" : "add"}';
var test2= '{"number" : 2, "operation" :  "subtract"}';
var test3= '{"number" : 19, "operation" : "add"}'; 
calc(test1); 
calc(test2); 
calc(test3); 