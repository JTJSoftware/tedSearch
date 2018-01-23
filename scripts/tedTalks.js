// tedTalks app js - Jim Massey

function expandQueryRow(){
    var uiButton = document.getElementById("optionsBTN");
    var uiItem = document.getElementById("queryRow");
    var uiItemsExtras = document.getElementById("queryRowExtras");
    var searchPath = document.getElementById("textFile");

    if(uiButton.innerHTML == "more"){
        uiItem.setAttribute("style", "height:5em");
	uiItemsExtras.setAttribute("style", "display:block");
	uiButton.innerHTML = "less";
    }else{
	uiItem.setAttribute("style", "height:3em");
	uiItemsExtras.setAttribute("style", "display:none");
	uiButton.innerHTML = "more";

    }
}

      function doAjax(){
      
      try{
      var xhttp = new XMLHttpRequest();
      var tmp = document.getElementById("columns").value;
	  //alert("doAjax: " + tmp);
	  
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
      document.getElementById("dataLeft").innerHTML = xhttp.responseText;
    }
      };

      var tedFile = document.getElementById("tedFile").value;
      var textFile = document.getElementById("textFile").value;
      var searchTerm = document.getElementById("searchTerm").value;
      
      xhttp.open("POST", "/cgi-bin/tedDBSearch.py", true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  xhttp.send("tedFile=" +tedFile + "&textFile=" + textFile + "&searchTerm=" + searchTerm + "&tmp=" + tmp);
	  
      }catch(e){
        alert("failed because: " + e);
      }
      
      } //end of doAjax function


 function doSearchTerm(value1, value2){
      
      try{
      var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var child = document.getElementById(value1);
      document.getElementById(value2).removeChild(child);
      var dataContainer = document.getElementById(value2);
      var newData = document.createElement("div");
      var dateTmp = new Date();
      var currentTime = dateTmp.getTime();
      var divId = value1;
      newData.setAttribute("id", divId);
      newData.setAttribute("class", "tedtext");
      dataContainer.appendChild(newData);
      
      document.getElementById(divId).innerHTML = xhttp.responseText;
    }
      };

      var tedFile = document.getElementById("tedFile").value;
      var textFile = document.getElementById("textFile").value;
      var searchTerm = document.getElementById("searchTerm").value;
      // for godaddy just use /cgi/tedTextSearch.py
      xhttp.open("POST", "/cgi-bin/tedTextSearch.py", true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhttp.send("tedFile=" +tedFile + "&textFile=" + textFile + "&searchTerm=" + searchTerm + "&documentName=" + value1);
      
      }catch(e){
        alert("doSearchTerm failed because: " + e);
      }
      
      } //end of doSearchTerm function

      

      function tedTextArea() {
      tmpData = "dataRight"
      
      var parentID = document.getElementById(tmpData);
      
      //Do not add element if already exists
      if (document.getElementById(arguments[0])){
      alert(arguments[1] + ": element ID " + arguments[0] + "Exists");
      return;
      }
	  
      value = new Date();
      valueT = value.getTime();
      var tedTextDisplay = document.createElement("div");
      tedTextDisplay.setAttribute("id", valueT);
      tedTextDisplay.setAttribute("class", "tedDocumentA");

      var tedNode = document.createTextNode(arguments[0]);
      
      //create data window button box and some buttons
      var dataBTNBox = document.createElement("div");
      dataBTNBox.setAttribute("class", "dataButtonBox");

      var tedTextSearch = document.createElement("button");
      tedTextSearch.setAttribute("class", "searchBTN");
      tedTextSearch.setAttribute("label", "search");
      tedTextSearch.setAttribute("title", "Search this text for the TXT value");
      tedTextSearch.setAttribute("onclick", "doSearchTerm('"+ arguments[0] + "','" + valueT + "')");
      var btnLabel = document.createTextNode("Search")
      tedTextSearch.appendChild(btnLabel)

      var tedRemoveBTN = document.createElement("button");
      tedRemoveBTN.setAttribute("class", "closeDataBTN");
      tedRemoveBTN.setAttribute("label", "X");
      tedRemoveBTN.setAttribute("onclick", "doRemoveThis('"+ arguments[0] + "','" + valueT + "')");
      tedRemoveBTN.setAttribute("hover", "Close this window");
      var btnLabel = document.createTextNode('\u2715')
      tedRemoveBTN.appendChild(btnLabel)

      dataBTNBox.appendChild(tedTextSearch);
      dataBTNBox.appendChild(tedRemoveBTN);
      
      tedTxtUri = document.createElement("iframe");
      tedTxtUri.setAttribute("id", arguments[0]);
      tedTxtUri.setAttribute("src", "./" + arguments[0]);
      tedTxtUri.setAttribute("class", "tedDocument");

      //Append all the above to 
      tedTextDisplay.appendChild(tedNode);
      tedTextDisplay.appendChild(dataBTNBox);
      tedTextDisplay.appendChild(tedTxtUri);

      var parentID = document.getElementById(tmpData);
      parentID.appendChild(tedTextDisplay);
      
      }

      function doRemoveThis( value1, value2){
        //remove data window/div from results
        var removeThis = document.getElementById(value2);
        removeThis.parentNode.removeChild(removeThis);
      }
