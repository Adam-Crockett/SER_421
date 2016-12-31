const readline = require('readline');
var fs = require('fs'); 
var Path = require('path');
var options = {encoding: 'utf8', flag: 'r'}; 
var username;
var keys=[];
var used = []; 
var stream = fs.createWriteStream("myfile.log");
var count1 = 1; 


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//var username;

rl.question('I\'m Eliza, and you are?',(answer) =>{
        username = answer;
        stream.write(username+'\n');
        //console.log(username);
        greeting(); 
});


function greeting (){
	var greeting1 = ["What are you up to?","How's your day going?","How was work?"];
	//var random = Math.floor(Math.random()*greeting1.length);
	console.log(greeting1[Math.floor(Math.random()*greeting1.length)]);
	//console.log("This file is located in the directory " + __dirname); ///__dirname is the variable for the 																	                ///directory of where the .js file is located
}

rl.on('line', (input) => {
    var response = input;
    stream.write(response+'\n');
    timer20.reset();
    if(input == 'quit')
        process.exit(0);
    if(input == 'log'){
        //fs.writeFile(username+'_'+Date()+'.log', "myfile.log" , (err) => {
            //if (err) throw er
            var temp = "Our conversation has been saved!";
            console.log(temp);
            stream.write(temp+'\n');
        //fs.rename('myfile.log', username+'_'+Date()+'.log');
        fs.createReadStream('myfile.log').pipe(fs.createWriteStream(username+'_'+Date()+'.log'));
        //stream = fs.createWriteStream(username+'_'+Date()+'.log');

            
        //});
    }
  //toSingle(response);
  respond(response); 
});

function respond(input){
    var noKeys = used.length-1; 
    var json= JSON.parse(used[noKeys]);
    var random=Math.floor(Math.random()*json.responses.length);
    var splitWords = input.split(" ");
    for(var i = 0; i < splitWords.length; i++){
        for(var j=0; j < used.length;j++){
            var json2= JSON.parse(used[j]);
            var random2=Math.floor(Math.random()*json2.responses.length);
            if (splitWords[i]==json2.keyword){
                if (json2.responses.length < 1){
                    removeDuplicates(json, random, noKeys);
                    //printKeys(used);
                    return; 
                }
                removeDuplicates(json2, random2, j);
                //printKeys(used);
                return; 
            }
        }
    }
    removeDuplicates(json, random, noKeys);
    //printKeys(used);
}

function removeDuplicates(json ,random, index){
    var noKeys = used.length-1;
    newJson= JSON.parse(used[noKeys]);
    if (newJson.responses.length < 1){
        used[noKeys]=keys[noKeys];
        json= JSON.parse(used[noKeys]);
        random=Math.floor(Math.random()*json.responses.length);
    }
    var temp = json.responses[random];
    console.log(temp); //
    stream.write(temp+'\n');
    json.responses.splice(random, 1); //
    used[index]= JSON.stringify({"keyword": json.keyword,"responses": json.responses });
}

/// Won't Need ////////////////////////////////////////////////
function printKeys(array)
{
    for(var i=0; i< array.length;i++){
            console.log("This is an element: " + array[i]);
    }
}
/// Won't Need
function toSingle(words){
    var singlRes = words.split(" ");
    for(var i = 0; i <singlRes.length; i++)
        console.log(singlRes[i]);
}
//////////////////////////////////////////////////////////////

fs.readFile('test.json', options, function(err, data){
	if(err) {
		console.log("\nCould not open File");
	}
	else {
	//	console.log("\nFile was loaded"); 
		var stuff = JSON.parse(data);
        for(var i=0; i< stuff.dictionary.length;i++){
            keys.push(JSON.stringify(stuff.dictionary[i]));
            used.push(JSON.stringify(stuff.dictionary[i]));
        }
        
	}
    //printKeys(); 
});

//Timer function
function Timer(ftn, time){
    var timerObj = setInterval(ftn,time);
    
    //end the timer.
    this.end = function(){
        if(timerObj){
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }
    //begin the timer
     this.begin = function() {
        if (!timerObj) {
            this.end();
            timerObj = setInterval(ftn, time);
        }
        return this;
    }
     //reset the timer
      this.reset = function() {
          this.end();
          this.begin();
        return this;
    }
}
   
var timer20 = new Timer(function() {
     var delayed = [ username +", I'm waiting here!", "Whatsa matter "+ username+"  cat got your tongue?" , username + ", I WILL ALL CAPS RAAGE!"];
    var temp = delayed[Math.floor(Math.random()*delayed.length)];
    console.log(temp);
    stream.write(temp+'\n');
    if(coffeeBreak != null)
        coffeeBreak.reset();
},20000);
            
//#8 Coffee Break Prompt after 3 min.
var coffeeBreak =  new Timer(function() {
    rl.question('You sure can talk. I need some coffee-join me at Dunkin, ' + username
                +"?",(answer) =>{
        if(answer == 'maybe'){
            coffeeBreak.end(); //Turns it off if maybe is entered
        }
        if(answer)
            timer20.reset();
        stream.write('You sure can talk. I need some coffee-join me at Dunkin, ' + username
                +"?\n");
        stream.write(answer+'\n');
    });
}, 60000);//Every 3 minutes (180000 ms)                  

var timer15 = new Timer(function(){
    fs.readdir(__dirname, function(err, files){
    	var temp = 'I just got smarter!!!';
        var count = 0;
        var fileStack = files;
        for(var i = 0; i <fileStack.length; i++){
            if(fileStack[i].includes('.json')){
                var fullPath = Path.join(__dirname, fileStack[i]);
               // console.log(fullPath);
                count++;  
            }
        }
        if(count > count1){
            count1=count;
            console.log(temp);
            stream.write(temp);
            //console.log(count+"  "+count1);
        }
      
});
},15000);