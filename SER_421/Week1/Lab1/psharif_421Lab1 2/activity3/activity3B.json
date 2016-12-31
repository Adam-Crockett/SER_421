var start = 0; 

function find(string) {
    var expr=JSON.parse(string);
    if (expr.operation=="add"){
      start += expr.number;
      return start; 
    }
    else if (expr.operation=="subtract"){
      start -= expr.number;
      return start; 
    }
}

function calc(json){
  var holder = [];
  var i=0; 
  while (json.includes("expr")){
    var sub=JSON.parse(json); 
    holder[i]=sub.operation; 
    json=JSON.stringify(sub.expr);
    i++;
  }
  var value = find(json); 
  for(var i=holder.length-1;i >= 0; i--)
  {
    var replace = find('{"number" : ' + start + ', "operation" : "' + holder[i] + '"}');
    value=replace; 
  } 
  return value; 
}
  
var test1='{"number" : 5, "operation" : "add"}';
var test2='{"number" : 2, "operation" :  "subtract"}';
var test3='{"number" : 19, "operation" : "add"}'; 
var test4='{"expr": {"number" : 15, "operation" : "subtract"}, "operation" : "add"}';
var test5='{"expr": {"expr": {"number" : 3, "operation" :  "add"}, "operation" : "add"}, "operation" : "subtract"} '; 

calc(test1); 
calc(test2); 
calc(test3); 
calc(test4); 
calc(test5); 