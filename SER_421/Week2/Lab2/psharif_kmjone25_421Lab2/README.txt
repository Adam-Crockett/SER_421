Project: Lab 2 SER 421 Gary ReadMe.txt
Author: Pedram Sharif and Krystle Jones
Date Last Modified: October 29, 2016

\\\\\\\\\\\\\\\\\
JSON DICTIONARY:\\ 
\\\\\\\\\\\\\\\\\\

The JSON dictionary of responses maps a keyword to an array of responses. 

Example: 

{"dictionary" : [{"keyword" : "cucamunga",  "responses" : ["So your ok then.", "Why?", "Okey Dokey."]},
				 {"keyword" : "icloud",  "responses" : ["Nice", "Why that?", "Right."]},
                 {"keyword" : "DEF_AULT",  "responses" : ["This a default", "Huh?", "Ok then."]}
                 ]
}

The dictionary is an array of these keyword to response mappings. When the user dictionary is read in, the keyword to response mappings objects are made into strings and stored into an array called "used" for use later. All keywords in the dictionary are lowercase except for the defualt case.  

The responses array is shortened each time a response is used and if a keyword has no remaining responses, or the user does not enter a keyword, then a default response is chosen. The last set of keyword to response mappings is the default response portion of the dictionary. 

The dictionary files are stored in the same working directory as the eliza.js file. There is no subdirectory that holds files. Also no subdirectories will be searched for ".json" files. But any ".json" files that are in the working directory will be read in and if a new keyword is found the mapping will be added to used files. If the keyword is the same as one of the mappings in the used array, then any new responses will be added to the responses array. 

The initial json dictionary will not be written to or modified in the program. This should conform to what the professor wrote in hallway conversations for week 2. 

"I am not asking you to write the dictionary back out if that is what you mean by the 2nd question. Either way, I would expect you to load whatever json dictionaries are present in the directory in which you are executing on startup." -- Dr. Gary

Instead any new files will be added to the used dictionary and the new mappings will become available keyword to response mapping in the program. 

We will include some sample dictionaries to be tested with the initial JSON dictionary. They will be labeled sample1.json, sample2.json and sample3.json. They should include duplicate keywords and responses for testing.

***NOTE ABOUT STARTUP******** 
If you have more than one .json file in the working directory at the time the program will start out displaying "I just got smarter!!!" Also the program will work if you do not start it with a .json file, but if only 1 file is added within 15 seconds it will not display any prompt. So it is best to start with one initial file on startup, then add .json file dictionaries a couple of seconds after startup. The program checks for new dictionaries every 15 seconds. So you can add 1 every 15 seconds to test if it displays "I just got smarter!!!". I am including 3 files for testing and a startup_dictionary. They should have similar keywords so the responses arrays should get large.  

\\\\\\\
TASKS:\\ 
\\\\\\\\

For Task 1: We greeted the user with a read line question function asking for their name. This function also Loads the initial library. And then transitions to a common greeting. 

For Task 2: The common greetings are stored in a local array. We could have used a JSON dictionary but reserved it for responses.

For Task 3 and 4: We used readline to get the users keyword and then used response functions to randomize responses and to remove any responses that have been used in the session. 

For Task 5: We created a Timer object in our code that is used for task 5, 7. It is used in this task if the user does not enter a response in 20 seconds than a array of prompts will be displayed to get the user to type something. 

For Task 6: The readline function will check for the user to enter "quit" if they do the program will exit. 

For Task 7: The dictionary is updated by the program every 15 seconds. If a new file is added within 15 second intervals than the program should add the new definitions to the used dictionary. These definitions will not be appended to the initial dictionary though. They will just become available in the program. There is a custome event emitter that will display "I got smarter!!!" if the user adds one of more files during the interval. If the user starts the program with more than one .json dictionary file, the program will display "I got smarter!!!" at the beginning. 

For Task 8: Every three minutes a timer function will ask the user to join them for coffee at Dunkin Donuts. And if the user enters maybe and subsequent prompts will be turned off. 

For Task 9: We created a log file that will record everything from the start—>Log when log is entered. These files have the "<name>_<datetime>.log format and should become available in the working dictionary. There will not be a subdirectory for the log files. There is an additional myfile.log which is a duplicate of the <name>_<datetime>.log file. 
