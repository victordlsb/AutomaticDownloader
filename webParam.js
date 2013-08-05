// listens to all the buttons in the Website parameters windows. Receives the website and the index of the website on the array to distribute it through the convenient section
function webParamListener(website,index){
	displayWebParameters(website);
	document.getElementById("deleteWeb").onclick = function () {deleteWebsite(index);};
	document.getElementById("closeWebParam").onclick = closeWebParam;
}

// Display the websites parameters. Receives the parameters to check for them
function displayWebParameters(website){
	document.getElementById("paramURL").innerHTML = "";
	document.getElementById("paramURL").appendChild(document.createTextNode(website.get_URL));
	//Checks the extensions of this file and put the correspondent check if included
	document.getElementById(".pdf").checked = (website.get_Extensions.indexOf(".pdf") === -1) ? false : true;
	document.getElementById(".doc").checked = (website.get_Extensions.indexOf(".doc") === -1) ? false : true;
	document.getElementById(".ppt").checked = (website.get_Extensions.indexOf(".ppt") === -1) ? false : true;
	document.getElementById(".zip").checked = (website.get_Extensions.indexOf(".zip") === -1) ? false : true;
	document.getElementById(".rar").checked = (website.get_Extensions.indexOf(".rar") === -1) ? false : true;
	document.getElementById(".txt").checked = (website.get_Extensions.indexOf(".txt") === -1) ? false : true;
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webParam").style.visibility = "visible";
}


// Closes the website parameters windows. 

// Option 1: Any change made will be saved when closing it
// Option 2: A confirm window will ask if we want to save the changes
function closeWebParam(){
	document.getElementById("main").style.visibility = "visible";
	document.getElementById("webParam").style.visibility = "hidden";	
}

//Deletes a website. A confirm window will apper. If accepted, it will close the window and will go back to the main popup, which shows the updated list
function deleteWebsite(index){
	var r=confirm("Are you sure you want to delete this website?");
	if(r === true){
		websites.splice(index, 1);
		localStorage.removeItem('websites');
		storeWebsites();
		printURLs();
		closeWebParam();
	}	
}