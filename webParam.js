// listens to all the buttons in the Website parameters windows. Receives the website and the index of the website on the array to distribute it through the convenient section
var paramModified = false; 

function webParamListener(website,index){
	displayWebParameters(website);
	document.getElementById("deleteWeb").onclick = function () {deleteWebsite(index);};
	document.getElementById("closeWebParam").onclick = function (){ closeWebParam(index)};
	checkboxes = document.getElementsByClassName("paramCheck");
	for(var i=0;i<checkboxes.length;i++){
		checkboxes[i].onclick = function () { paramModified = true; };
	}
}

// Display the websites parameters. Receives the parameters to check for them
function displayWebParameters(website){
	paramURL = document.getElementById("paramURL");
	paramURL.innerHTML = "";
	paramURL.href = website.url;
	//Open the website when clicked on it
	paramURL.onclick = function () {window.open(website.url)};
	paramURL.appendChild(document.createTextNode(website.url));
	//Checks the extensions of this file and put the correspondent check if included
	checkboxes = document.getElementsByClassName ("paramCheck");
	for(var i=0;i<checkboxes.length;i++){
		checkboxes[i].checked = (website.extensions.indexOf(checkboxes[i].id) === -1) ? false : true;
	}
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webParam").style.visibility = "visible";
}


// Closes the website parameters windows. 

// Option 1: Any change made will be saved when closing it
// Option 2: A confirm window will ask if we want to save the changes
function closeWebParam(index){
	if(paramModified){	
		var r = confirm("Do you want to save the changes made?");
		if(r){
			//This is not the same code as the one in addWebsite, as every checkbox has a unique ID
			//Save the extensions
			var extensions = [];
			if(document.getElementById(".pdf").checked) extensions.push(".pdf") ;
			if(document.getElementById(".doc").checked) {
				extensions.push(".doc");
				extensions.push(".docx");
			}
			if(document.getElementById(".ppt").checked){
				extensions.push(".ppt") ;
				extensions.push(".pptx");
			}
			if(document.getElementById(".zip").checked) extensions.push(".zip") ;
			if(document.getElementById(".rar").checked) extensions.push(".rar") ;
			if(document.getElementById(".txt").checked) extensions.push(".txt") ;
			
			websites = getAllWebsites();
			websites[index].extensions = extensions;
			storeWebsites();
			printURLs();
		}
	}
	returnToMain();
	paramModified = false;
}

//Deletes a website. A confirm window will apper. If accepted, it will close the window and will go back to the main popup, which shows the updated list
function deleteWebsite(index){
	var r=confirm("Are you sure you want to delete this website?");
	if(r === true){
		websites.splice(index, 1);
		localStorage.removeItem('websites');
		storeWebsites();
		printURLs();
		returnToMain();
	}	
}