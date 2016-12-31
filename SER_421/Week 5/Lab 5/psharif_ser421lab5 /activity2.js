///Project: Lab 5 Activity 2 SER 421 Gary 
///Author: Pedram Sharif
//Date Last Modified: November 17, 2016

var replyButton=document.getElementById("replyButton");
var welcome="Hi I'm Eliza, what's your name?" ;
var userName;
var conversation="";
var myVar;
var moreResponses=false; 
//Holds initial values of dictionary
var keywords=['{"key" : ["ok", "true", "yes"],  "phrase" : ["So your ok then.", "Why say that, can\'t you use a different word?", "Okey Dokey.","Ok, ok, okkk.","So you agree.", "I would of said the same thing.", "I would say false.", "Yes that makes sense.", "I think your right, but not for sure.","I knew it.", "That doesn\'t make any sense.", "Totally, I hear you bro.", "Mmmhmm.", "Right? I mean I thought so."]}',
          '{"key" : ["tired","bad","sad"],  "phrase" : ["Is that right?", "Say WHAT?!?", "Me too.", "I feel you.", "Understandable.","Really bad, or just a little.", "But is it kind\'ve good?", "Right.", "Sometimes I feel that way too.", "Oh sorry to hear that.","I\'m sorry.", "That stinks", "I wish I could cheer you up"]}',
          '{"key" : ["bye"],  "phrase" : ["Bye", "See ya", "Thanks","Good talking to ya.","Have a good one."]}',
          '{"key" : ["hello"],  "phrase" : ["Hi!", "Hola!", "Kon\'nichiwa", "Nice to hear ya.", "Hey."]}',
          '{"key" : ["no","stop"],  "phrase" : ["Don\'t tell me no!", "I don\'t have the memory to argue with you.", "You\'re so negative...", "I would rather you said maybe.", "Don\'t be that way?","Ok, that\'s discouraging.", "I don\'t have to listen to you.", "I\'m pretending I didn\'t understand you.", "I like doing the opposite."]}',
          '{"key" : ["what","that","why"],  "phrase" : ["That doesn\'t matter.", "Yes I\'ve heard.", "Not Right.", "What do you mean?", "I can\'t answer you now.","Respone of mine.", "You watching Basketball?", "Why\'s that?", "What exactly are you talking about?", "Is it something we\'ve already talked about?","Are you asking me?", "I really don\'t know.", "Huh?", "Maybe because it just is.", "Don\'t even worry about it."]}',
          '{"key" : ["right","good", "happy"],  "phrase" : ["You certainly sound sure.", "That\'s cool.", "Re-iterate that.", "Who\'s right?", "Ok, I\'ll agree.","Glad to hear that.", "That\'s awesome.", "You\'re so positive!", "Is that a good thing?", "Nice to hear.","That\'s fantastic.", "Glad to hear it.", "Super.", "Sweet.", "Alright, nice."]}',  
          '{"key" : ["DEF_AULT"],  "phrase" : ["Alright.", "Can you eleborate.", "I\'m not sure I understand.", "That\'s interesting.", "Would you like to say more?", "I\'m not sure what your getting at? ", "Tell me more.", "Wow, I would have never guessed.", "Sure, that would be nice.", "Is that something that you always say?","The doesn\'t sound right.", "Are you sure?","I think so."]}'
         ];  
