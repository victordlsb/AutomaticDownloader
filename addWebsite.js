// Listener to all the buttons in the add window
function addPopupListener(){
	setAddURLButton();
	document.getElementById("closeAdd").onclick = returnToMain;
}

function setAddURLButton(){
	addButton=document.getElementById("addURL");
	addButton.onclick =  addURL;
	addButton.onmouseover = function (){
		addButton.style["background"] = "#005C00";
		addButton.setAttribute("value","\u2714");
	};
	addButton.onmouseout = function (){
		addButton.style["background"] = "#429c3e";
		addButton.setAttribute("value","Add Website");
	};		
}


// Displays the add window. It opens the form where the URL is with the URL of the tab that is currently active
function displayAddPopup(){
	document.getElementById("newName").value = "";
	chrome.windows.getCurrent(
		function (currentWindow){
			chrome.tabs.query({active: true, windowId: currentWindow.id},
			function(activeTabs) {	
				document.getElementById("newURL").value = activeTabs[0].url })
	});
	document.getElementById("addMoreExt").value = "";
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("addPopup").style.visibility = "visible";
}



//adds a website to the system. 
function addURL(){
	//Check for the extensions the website will download
	var extensions = [];
	if(document.getElementById("pdf").checked) extensions.push(".pdf") ;
	if(document.getElementById("docx").checked) extensions.push(".docx");
	if(document.getElementById("pptx").checked) extensions.push(".pptx");
	if(document.getElementById("zip").checked) extensions.push(".zip") ;
	if(document.getElementById("rar").checked) extensions.push(".rar") ;
	if(document.getElementById("txt").checked) extensions.push(".txt") ;
	
	if(document.getElementById("newName").value !== ""){
		var name = document.getElementById("newName").value;
	} else {
		var name = document.getElementById("newURL").value;
	}
	
	//Read the form for other extensions
	var otherExtensions = document.getElementById("addMoreExt").value;
	
	extensions = extToArray(extensions,otherExtensions);
	
	//Stores the website
	newWebsite = new TrackedWebsite(document.getElementById("newURL").value,extensions, name);
	websites = getAllWebsites();
	websites.push(newWebsite);
	storeWebsites();
	
	if(websites.length === 1){  // This way cleans the screen before printing the first URL
		printURLs();
	} else {
		printOneURL(newWebsite,websites.length-1);
	}
	returnToMain();
}

