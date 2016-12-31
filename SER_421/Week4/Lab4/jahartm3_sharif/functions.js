//**********************************************************************************
// FUNCTIONS 

module.exports = function() {
    
var fs = require('fs');

// Determine if the password and username matches returns true or false
 this.fakeAuth = function(name, pass){
   
    // Compare the username and password variables - if they match return true
    if(name != undefined && pass != undefined){
        if(name == pass){           
                return true;
            }else{
                return false;
            }
        }else
            return false;
},

// Traverse the user store json file to find stored users and surveys
this.checkUserStore = function(user){
    var users    = JSON.parse(fs.readFileSync('userstore.json', 'utf8'));
     
    for(i = 0; i < users.userStore.length; i++){    
        if(users.userStore[i].username === user){
            return true;
        }       
    }
     return false;   
},
     
// Traverse the users and print them out
this.viewUserStore = function(user){
    var users    = JSON.parse(fs.readFileSync('userstore.json', 'utf8'));
    var userStack = [];
     
    for(i = 0; i < users.userStore.length; i++){
        userStack.push(users.userStore[i].username);
    }
     
     return userStack;  
},
     
// Find best matches by comparing the answers to the survey questions
this.getBestMatches = function(user){
     var users      = JSON.parse(fs.readFileSync('userstore.json', 'utf8'));
     var matchStack = [];
     var userMatches=0;
     var userNum=0;
    
     //console.log("This is the number of users stored in JSON:" + users.userStore.length);
     
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                userNum = i;
            }
    }
    
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");
            }else{
                if( users.userStore[i].q1 == users.userStore[userNum].q1 && // Case 1
                    users.userStore[i].q2 == users.userStore[userNum].q2 &&
                    users.userStore[i].q3 == users.userStore[userNum].q3 && 
                    userMatches < 3)
                    {
                        matchStack.push(users.userStore[i].username);
                        userMatches++;
                    }
            }
    }
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");
            }else{
                if(users.userStore[i].q1 == users.userStore[userNum].q1 && //Case 2
                   users.userStore[i].q2 == users.userStore[userNum].q2 && 
                   users.userStore[i].q3 != users.userStore[userNum].q3 && 
                   userMatches < 3)
                        {
                            matchStack.push(users.userStore[i].username);
                            userMatches++;
                        }
            }
    }
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");
            }else{
                if(users.userStore[i].q1 != users.userStore[userNum].q1 && //Case 3
                   users.userStore[i].q2 == users.userStore[userNum].q2 &&
                   users.userStore[i].q3 == users.userStore[userNum].q3 && 
                   userMatches < 3)
                        {
                            matchStack.push(users.userStore[i].username);
                            userMatches++;
                        }
            }
    }
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");
            }else{
                if(users.userStore[i].q1 == users.userStore[userNum].q1 && // Case 4
                   users.userStore[i].q2 != users.userStore[userNum].q2 && 
                   users.userStore[i].q3 == users.userStore[userNum].q3 && 
                   userMatches < 3)
                        {
                            matchStack.push(users.userStore[i].username);
                            userMatches++;
                        }
            }
    }
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");
            }else{
                if(users.userStore[i].q1 != users.userStore[userNum].q1 && // Case 5
                   users.userStore[i].q2 == users.userStore[userNum].q2 &&
                   users.userStore[i].q3 != users.userStore[userNum].q3 && 
                   userMatches < 3)
                        {
                            matchStack.push(users.userStore[i].username);
                            userMatches++;
                        }
            }
    }
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");
            }else{
                if(users.userStore[i].q1 == users.userStore[userNum].q1 && // Case 6
                   users.userStore[i].q2 != users.userStore[userNum].q2 && 
                   users.userStore[i].q3 != users.userStore[userNum].q3 && 
                   userMatches < 3)
                        {
                            matchStack.push(users.userStore[i].username);
                            userMatches++;
                        }
            }
    }
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");
            }else{
                if(users.userStore[i].q1 != users.userStore[userNum].q1 && // Case 7
                   users.userStore[i].q2 != users.userStore[userNum].q2 && 
                   users.userStore[i].q3 == users.userStore[userNum].q3 && 
                        userMatches < 3)
                        {
                            matchStack.push(users.userStore[i].username);
                            userMatches++;
                        }
            }
    }
    for(var i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user)
            {
                console.log("ignoring self");//Case 8
            }else{
                if(userMatches < 3)
                        {
                            matchStack.push(users.userStore[i].username);
                            userMatches++;
                        }
            }
    }
     