// Holds all usuable definitions from dictionary
var used=['{"key" : ["ok", "true", "yes"],  "phrase" : ["So your ok then.", "Why say that, can\'t you use a different word?", "Okey Dokey.","Ok, ok, okkk.","So you agree.", "I would of said the same thing.", "I would say false.", "Yes that makes sense.", "I think your right, but not for sure.","I knew it.", "That doesn\'t make any sense.", "Totally, I hear you bro.", "Mmmhmm.", "Right? I mean I thought so."]}',
          '{"key" : ["tired","bad","sad"],  "phrase" : ["Is that right?", "Say WHAT?!?", "Me too.", "I feel you.", "Understandable.","Really bad, or just a little.", "But is it kind\'ve good?", "Right.", "Sometimes I feel that way too.", "Oh sorry to hear that.","I\'m sorry.", "That stinks", "I wish I could cheer you up"]}',
          '{"key" : ["bye"],  "phrase" : ["Bye", "See ya", "Thanks","Good talking to ya.","Have a good one."]}',
          '{"key" : ["hello"],  "phrase" : ["Hi!", "Hola!", "Kon\'nichiwa", "Nice to hear ya.", "Hey."]}',
          '{"key" : ["no","stop"],  "phrase" : ["Don\'t tell me no!", "I don\'t have the memory to argue with you.", "You\'re so negative...", "I would rather you said maybe.", "Don\'t be that way?","Ok, that\'s discouraging.", "I don\'t have to listen to you.", "I\'m pretending I didn\'t understand you.", "I like doing the opposite."]}',
          '{"key" : ["what","that","why"],  "phrase" : ["That doesn\'t matter.", "Yes I\'ve heard.", "Not Right.", "What do you mean?", "I can\'t answer you now.","Respone of mine.", "You watching Basketball?", "Why\'s that?", "What exactly are you talking about?", "Is it something we\'ve already talked about?","Are you asking me?", "I really don\'t know.", "Huh?", "Maybe because it just is.", "Don\'t even worry about it."]}',
          '{"key" : ["right","good", "happy"],  "phrase" : ["You certainly sound sure.", "That\'s cool.", "Re-iterate that.", "Who\'s right?", "Ok, I\'ll agree.","Glad to hear that.", "That\'s awesome.", "You\'re so positive!", "Is that a good thing?", "Nice to hear.","That\'s fantastic.", "Glad to hear it.", "Super.", "Sweet.", "Alright, nice."]}',  
          '{"key" : ["DEF_AULT"],  "phrase" : ["Alright.", "Can you eleborate.", "I\'m not sure I understand.", "That\'s interesting.", "Would you like to say more?", "I\'m not sure what your getting at? ", "Tell me more.", "Wow, I would have never guessed.", "Sure, that would be nice.", "Is that something that you always say?","The doesn\'t sound right.", "Are you sure?","I think so."]}'
         ];
var dontUse=[]; //Holds unusable responses

///Welcomes the User at Runtime
function start(){
  output(welcome);
  replyButton.addEventListener("click", greeting);
}

start();

///Sends a random greeting to the user. 
function greeting (){
    userName=document.getElementById("userInput").value;
    if ((userName.includes('{')&&userName.includes('}'))||(userName.includes('[')&&userName.includes(']'))){ 
        checkForValidJson(userName);   
    }
    if (userName=="clear"){
      clear();
      return; 
    }
    output(userName + ": " + userName);
    var greeting1 = [ userName+", what are you up to?","How's your day going "+userName+"?","How was work "+userName+"?", userName+", tell me how you feel.","What's up "+userName+"?"]; 
    var random=greeting1[Math.floor(Math.random()*greeting1.length)];
    output("Eliza: " + random);
    replyButton.removeEventListener("click",greeting);
    replyButton.addEventListener("click", respond);
    replyButton.addEventListener("click", stopTimer);
}

///Clears the conversaton
function clear(){
  conversation="";
  replyButton.removeEventListener("click", respond);
  replyButton.removeEventListener("click", stopTimer);
  clearInterval(myVar);
  ///All responses are restored
  used=keywords.slice(0);
  userName="";
  start();   
}


///Looks for keywords in the users input and compares it dictionary
function respond (){
    var input=document.getElementById("userInput").value;
    if ((input.includes('{')&&input.includes('}'))||(input.includes('[')&&input.includes(']'))){ 
        checkForValidJson(input);   
    }
    if (input=="clear"){
      conversation="";
      replyButton.removeEventListener("click", respond);
      replyButton.removeEventListener("click", stopTimer);
      clearInterval(myVar);
      ///All responses are restored
      used=keywords.slice(0);
      userName="";
      start();
      return; 
    }
    output(userName + ": " + input); //Sends the users response
    var noKeys = used.length-1; 
    var json= JSON.parse(used[noKeys]);
    var random=Math.floor(Math.random()*json.phrase.length); 
    var splitWords = input.split(" ");
    for(var i = 0; i < splitWords.length; i++){
        for(var j=0; j < used.length;j++){
            var json2= JSON.parse(used[j]);
            var random2=Math.floor(Math.random()*json2.phrase.length);
            for (var k=0; k < json2.key.length; k++){
                if (splitWords[i].toLowerCase()==json2.key[k]){
                    if (json2.phrase.length < 1){
                        removeDuplicates(json, random, noKeys);
                        return; 
                    }
                    removeDuplicates(json2, random2, j);
                    return; 
                }
            }
        }
    }
    removeDuplicates(json, random, noKeys);
}

