
Project: Lab 2 SER 421 Gary ReadMe.txt
Author: Pedram Sharif and Krystle Jones
Date Last Modified: October 27, 2016

For Task 7: We were able to read in a new directory. We initially decided that the directory would always start with one dictionary file. And if someone added another file, then it would checked for duplicate keywords and responses and then added to what could be used for the files. We didn’t get to check for duplicates. We did have it say I got smarter if another file was detected though. 

For Task 9: We created a log file that will record everything from the start—>Log when log is entered. There are additional files created, which stream the rest of the session.

The JSON dictionary of responses maps a keyword to an array of responses. The dictionary is an array of these keyword to response mappings. When the user dictionary is read in, the keyword to response mappings objects are made into strings and stored into an array for use later. The responses array is shortened each time a response is used and if a keyword has no remaining responses then a default response is chosen. The last set of keyword to response mappings is the default response portion of the dictionary. 

