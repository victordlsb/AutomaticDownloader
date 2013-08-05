// Listener to all the buttons in the add window
function addPopupListener(){
	document.getElementById("addURL").onclick =  addURL;
	document.getElementById("closeAdd").onclick = closeAdd;
}

// Displays the add window. It opens the form where the URL is with the URL of the tab that is currently active
function displayAddPopup(){
	
	chrome.windows.getCurrent(
		function (currentWindow){
			chrome.tabs.query({active: true, windowId: currentWindow.id},
			function(activeTabs) {	
				document.getElementById("newURL").value = activeTabs[0].url })
	});
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("addPopup").style.visibility = "visible";
}

// Closes the add website window
function closeAdd(){
	document.getElementById("main").style.visibility = "visible";
	document.getElementById("addPopup").style.visibility = "hidden";
}

//adds a website to the system. 
function addURL(){
	//Check for the extensions the website will download
	var extensions = [];
	if(document.getElementById("pdf").checked) extensions.push(".pdf") ;
	if(document.getElementById("doc").checked) {
		extensions.push(".doc");
		extensions.push(".docx");
	}
	if(document.getElementById("ppt").checked){
		extensions.push(".ppt") ;
		extensions.push(".pptx");
	}
	if(document.getElementById("zip").checked) extensions.push(".zip") ;
	if(document.getElementById("rar").checked) extensions.push(".rar") ;
	if(document.getElementById("txt").checked) extensions.push(".txt") ;
	
	//Stores the website
	newWebsite = trackedWebsite(document.getElementById("newURL").value,extensions);
	console.log(newWebsite);
	websites = getAllWebsites();
	websites.push(newWebsite);
	storeWebsites();
	console.log(getAllWebsites());
	
	if(websites.length === 1){  // This way cleans the screen before printing the first URL
		printURLs();
	} else {
		PrintOneURL(newWebsite,websites.length-1);
	}
	closeAdd();
}

