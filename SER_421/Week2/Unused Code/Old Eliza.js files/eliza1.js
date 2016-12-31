///Project: Lab 2 SER 421 Gary ReadMe.txt
///Author: Pedram Sharif and Krystle Jones
//Date Last Modified: October 28, 2016

///Variables used throughout the program
const readline = require('readline'); //Loads Readline
var fs = require('fs'); //Loads File System
var Path = require('path'); //Loads Path
var options = {encoding: 'utf8', flag: 'r'}; //Options for Files
var username=''; //variable for username
var keys=[];  //Holds initial values of dictionary
var used = []; // Holds all usuable definitions from dictionary
var dontUse=[]; //Holds unusable responses
var stream = fs.createWriteStream("myfile.log"); //Creates a file for log
var count1 = 1; //Sets the number of dictionary files to one. 

///Creates the Readline Interfaces.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

///Initial prompt to get the user name. Saves it for later tasks
rl.question('I\'m Eliza, and you are?\n',(answer) =>{
        username = answer;
        stream.write('I\'m Eliza, and you are?\n');
        stream.write(username+'\n');
        LoadDirs(__dirname); ///Loads directories initially
        greeting(); ///Then goes to the greeting function
});


///Sends a random greeting to the user. 
function greeting (){
	var greeting1 = ["What are you up to?","How's your day going?","How was work?", "Tell me how you feel.","What's up?"];
    var random =greeting1[Math.floor(Math.random()*greeting1.length)];
    stream.write(random + '\n');
	console.log(random + '\n');
}

///Readline Callback Function
rl.on('line', (input) => {   
    if(input == 'quit')
        process.exit(0);
    if(input == 'log'){
        stream.write(response+'\n');
        var temp = "This is the end of logged conversation from start-->log!";
        console.log(temp);
        stream.write(temp+'\n');
        fs.createReadStream('myfile.log').pipe(fs.createWriteStream(username+'_'+Date()+'.log'));
        console.log("If you want to continue type something, otherwise enter 'quit' to end.");
        return;
    }
    var response = input;
    stream.write(response+'\n');
    timer20.reset();
    respond(response); 
});

///Function to randomize the responses
function respond(input){
    var noKeys = used.length-1; 
    var json= JSON.parse(used[noKeys]);
    var random=Math.floor(Math.random()*json.responses.length);
    var splitWords = input.split(" ");
    for(var i = 0; i < splitWords.length; i++){
        for(var j=0; j < used.length;j++){
            var json2= JSON.parse(used[j]);
            var random2=Math.floor(Math.random()*json2.responses.length);
            if (splitWords[i].toLowerCase()==json2.keyword){
                if (json2.responses.length < 1){
                    removeDuplicates(json, random, noKeys);
                    return; 
                }
                removeDuplicates(json2, random2, j);
                return; 
            }
        }
    }
    removeDuplicates(json, random, noKeys);
}

///Removes responses that have been used from the responses arrays
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
    var alreadyUsed=json.responses.splice(random, 1);
    dontUse.push(alreadyUsed);
    used[index]= JSON.stringify({"keyword": json.keyword,"responses": json.responses });
}

/// Won't Need For the Program just used for checks ///////////
function printKeys(array)                                    //
{                                                            //    
    for(var i=0; i< array.length;i++){                       //
            console.log("This is an element: " + array[i]);  //
    }                                                       //
}                                                           //
//////////////////////////////////////////////////////////////

///Timer Object function
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

/// 20 second timer
var timer20 = new Timer(function() {
     var delayed = [ username +", I'm waiting here!", "Whatsa matter "+ username+"  cat got your tongue?" , username + ", I WILL ALL CAPS RAAGE!", "Why no answer " + username, "Thanks " + username];
    var temp = delayed[Math.floor(Math.random()*delayed.length)];
    console.log(temp);
    stream.write(temp+'\n');
    if(coffeeBreak != null)
        coffeeBreak.reset();
},20000);
            
/// #8 Coffee Break Prompt after 3 min.
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

/// Timer to check the new directories
var timer15 = new Timer(function(){
WalkDirs(__dirname);
},15000);

//Loads Directory files initially
function LoadDirs(dirPath){
  fs.readdir(dirPath, function(err, files){
    var count = 0;
    for (var idx in files){
      if(files[idx].includes('.json')){
        var fullPath = Path.join(dirPath, files[idx]);
        count++;
        (function(fullPath){
        fs.readFile(fullPath, options, function(err, data){
	       if(err) {
		      console.log("\nCould not open File this time" + err);
              console.log(err);
	       }
	       else {
            var stuff = JSON.parse(data);
            for(var i=0; i< stuff.dictionary.length;i++){
                keys.push(JSON.stringify(stuff.dictionary[i]));
                used.push(JSON.stringify(stuff.dictionary[i]));
            } 
	       }  
        });
       })(fullPath);
      }
    }
    count1=count;
  });
}

//Reads directories every 15 seconds
function WalkDirs(dirPath){
  fs.readdir(dirPath, function(err, files){
    var temp = 'I just got smarter!!!';
    var count = 0;
    for (var idx in files){
      if(files[idx].includes('.json')){
        var fullPath = Path.join(dirPath, files[idx]);
        count++;
        (function(fullPath){
        fs.readFile(fullPath, options, function(err, data){
	       if(err) {
		      console.log("\nCould not open File this time" + err);
              console.log(err);
	       }
	       else {
            var stuff = JSON.parse(data);
            for(var i=0; i< stuff.dictionary.length;i++){
                checkForNew(JSON.stringify(stuff.dictionary[i]));
         
            } 
	       }  
        });
       })(fullPath);
      }
    }
    if(count > count1){
        count1=count;
        console.log(temp);
        stream.write(temp);
    }  
  });
}

///Checks to make sure new dictionaries are added
function checkForNew(string){    
    var json= JSON.parse(string);
        for(var i=0; i < used.length;i++){
            var json2=JSON.parse(used[i]);
            if(keys[i]==string)
                return;
            else if(json2.keyword==json.keyword){
                for(var j=0; j < json.responses.length; j++){
                    compareResponses(json.responses[j], used[i], i);
                }
                return;
            }
        }
    used.push(string);
    keys.push(string);
}

///Checks to make sure new responses are added to response arrays
function compareResponses(string, jsonObject, index){
    var json= JSON.parse(jsonObject);
    for(var i=0; i < json.responses.length;i++){
       if(string==json.responses[i])
           return;
    }
    for(var j=0; j < dontUse.length;j++){
       if(string==dontUse[j])
           return;
    }
    json.responses.push(string);
    used[index]=JSON.stringify({"keyword": json.keyword,"responses": json.responses });
}
