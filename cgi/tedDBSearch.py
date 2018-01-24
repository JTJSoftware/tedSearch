#!/usr/bin/python

#program to search txt
#Jim Massey

import MySQLdb
import os
import glob
import cgitb
import cgi


cgitb.enable()

cgiForm = cgi.FieldStorage()
# Ask the user to enter string to search
#search_path = raw_input("Enter directory path to search : ")
search_path = cgiForm["tedFile"].value

#file_type = raw_input("File Type : ")
try:
        file_type = cgiForm["textFile"].value
#file_type = "txt"
except:
        file_type = " "
try:
        #search_str = raw_input("Enter the search string : ")
        search_str = cgiForm["searchTerm"].value
except:
        search_str = " "

use_column = cgiForm["tmp"].value

fileList = []
fileMatches = []
foundLines = ""
path = search_path + "*." + file_type
files = glob.glob(path)

# Set the db init correct for given server, shown here for just localhost
dataBase = MySQLdb.connect("localhost","Ted","TedTalkDB","tedDataSet")

cursor = dataBase.cursor()

print ""
print""
if (use_column == "tags"):
        search_strB = "%" + file_type + "%"
        speakerB = "%" + search_str + "%"
        sqlQue = ("select transcript, speaker, sourceURL, tags from tedTalkDB.tedTalks where tags like '%s' and speaker like '%s'" % (search_strB, speakerB))
        
else :
        search_strB = "%" + file_type + "%"
        speakerB = "%" + search_str + "%"
        sqlQue = ("select transcript, speaker, sourceURL, tags from tedTalksDB.tedTalks where speaker like '%s'" % (speakerB))

print "SQL is: %s" % sqlQue
cursor.execute(sqlQue)
sqlResult = cursor.fetchall()

print ""

print "<style> .tedQueryMatch{color: red; background-color:lightgrey} .tedDBMatch{margin-top:10px; margin-bottom:10px}.resultLinks{position: relative; top:2px; left:1px; width: 45%; border-style:solid; border-color:green;}</style>"


for name in sqlResult:
        tmp = name
        args = tmp[1]
        print '<div class="tedDBMatch"><span class="tedQueryMatch">Query: %s : ' % tmp[1] 
        print'<button onclick=tedTextArea("%s")>' % (tmp[0])
        print '%s</button>' % tmp[0]
        print'<br>Tags: %s' % tmp[3]
        print'<br>Source:'
        print '<a href="%s">' % tmp[2]
        print'%s</a>' % tmp[2]
        print "</span></div>"
        fileList.append(name)
exit()

