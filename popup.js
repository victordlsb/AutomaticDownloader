var websites = new Array();

//printURLs receives an array of TrackedWebsites and print the urls on the main popup
//It prints also the button to download the files from that website
function printURLs(){
	websites=getAllWebsites();
	document.getElementById("websitesList").innerHTML = "";
	if(websites.length !== 0){		
		websites.forEach(PrintOneURL);
	} else {
		var elem = document.getElementById("websitesList");
		elem.appendChild(document.createTextNode("Add a website by clicking the 'Add Website' button"));
	}
}
	
//print just the given URL (so it's not necessary to load all the websites everytime)
function PrintOneURL(website,index){
	var elem = document.getElementById("websitesList");
	var row = document.createElement("tr");
	var column1 = document.createElement("th");
	column1.setAttribute('align','left');
	var column2 = document.createElement("th");
	var column3 = document.createElement("th");
	var url = document.createElement("input");
	url.setAttribute("style","border: 0; background: transparent; width: 400px; cursor:pointer");
	url.setAttribute("value",website.get_URL);
	url.onclick = function() {webParamListener(website,index);};
	var downloadButton = document.createElement('input');
	downloadButton.setAttribute('type','button');
	downloadButton.setAttribute('name','down'+index);
	downloadButton.setAttribute('value','Download');
	downloadButton.setAttribute("class","button");
	downloadButton.onclick = function() {clickDownloadFiles(website);};
	var listFilesButton = document.createElement('input');
	listFilesButton.setAttribute('type','button');
	listFilesButton.setAttribute('name','list'+index);
	listFilesButton.setAttribute('value','List Files');
	listFilesButton.setAttribute("class","button");
	listFilesButton.onclick = function() {}; //TODO make the function to list the files to be downloaded
	column1.appendChild(url);
	column2.appendChild(listFilesButton);
	column3.appendChild(downloadButton);
	row.appendChild(column1);
	row.appendChild(column2);
	row.appendChild(column3);
	elem.appendChild(row);
}

function clickDownloadFiles(website){
	var filesURLs = retrieveFilesURLs(website);
	console.log(filesURLs);
	downloadFiles(filesURLs);
}



//For test purposes
function removeAndReloadWebsites(){
	localStorage.removeItem('websites');
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/msccs/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/mscinfo/'));
	localStorage.websites=JSON.stringify(websites);
}

function storeWebsites(){
	localStorage.websites=JSON.stringify(websites);
}


function getAllWebsites(){
	if (localStorage.websites === undefined){
		return new Array();
	}
	return JSON.parse(localStorage.websites);
}
	

function main(){
//	removeAndReloadWebsites();
//	localStorage.removeItem('websites');
	console.log(localStorage.websites);
	printURLs();	
}

//This function download all the files from all the websites being tracked
function downloadAllFiles(){
	websites = getAllWebsites();
	for(var i=0;i<websites.length;i++){
		clickDownloadFiles(websites[i]);
	}
}

function mainPopupListener(){
	document.getElementById('dlAll').onclick = downloadAllFiles;
	document.getElementById("addWeb").onclick = displayAddPopup;
}

document.addEventListener('DOMContentLoaded', function () {
	main();
	mainPopupListener();
	addPopupListener();
});































