SER 421 - F16 - Web Applications and Mobile Systems
with Kevin Gary

Program - Lab 4 e421Match
November 10, 2016
Description:
    To demonstrate MVC this program is used to determine who should be your next SER421 Lab partner. It accomplished this by having a user upon login take a survey and then matches the survey answers with the rest of the users who have taken the survey. It then shows the top 3 best matches for you. There is also an admin console for viewing users survey answers and deleting them. 

Coders:
    Jake Hartman
    Pedram Sharif
    
***********************************************************************
List of all the files:
    functions.js - contains functions imported in lab4.js
    lab4.js - where the server is started, uses routes to display pages, port 3000
    survey.json - holds the survey questions and possible answers
    userstore.json - holds the known users, their password and answers to survey
    >node_modules 
        *folders/files downloaded via npm install
    >views
        login.html -  rendered with html
        logout.html - rendered with ejs 
        matches.html - rendered with ejs 
        survey.html - rendered with ejs 
        tools.html - rendered with ejs 
        
    IMPORTANT NOTES ABOUT THE FILES, 
    
    userstore.json - 
        Format is one usersore array that holds the information: username, password, q1, q2, q3, q4 where the q# is any number between 0 and 4. This represents the answer number. We have provided a sample userstore for use so you don't have to create and go through the survey as many times to get a decent sample pool. 
    survey.json - 
        Format is one survey array that holds the informaiton: question, and then an answers array. This can be modified to change the survey questions if wanted. But the pages will only show 3 questions with the first 3 answers. 
    lab4.js -
        In order for the program to run you MUST npm install the following:
            npm install express
            npm install express-session
            npm install ejs
            npm install cookie-parser
            npm install query
            npm install body-parser
        
***********************************************************************
IMPORTANT Notes
    
    ***assumption 1.b.ii***
    In, Specific Assumptions for your implementation,
    says if accessed via POST it is expected to represent the submission and should be persested in conversational state. We took this as if sent a POST request then it stores the url param you pass it in the session and remembers the answer until it is written to the userstore.json file at the completion of the survey. If you quit the survey the posted answer is lost just like if you were to not finish the survey. The url param to post is:
        answer = #
    Where # is any number from 0-3, this represents one of the survey answers. 0 meaning no answer was selected. 
    
    ***assumption 4***
    In, Specific Assumptions for your implementation,
    talks about setting the timer. This is true and the timer is set via timeout. If 2 minutes have passed then going to the next page redirects you back to the /matches page and your survey answers are not stored. 
    
    ***ADMIN ROLE***
    The admin role can be accessed via logging in with the username admin. The password can be anything or nothing, just as long as the username is admin. You will not be able to get into the /tools page without logging in with admin. On the tools page view and delete both work, however for deletion it will need to have a page refresh to update the list of users. This can be clicking the refresh button or simply clicking any view button. The view survey results are on the same page for efficiency. Going to a seperate page and then going back seemed to be a hassle.
***********************************************************************



