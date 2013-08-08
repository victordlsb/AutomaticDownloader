// listens to all the buttons in the Website parameters windows. Receives the website and the index of the website on the array to distribute it through the convenient section
var paramModified = false; 
var extensionsModified = false;

function webParamListener(website,index){
	displayWebParameters(website);
	setDeleteWebButton(index);
	setSaveChangesButton(index);
	document.getElementById("closeWebParam").onclick = function (){ closeWebParam(index)};
	checkboxes = document.getElementsByClassName("paramCheck");
	for(var i=0;i<checkboxes.length;i++){
		checkboxes[i].onclick = function () { paramModified = true; extensionsModified = true; };
	}
}

//This functions gets the extensions and conver to String only those which are not from the default program;
function extToString(ext){
	var extString = "";
	var defaultExt = [".pdf",".txt",".docx",".pptx",".zip",".rar"];
	for (var i=0;i<ext.length;i++){
		if(defaultExt.indexOf(ext[i]) === -1){
			extString = extString + ext[i] + ",";
		}	
	}
	extString = extString.slice(0,extString.length-1);
	return extString;
}

function setSaveChangesButton(index){
	var saveChangesButton = document.getElementById("saveChanges");
	saveChangesButton.onclick = function (){ 
		saveChanges(index); 
		extensionsModified = false; 
		paramModified = false;		
		
		// Prints a tick temporarily to indicate that the changes have been saved
		saveChangesButton.setAttribute("value","\u2714");
		setTimeout(function() {
			
			saveChangesButton.setAttribute("value","Save Changes");
		}, 1000);
		
	};
	saveChangesButton.onmouseover = function (){
		saveChangesButton.style["background"] = "#005C00";
	};
	saveChangesButton.onmouseout = function (){
		saveChangesButton.style["background"] = "#429c3e";
	};		
}

function setDeleteWebButton(index) {
	var deleteWebButton = document.getElementById("deleteWeb");
	deleteWebButton.onclick = function () {deleteWebsite(index);};
	deleteWebButton.onmouseover = function() {
		deleteWebButton.setAttribute("value","\u2718");
		deleteWebButton.style["background"] = "#991F00";
	};
	deleteWebButton.onmouseout = function() {
		deleteWebButton.setAttribute("value","Delete Website");
		deleteWebButton.style["background"] = "#c44343";
	};
}

// Display the websites parameters. Receives the parameters to check for them
function displayWebParameters(website){

	paramName = document.getElementById("paramName");
	paramName.value = website.name;
	paramName.onclick = function() {paramModified = true;};
	
	paramURL = document.getElementById("paramURL");
	paramURL.value = website.url;
	paramURL.onclick = function(){ paramModified = true;};
	paramURL.appendChild(document.createTextNode(website.url));
	
	
	//Checks the extensions of this file and put the correspondent check if included
	checkboxes = document.getElementsByClassName ("paramCheck");
	for(var i=0;i<checkboxes.length;i++){
		checkboxes[i].checked = (website.extensions.indexOf(checkboxes[i].id) === -1) ? false : true;
	}
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webParam").style.visibility = "visible";
	
	document.getElementById("paramMoreExt").value = extToString(website.extensions);
	document.getElementById("paramMoreExt").onclick = function () { 
		paramModified = true; 
		extensionsModified = true;
	};
}


//TODO add button Save changes


//A confirm window will ask if we want to save the changes
function closeWebParam(index){
	if(paramModified){	
		websites = getAllWebsites();
		var r = confirm("Do you want to save the changes made?");
		if(r){
			saveChanges(index);
		}
	}
	extensionsModified= false;
	paramModified = false;
	returnToMain();
}

//Save all the changes done
function saveChanges(index){
	var changesMade= false;
	if(extensionsModified){
		//Save the extensions
		var extensions = [];
		if(document.getElementById(".pdf").checked) extensions.push(".pdf") ;
		if(document.getElementById(".docx").checked) extensions.push(".docx");
		if(document.getElementById(".pptx").checked) extensions.push(".pptx");
		if(document.getElementById(".zip").checked) extensions.push(".zip") ;
		if(document.getElementById(".rar").checked) extensions.push(".rar") ;
		if(document.getElementById(".txt").checked) extensions.push(".txt") ;
		extensions = extToArray(extensions,document.getElementById("paramMoreExt").value);
		websites[index].extensions = extensions;
		changesMade= true;
	}
	if(websites[index].url !== document.getElementById("paramURL").value){
		websites[index].url = document.getElementById("paramURL").value;
		changesMade= true;
	}
	if(websites[index].name = document.getElementById("paramName").value){
		websites[index].name = document.getElementById("paramName").value;
		changesMade= true;
	}
	if(changesMade){
		storeWebsites();
		printURLs();
	}
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