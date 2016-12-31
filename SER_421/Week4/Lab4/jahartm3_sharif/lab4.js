// SER 315 - Web Applications
// FallB 2016, with Kevin Gary

//******************************************
// Lab 4 - Node Express
// Programmers: Jake Hartman & Pedram Sherif
// Date: Nov 10, 2016
//******************************************


//**********************************************************************************
// REQUIRE statements
var express      = require('express'),
    session      = require('express-session'),
    ejs          = require('ejs'),
    events       = require('events'),
    url          = require('url'),
    cookieParser = require('cookie-parser'),
    query        = require('query'),
    bodyParser   = require('body-parser'),
    fs           = require('fs');
                   require('./functions.js')();

// VAR declarations
var app      = express();
var eventEmitter = new events.EventEmitter();
var survey   = JSON.parse(fs.readFileSync('survey.json', 'utf8'));
var answer1;
var answer2;
var answer3;
var answer4;
var timeexpried;
// Setting template engine
app.set('views', './views');
app.engine('html', ejs.renderFile);

// Middleware
app.use(session({secret: 'sshh',
                resave: true,
                saveUninitialized: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Now listening on port 3000
app.listen(3000);

//**********************************************************************************
// ROUTES 

// Route for matches page, also home for signed in users
app.get('/matches', function(request, response){
            timeexpired = "false";
            
            // Set the session        
            if(!request.session.currentuser){
                request.session.currentuser = request.query.username;
                request.session.password = request.query.password;
            }
            // Set hasvisited cookie
            response.cookie('hasVisited', request.session.currentuser);
    
            // Write stored survey answers to file and reset session vars
            if(request.session.surveyTaken == true){
                if(!answer4)
                    request.session.q4 = request.query.answer;
                else{
                request.session.q4 = answer4;
                    answer4 = '' ;
                } 
                writeAnswers(request.session.currentuser, request.session.q1, request.session.q2, request.session.q3, request.session.q4);
            }

                // Before displaying page check if correct credentials
                var correctCreds = fakeAuth(request.session.currentuser, request.session.password);
                var isKnownUser = checkUserStore(request.session.currentuser);
                
                // Check to see if user has stored information in the json file
                if(isKnownUser == true){
                    
                    // Set best Matches equal to
                    var bestMatches = getBestMatches(request.session.currentuser);
                    
                    // Render page
                    response.render('matches.html', {message: "Your top 3 matches", match1: bestMatches[0], match2: bestMatches[1], match3: bestMatches[2], surveyButton: "Retake Survey"}, function(err, renderedData){
                        response.send(renderedData);
                    });  
                }else if(request.session.currentuser == "admin"){
                    response.redirect('/tools');    
                }else if(correctCreds == true){
                    // Write the new username and password to the userStore.json file
                    writeUserPass(request.session.currentuser, request.session.password);
                    
                    // Setting hasVisited Cookie for the first time
                    response.redirect('/survey/1');
                }else{
                    response.render('logout.html', {logoutMessage: "Invalid Username or Password"}, function(err, renderedData){
                        response.send(renderedData);
                    }); 
                }
            
});

// Route for landing page -USING HANDLEBARS TEMPLATE ENGINE
app.get('/', function(request, response){
                response.redirect('/login');
});

// Route for login page - USING HANDLEBARS TEMPLATE ENGINE
app.get('/login', function(request, response){
                request.session.destroy();
                if(request.cookies.hasVisited){
                    var placeholder = request.cookies.hasVisited;
                }
    
                // Render page
                response.render('login.html', {username: placeholder, password: placeholder}, function(err, renderedData){
                    response.send(renderedData);
                });
});

// Route for logout page
app.get('/logout', function(request, response){
            request.session.destroy();                           
            // Render page
            response.render('logout.html', {logoutMessage: "You have been logged out"}, function(err, renderedData){
                response.send(renderedData);
            });
});

// oute for tools page
app.get('/tools', function(request, response){
            var users = viewUserStore(); 
            
            if(request.session.currentuser != "admin"){
                // Render page
                response.render('logout.html', {logoutMessage: "You do not have permissions"}, function(err,   renderedData){
                    response.send(renderedData);
                });                  
            }else if(request.query.delete){
                var done = deleteUser(request.query.delete);
                var usersdel = viewUserStore();
                // Render page
                response.render('tools.html', {users: usersdel, currentUser:"", question1: survey.survey[0].question, question2: survey.survey[1].question, question3: survey.survey[2].question, question4: survey.survey[3].question, answer1:" ", answer2:" ", answer3:" ", answer4:" "}, function(err, renderedData){
                    response.send(renderedData);
                });

            }else if(request.query.view){
                var userAnswers = viewUser(request.query.view)
                
                
                // Render page
                response.render('tools.html', {users: users, currentUser: request.query.view, question1: survey.survey[0].question, question2: survey.survey[1].question, question3: survey.survey[2].question, question4: survey.survey[3].question, answer1:userAnswers[0], answer2:userAnswers[1], answer3:userAnswers[2], answer4:userAnswers[3]}, function(err, renderedData){
                    if(err){
                        console.log("there was an error");
                    }
                    response.send(renderedData);
                });         
            }else{
                
                // Render page
                response.render('tools.html', {users: users, currentUser: "", question1: survey.survey[0].question, question2: survey.survey[1].question, question3: survey.survey[2].question, question4: survey.survey[3].question, answer1:" ", answer2:" ", answer3:" ", answer4:" "}, function(err, renderedData){
                    response.send(renderedData);
                });
            }
});

// Route for Survey question 1 page
app.get('/survey/1', function(request, response){
            setTimeout(function(){
                if(!request.session.surveyTaken)
                    timeexpired = "true";
                    console.log(request.session.timeExpired);
            }, 120000); //two minutes
            
            if(request.session.timeExpired == true)
                {
                    response.redirect('/matches');
                }else{
    
            // Check for prepoluated fields
            var check1 = "";
            var check2 = "";
            var check3 = "";
    
            var answers = findPrevAnswers(request.session.currentuser, 1);
            if(answers==1)
                {
                    check1 = "checked=\"checked\""; 
                }else if(answers==2){
                    check2 = "checked=\"checked\"";
                }else if(answers==3){
                   check3 = "checked=\"checked\""; 
                }else{
                    // Do nothing. 
                }
                     
            // Render page
            response.render('survey.html', {question: survey.survey[0].question, answer1: survey.survey[0].answers[0], answer2:survey.survey[0].answers[1], answer3:survey.survey[0].answers[2], check1:check1,check2:check2,check3:check3, path: "/survey/2"}, function(err, renderedData){
                response.send(renderedData);
            });
            }
});
// POST handler sets
app.post('/survey/1', function(request, response){
        answer1 = request.query.answer;
            
        response.send(answer1);
});

// Route for Survey question 2 page
app.get('/survey/2', function(request, response){

            if(timeexpired == "true")
                {
                    response.redirect('/matches');
                }else{
    
            //
            if(!answer1)
                request.session.q1 = request.query.answer; 
            else{
              request.session.q1 = answer1;
                answer1 = '' ;
            }    
            // Check for prepoluated fields
            var check1 = "";
            var check2 = "";
            var check3 = "";
    
            var answers = findPrevAnswers(request.session.currentuser, 2);
            if(answers==1)
                {
                    check1 = "checked=\"checked\""; 
                }else if(answers==2){
                    check2 = "checked=\"checked\"";
                }else if(answers==3){
                   check3 = "checked=\"checked\""; 
                }else{
                    // Do nothing. 
                }
            // Render page
            response.render('survey.html', {question: survey.survey[1].question, answer1:survey.survey[1].answers[0], answer2:survey.survey[1].answers[1], answer3:survey.survey[1].answers[2],check1:check1,check2:check2,check3:check3, path: "/survey/3"}, function(err, renderedData){
                response.send(renderedData);
            });        
            }
});

app.post('/survey/2', function(request, response){
        answer2 = request.query.answer;
            
        response.send(answer2);
});

// Route for Survey question 3 page
app.get('/survey/3', function(request, response){
            if(timeexpired == "true")
                {
                    response.redirect('/matches');
                }else{
            //Handles POST answer 
            if(!answer2)
                request.session.q2 = request.query.answer;
            else{
              request.session.q2 = answer2;
                answer2 = '' ;
            } 
            // Check for prepoluated fields
            var check1 = "";
            var check2 = "";
            var check3 = "";
    
            var answers = findPrevAnswers(request.session.currentuser, 3);
            if(answers==1)
                {
                    check1 = "checked=\"checked\""; 
                }else if(answers==2){
                    check2 = "checked=\"checked\"";
                }else if(answers==3){
                   check3 = "checked=\"checked\""; 
                }else{
                    // Do nothing. 
                }
            // Render page
            response.render('survey.html', {question: survey.survey[2].question, answer1:survey.survey[2].answers[0], answer2:survey.survey[2].answers[1], answer3:survey.survey[2].answers[2],check1:check1,check2:check2,check3:check3, path: "/survey/4"}, function(err, renderedData){
                response.send(renderedData);
            });
            }
});

app.post('/survey/3', function(request, response){
        answer3 = request.query.answer;
            
        response.send(answer3);
});
// Route for final Survey question
app.get('/survey/4', function(request, response){
            if(timeexpired == "true")
                {
                    response.redirect('/matches');
                }else{
            //Handles posted answer
            request.session.surveyTaken = true;
            if(!answer3)
                request.session.q3 = request.query.answer;
            else{
              request.session.q3 = answer3;
                answer3 = '' ;
            } 
            // Check for prepoluated fields
            var check1 = "";
            var check2 = "";
            var check3 = "";
    
            var answers = findPrevAnswers(request.session.currentuser, 4);
            if(answers==1)
                {
                    check1 = "checked=\"checked\""; 
                }else if(answers==2){
                    check2 = "checked=\"checked\"";
                }else if(answers==3){
                   check3 = "checked=\"checked\""; 
                }else{
                    // Do nothing. 
                }
            // Render page
            response.render('survey.html', {question: survey.survey[3].question, answer1:survey.survey[3].answers[0], answer2:survey.survey[3].answers[1], answer3:survey.survey[3].answers[2],check1:check1,check2:check2,check3:check3, path: "/matches"}, function(err, renderedData){
                response.send(renderedData);
            });
            }
});

app.post('/survey/4', function(request, response){
        answer4 = request.query.answer;
            
        response.send(answer4);
});
//eventEmitter.on('timeExpired', );
// 404 Route - catches all bad urls
app.get('*', function(request, response){
  response.status(404).send('404 Not Found');
});

