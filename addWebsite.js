//Used for the Destination Folder form behaviour
var keyStroked = false;

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
	document.getElementById("newDest").value = "";
	keyStroked = false;
	document.getElementById("pdf").checked = true;
	document.getElementById("docx").checked= true;
	document.getElementById("pptx").checked= true;
	document.getElementById("zip").checked = true;
	document.getElementById("rar").checked = true;
	document.getElementById("txt").checked = true;
	addScheduleListener();
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("addPopup").style.visibility = "visible";

}


// Listener to all the buttons in the add window
function addPopupListener(){
	setAddURLButton();
	setNewDestFormBehaviour();
	document.getElementById("closeAdd").onclick = returnToMain;
}

//Controls the schedule form
function addScheduleListener(){
	document.getElementById("addDownload").checked = true;
	document.getElementById("addBasis").value = "daily";
	document.getElementById("addHour").style.visibility = "visible";
	hourSelect = document.getElementById("addHour");
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
	minSelect = document.getElementById("addMin");
	minSelect.innerHTML = "";
	var opt = document.createElement('option');
	opt.value = 0;
	opt.innerHTML = "00";
	minSelect.appendChild(opt);
	for(var i=1;i<4;i++){
		var opt = document.createElement('option');
		opt.value = i*15;
		opt.innerHTML = i*15;
		minSelect.appendChild(opt);
	}
	document.getElementById("addBasis").onchange = basisListener;
}

//Changes how the schedule form looks like depending on the schedule basis
function basisListener(){
	basis = document.getElementById("addBasis").value;
	switch (basis){
		case"hourly":
			document.getElementById("onDay").style.visibility = "hidden";
			document.getElementById("addHour").style.visibility = "hidden";
			break;
			
		case "daily":
			document.getElementById("onDay").style.visibility = "hidden";
			document.getElementById("addHour").style.visibility = "visible";
			break;
		
		case "weekly":
			selectDay = document.getElementById("addDay");
			selectDay.innerHTML = "";
			for(var i=0;i<7;i++){
				var opt = document.createElement("option");
				opt.value = weekDays[i];
				opt.innerHTML = weekDays[i];
				selectDay.appendChild(opt);
			}
			document.getElementById("addDay").style.width = "80px";
			document.getElementById("onDay").style.visibility = "visible";
			document.getElementById("addHour").style.visibility = "visible";
			break;
		
		case "monthly":
			selectDay = document.getElementById("addDay");
			selectDay.innerHTML = "";
			for(var i=1;i<32;i++){
				var opt = document.createElement("option");
				opt.value = i
				opt.innerHTML = i;
				selectDay.appendChild(opt);
			}
			document.getElementById("addDay").style.width = "25px";
			document.getElementById("onDay").style.visibility = "visible";
			document.getElementById("addHour").style.visibility = "visible";
			break;
			
		default:
			break;
	}
}

//While the destination Folder Form has not been modified by typing something
//whatever is written in the name will by automatically typed as folder name too
function setNewDestFormBehaviour(){
	document.getElementById("newDest").onkeypress = function() {keyStroked=true;};
	document.getElementById("newName").onkeyup = function() { 
		if(!keyStroked){
			document.getElementById("newDest").value = document.getElementById("newName").value;
		}
	}
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

//adds a website to the system. 
function addURL(){

	//Check for the schedule to download the files
	var schedule = new Schedule(
		document.getElementById("addDownload").checked,
		document.getElementById("addBasis").value,
		document.getElementById("addDay").value,
		document.getElementById("addHour").value,
		document.getElementById("addMin").value);	


	//TODO check if the URL is valid
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
	destFolder = document.getElementById("newDest").value;

	var date = new Date();
	newWebsite = new TrackedWebsite(document.getElementById("newURL").value,extensions, name, destFolder, schedule,date.getTime());
	websites = getAllWebsites();
	newWebsite = JSON.stringify(newWebsite);
	newWebsite = JSON.parse(newWebsite);
	websites.push(newWebsite);
	storeWebsites();
	if(websites.length === 1){  // This way cleans the screen before printing the first URL
		printURLs();
	} else {
		printOneURL(newWebsite,websites.length-1);
	}
	setAlarms(newWebsite);
	returnToMain();
}

