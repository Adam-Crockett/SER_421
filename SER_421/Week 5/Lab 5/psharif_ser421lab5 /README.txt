/// Project Name: Lab 5 README.txt
/// Author: Pedram Sharif 
/// Date Last Modified: November 17, 2016
/// Description: Accessing Elements of the DOM using DOM expressions. 


Activity 1: 

For activity 1 I did a search of "goose plays harmonica" as my 3 distinct words. When I did this search in www.bing.com, I got back a "Videos of" section 
but not a "Images of" section. I'm not sure if this will work differently in a different computer or browser other than Firefox or Chrome, but I got rid of 
the "Videos of" section for my search. 

I even mentioned this in hallway conversations on blackboard. And this is what was written: 

Me: My search doesn't have a "Images of" section. It has a "Videos of" section. Is it if I display how to get rid of the videos for this activity? 

Dr. Gary: COLLAPSE
Really? You are sure you are on Bing?
If that is all you get then OK but we need the original page you see and will check for the images. Make sure you explain what happened in your readme.
Dr. Gary

Me: Yes I typed "goose plays harmonica" and it didn't give me any images, just Videos of. I'll include it in the ReadMe.

Dr. Gary: COLLAPSE
haha you are right. That is strange, I did several searches to check for consistency. Yes please put it in your readme.
Dr. G

/////Activity 2: 

I used the same structure that Dr. Gary used in his examples for the checking for JSON.

These are some examples of what users can enter. 

example1: 

{"key" : ["bye"],  "phrase" : ["Bye", "See ya", "Thanks","See ya later.","I was glad to see ya."]}

example2: 

{"key" : ["keyword1", "keyword2"], "phrase" : ["response1", "response2", "response3"]}

/////Requirements

Requirement 1: 
The program saves the users name for the duration of the conversation. 

Requirement 2: 
I used a reply button instead of a carriage return. I will include the html skeloton I used. It references activity2.js so to make it work with activity3.js just change to 3. 

Requirement 3: 
The program removes responses that have been used for keywords. 

Requirement 4: 
The program will prompt the user every 20 seconds with a random response and the users name. 

Requirement 5: 
The program will detect for the presence of JSON that matches the example as above. If it doesn't than it will output to the user what the JSON object should look like. If there is an error it will be outputted to the user explaining what is wrong with the JSON. 

Requirement 6: 
The clear function works by having the user type "clear". It will restart a new conversation. 

/////Activity 3: 

Requirement 1: The users conversation, and responses will be saved using the username as a key. 

Requirement 2: The clear function will remove the localStorage keys that were set and variables for the user. It will restart a new conversation. 


