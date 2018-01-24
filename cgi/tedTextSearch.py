#!/usr/bin/python

#program to search txt
#Jim Massey


import os
import glob
import cgitb
import cgi


cgitb.enable()

cgiForm = cgi.FieldStorage()

search_path = cgiForm["tedFile"].value
#search_path value would be the file path on host to transcript texts, final path value is from db id in transcripts directory
#search_path = "/var/www/html/tedTalks/"


try:
        search_data = cgiForm["textFile"].value
#file_type = "txt"
except:
        search_data = " "
        
try:
        search_str = cgiForm["searchTerm"].value
#search_str = "government"
except:
        search_str = " "
        
document_uri = cgiForm["documentName"].value

fileList = []
fileMatches = []
foundLines = ""

files = search_path + document_uri,
print""
print ""

print"<link href='./css/tedTextSearchBX.css' rel='stylesheet'></>"
print ""

for name in files:
        fileList.append(name)

for name in fileList:
       
        print"<div class='TedDataSearched'>"
        print""
        thisFile = open(name, "r")
        while thisFile:
                line = thisFile.readline()
                lineLen = len(line)
                print "<br>"
                
                if line.find(search_data) >= 0:
                        
                        replaceSTR = " <span class='wordHighLite'>" + search_data + "</span> "
                        newLine = str.replace(line, search_data, replaceSTR)
                        print "%s"  %newLine
                        fileMatches.append(name)
                else: print "%s" %line
                if len(line) == 0:
                        print"</div>"
                        break



"""
tmp = set(fileMatches)
print"<br><br>"
print "<div>found matches in these files: <br>"
for item in tmp: print "%s<br>" %str(item)
print"</div>"
"""
