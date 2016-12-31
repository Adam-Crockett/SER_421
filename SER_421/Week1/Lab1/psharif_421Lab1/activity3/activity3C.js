var id = 0;
var stack = [];
stack[0]=0;

function find(string) {
    var expr=JSON.parse(string);
    if (expr.operation=="add"){
      return (stack[id] + expr.number); 
    }
    else if (expr.operation=="subtract"){ 
      return (stack[id] - expr.number); 
    }
    else if (expr.operation=="push"){
      id++;  
      stack[id]=expr.number;
    }
    else if (expr.operation=="pop"){
      if(id < 0){
        console.log("No expressions to pop"); 
        return;
      }
      var temp=stack[id];
      stack[id]=null; 
      id--;
      return temp; 
    }
    else if (expr.operation=="print"){
      for(var i=id;i >= 0; i--){
        console.log(stack[i]);
      }
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
  var start = find(json);
  for(var i=holder.length-1;i >= 0; i--){
    var replace = find('{"number" : ' + start + ', "operation" : "' + holder[i] + '"}');
    start=replace; 
  }
}
  
var test1='{"number" : 5, "operation" : "add"} ';
var test2='{"expr": {"number" : 2, "operation" : "subtract"}, "operation" : "push"} ';
var test3='{"expr": {"number" : 19, "operation" :  "add"}, "operation" :  "push"} '; 
var test4='{"operation" :  "pop"} ';
var test5='{"operation" :  "print"}  ';
var test6='{"expr": {"expr": {"operation" :  "pop"}, "operation" :  "add"}, "operation" : "push"}';
var test7='{"operation" :  "print"}';
var test8='{"operation" :  "pop"} ';
var test9='{"operation" :  "pop"} ';
var test10='{"operation" :  "pop"} ';

calc(test1); 
calc(test2); 
calc(test3); 
calc(test4); 
calc(test5); 
calc(test6); 
calc(test7);
calc(test8); 
calc(test9); 
calc(test10);