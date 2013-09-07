// listens to all the buttons in the Website parameters windows. Receives the website and the index of the website on the array to distribute it through the convenient section
var paramModified = false; 
var extensionsModified = false;
var scheduleModified = false;

function webParamListener(website,index){
	displayWebParameters(website);
	setDeleteWebButton(index);
	setSaveChangesButton(index);
	document.getElementById("closeWebParam").onclick = function (){ closeWebParam(index)};
	checkboxes = document.getElementsByClassName("paramCheck");
	for(var i=0;i<checkboxes.length;i++){
		checkboxes[i].onclick = function () { paramModified = true; extensionsModified = true; };
	}
	paramScheduleLoader(website);
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webParam").style.visibility = "visible";
}

function paramScheduleLoader(website){
	
	if(website.schedule.download)
		document.getElementById("paramDownload").checked = true;
	else
		document.getElementById("paramCheck").checked = true;
	paramBasisListener(website.schedule.typeSched);
	hourSelect = document.getElementById("paramHour");
	hourSelect.innerHTML = "";
	for(var i=0;i<24;i++){
		var opt = document.createElement('option');
		opt.value = i;
		if(i<10)
			opt.innerHTML = "0" + i;
		else 
			opt.innerHTML = i;
		hourSelect.appendChild(opt);
	}
	minSelect = document.getElementById("paramMin");
	minSelect.innerHTML = "";
	for(var i=0;i<4;i++){
		var opt = document.createElement('option');
		opt.value = i*15;
		if (i === 0)
			opt.innerHTML = "00";
		else
			opt.innerHTML = i*15;
		minSelect.appendChild(opt);
	}
	document.getElementById("paramBasis").value = website.schedule.typeSched;
	document.getElementById("paramDay").value = website.schedule.atDay;
	document.getElementById("paramHour").value = website.schedule.atHour;
	document.getElementById("paramMin").value = website.schedule.atMin;
	document.getElementById("paramBasis").onchange = function() {
		paramBasisListener(document.getElementById("paramBasis").value);
	}
}

function paramBasisListener(basis){
	switch (basis){
		case"hourly":
			document.getElementById("paramOnDay").style.visibility = "hidden";
			document.getElementById("paramHour").style.visibility = "hidden";
			break;
			
		case "daily":
			document.getElementById("paramOnDay").style.visibility = "hidden";
			document.getElementById("paramHour").style.visibility = "visible";
			break;
		
		case "weekly":
			selectDay = document.getElementById("paramDay");
			selectDay.innerHTML = "";
			for(var i=0;i<7;i++){
				var opt = document.createElement("option");
				opt.value = weekDays[i];
				opt.innerHTML = weekDays[i];
				selectDay.appendChild(opt);
			}
			document.getElementById("paramDay").style.width = "80px";
			document.getElementById("paramOnDay").style.visibility = "visible";
			document.getElementById("paramHour").style.visibility = "visible";
			break;
		
		case "monthly":
			selectDay = document.getElementById("paramDay");
			selectDay.innerHTML = "";
			for(var i=1;i<32;i++){
				var opt = document.createElement("option");
				opt.value = i
				opt.innerHTML = i;
				selectDay.appendChild(opt);
			}
			document.getElementById("paramDay").style.width = "25px";
			document.getElementById("paramOnDay").style.visibility = "visible";
			document.getElementById("paramHour").style.visibility = "visible";
			break;
			
		default:
			break;
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
		scheduleModified = false;
		
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

	document.getElementById("paramCheck").onclick = function() { paramModified = true; scheduleModified = true;};
	document.getElementById("paramDownload").onclick = function() { paramModified = true; scheduleModified = true;};
	document.getElementById("paramBasis").onclick = function() { paramModified = true;	scheduleModified = true;}
	document.getElementById("paramHour").onchange = function(){  paramModified = true; scheduleModified = true;}
	document.getElementById("paramDay").onchange = function() { paramModified = true; scheduleModified = true;}
	document.getElementById("paramMin").onchange = function() { paramModified = true; scheduleModified = true;}
	
	paramName = document.getElementById("paramName");
	paramName.value = website.name;
	paramName.onchange = function() {paramModified = true;};
	
	paramURL = document.getElementById("paramURL");
	paramURL.value = website.url;
	paramURL.onchange = function(){ paramModified = true;};
	paramURL.appendChild(document.createTextNode(website.url));
	
	paramDest = document.getElementById("paramDest");
	paramDest.value = website.destinationFolder;
	paramDest.onchange = function(){ paramModified = true;};
	paramDest.appendChild(document.createTextNode(website.destinationFolder));
	
	//Checks the extensions of this file and put the correspondent check if included
	checkboxes = document.getElementsByClassName ("paramCheck");
	for(var i=0;i<checkboxes.length;i++){
		checkboxes[i].checked = (website.extensions.indexOf(checkboxes[i].id) === -1) ? false : true;
	}
	
	document.getElementById("paramMoreExt").value = extToString(website.extensions);
	document.getElementById("paramMoreExt").onchange = function () { 
		paramModified = true; 
		extensionsModified = true;
	};
}

//A confirm window will ask if we want to save the changes
function closeWebParam(index){
	if(paramModified){	
		websites = getAllWebsites();
		var r = confirm("Do you want to save the changes made?");
		if(r){
			saveChanges(index);
		}
	}
	scheduledModified = false;
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
		changesMade = true;
	}
	if(websites[index].name = document.getElementById("paramName").value){
		websites[index].name = document.getElementById("paramName").value;
		changesMade = true;
	}
	if(websites[index].destinationFolder !== document.getElementById("paramDest").value){
			websites[index].destinationFolder = document.getElementById("paramDest").value;
			changesMade = true;
	}
	if(scheduleModified){
		var schedule = new Schedule(
			document.getElementById("paramDownload").checked,
			document.getElementById("paramBasis").value,
			document.getElementById("paramDay").value,
			document.getElementById("paramHour").value,
			document.getElementById("paramMin").value);	
		websites[index].schedule = schedule;
		setAlarms(websites[index]);
		changesMade= true;
	}
	if(changesMade){
		chrome.alarms.clear(websites[index].id.toString());
		storeWebsites();
		websites = getAllWebsites();
		printURLs();
	}
}


//Deletes a website. A confirm window will apper. If accepted, it will close the window and will go back to the main popup, which shows the updated list
function deleteWebsite(index){
	var r=confirm("Are you sure you want to delete this website?");
	if(r === true){
		websites.splice(index, 1);
		storeWebsites();
		printURLs();
		returnToMain();
	}	
}