//Prints the Best matches to console
    for (var i=0; i < matchStack.length; i++)
    {
        console.log("These are the matches: " + matchStack[i]);
    }
     
     return matchStack; 
 
},
// Writes the answers to the json userstore file if they haven't taken survey or retake it
this.writeAnswers = function(user, q1, q2, q3, q4) {
    var users    = JSON.parse(fs.readFileSync('userstore.json', 'utf8'));
     
    for(i = 0; i < users.userStore.length; i++){
        if(users.userStore[i].username == user){
            users.userStore[i].q1 = q1;
            users.userStore[i].q2 = q2;
            users.userStore[i].q3 = q3;
            users.userStore[i].q4 = q4;
            console.log("answers written");
        }
    }
    
     fs.writeFileSync('userstore.json', JSON.stringify(users));
},
     
// Function to add an authorized user to the user store   
this.writeUserPass = function(name, pass) {
    var storeObj = {userStore: []};
    
    fs.readFile('userstore.json', function readFileCallback(err, data){
        if(err){
            console.log(err);
        }else{
            storeObj = JSON.parse(data);
            storeObj.userStore.push({username: name, password: pass, q1: "0", q2: "0", q3: "0", q4: "0"});
            var json = JSON.stringify(storeObj);
            fs.writeFile('userstore.json', json);
        }
        
        return true;
    })
},
    
// Function to DELETE user from the userstore   
this.deleteUser = function(user) {
    var storeObj = {userStore: []};
    var userObj = {userStore: []};
    
    fs.readFile('userstore.json', function readFileCallback(err, data){
        if(err){
            console.log(err);
        }else{
            storeObj = JSON.parse(data);
            for(i = 0; i<storeObj.userStore.length;i++){
               if(storeObj.userStore[i].username == user){
                   //Do nothing - don't write to file
               } else
                  userObj.userStore.push(storeObj.userStore[i]);  
            }
            
            var json = JSON.stringify(userObj);
            fs.writeFile('userstore.json', json);
        }
        
        return true;
    })    
},
     
// Function to find the corresponding answer to the question for viewing survey results    
this.findPrevAnswers = function(user, questionNum){
     var users       = JSON.parse(fs.readFileSync('userstore.json', 'utf8'));
     var answers     = JSON.parse(fs.readFileSync('survey.json', 'utf8'));
     var answerStack = []; 
     var answer;
     
     
    for(i=0; i<users.userStore.length; i++){
        if(users.userStore[i].username == user){
            answerStack.push(users.userStore[i].q1);
            answerStack.push(users.userStore[i].q2);
            answerStack.push(users.userStore[i].q3);
            answerStack.push(users.userStore[i].q4);  
        }
    }
    
     if(questionNum == 1)
         {
             answer = answerStack[0];
         }else if(questionNum == 2)
             {
                 answer = answerStack[1];
             }else if(questionNum == 3){
                 answer = answerStack[2];
             }else{
                 answer = answerStack[3];
             }
     
    return answer;
},
     
// Function to find the corresponding answer to the question for viewing survey results    
this.viewUser = function(user){
     var users       = JSON.parse(fs.readFileSync('userstore.json', 'utf8'));
     var answers     = JSON.parse(fs.readFileSync('survey.json', 'utf8'));
     var answerStack = []; 
     
    for(i=0; i<users.userStore.length; i++){
        if(users.userStore[i].username == user){
            answerStack.push(answers.survey[0].answers[users.userStore[i].q1 - 1]);
            answerStack.push(answers.survey[1].answers[users.userStore[i].q2 - 1]);
            answerStack.push(answers.survey[2].answers[users.userStore[i].q3 - 1]);
            answerStack.push(answers.survey[3].answers[users.userStore[i].q3 - 1]);  
        }
    }
    return answerStack;
};

    
    
    
    
    
    
    
    
    
    
    
    
    
    
}