///Checks for if user entered JSON 
function checkForValidJson(input){
    try{
        var json=JSON.parse(input);
    }catch(e){
        output("Eliza: " + e); 
        return;
    }
    var keys=Object.keys(json);
    if(keys.length == 2){
      if(keys[0]=="key" && keys[1]=="phrase"){
        checkForNew(input);
        return;        
      }
    }
    output('Eliza: Your JSON object must be in this type format:'+'<br>'+'{"key" : ["keyword1","keyword2"],  "phrase" : ["response1", "response2", "response3"]}');
}

///Removes responses that have been used from the responses arrays
function removeDuplicates(json ,random, index){
    var noKeys = used.length-1;
    newJson= JSON.parse(used[noKeys]);
    if (newJson.phrase.length < 1){
        used[noKeys]=keywords[noKeys];
        json= JSON.parse(used[noKeys]);
        random=Math.floor(Math.random()*json.phrase.length);
    }
    var temp = json.phrase[random];
    output("Eliza: " + temp);// Actually responds use output function
    var alreadyUsed=json.phrase.splice(random, 1);
    dontUse.push(alreadyUsed);
    used[index]= JSON.stringify({"key": json.key,"phrase": json.phrase });
    printKeys(used); 
}

/// Won't Need For the Program just used for checks ///////////
function printKeys(array)                                    //
{                                                            //    
    for(var i=0; i< array.length;i++){                       //
            console.log("This is an element: " + array[i]);  //
    }                                                        //
}                                                            //
///////////////////////////////////////////////////////////////


///Prints the output to DOM 
function output(string) {
    conversation=conversation.concat(string + "<br>"); 
    document.getElementById("conversation").innerHTML=conversation;
}

///Timer Function
function timerPrompt() {
    myVar = setInterval(function(){ 
        var prompt=[ userName+", why no response?","Hello? Are you gonna answer "+userName+"?","Did you go somewhere "+userName+"?", userName+", are you still here?","I'm waiting "+userName+"."];
        var random=prompt[Math.floor(Math.random()*prompt.length)];
        alert("Eliza: " + random); 
    }, 20000);
    
}

///Stops the Timer Function
function stopTimer() {
    clearInterval(myVar);
    timerPrompt();
}

///Checks to make sure new dictionaries are added
function checkForNew(string){
    moreResponses=true;
    var dontAdd=false; 
    var json= JSON.parse(string);
        for(var i=0; i < used.length;i++){
            var json2=JSON.parse(used[i]);
            if(used[i]==string)
                return;
            for(var j=0; j < json2.key.length; j++){
                for(var k=0; k < json.key.length; k++){
                    if(json2.key[j]==json.key[k]){
                        dontAdd=true;
                        for(var l=0; l < json.phrase.length; l++){
                            compareResponses(json.phrase[l], used[i], i);
                        }
                    }
                }
            }
        }
    if(!dontAdd){
        used.push(string);
        output("I just got smarter!"); 
        changeDefault();
    }
}

///Checks to make sure new responses are added to response arrays
function compareResponses(string, jsonObject, index){
    var json= JSON.parse(jsonObject);
    for(var i=0; i < json.phrase.length;i++){
       if(string==json.phrase[i])
           return;
    }
    for(var j=0; j < dontUse.length;j++){
       if(string==dontUse[j])
           return;
    }
    json.phrase.push(string);
    used[index]=JSON.stringify({"key": json.key,"phrase": json.phrase });
    if(moreResponses){
        output("I just got smarter!");
        moreResponses=false;
    }
}

///Used to Reset the Default of the used library to the last element
function changeDefault(){
    var last=used.length-1;
    for(var i=0; i < last ; i++){
        if(used[i].includes('DEF_AULT')){
            temp=used[last];
            used[last]=used[i];
            used[i]=temp;
            return;
        }          
    }    
}

