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
	newWebsite = trackedWebsite(document.getElementById("newURL").value);
	websites = getAllWebsites();
	websites.push(newWebsite);
	storeWebsites();
	if(websites.length === 1){  // This way cleans the screen before printing the first URL
		printURLs();
	} else {
		PrintOneURL(newWebsite,websites.length-1);
	}
	closeAdd();
}
	