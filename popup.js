
//printURLs receives an array of TrackedWebsites and print the urls on the main popup
//It prints also the button to download the files from that website
function printURLs(){
	websites=getAllWebsites();
	document.getElementById("websitesList").innerHTML = "";
	if(websites.length !== 0){		
		websites.forEach(printOneURL);
	} else {
		var elem = document.getElementById("websitesList");
		var divNode = document.createElement("div")
		divNode.setAttribute("style","position: absolute; top: 15px; left: 27px; width: 300px");
		var textNode = document.createTextNode("Add a website by clicking the 'Add Website' button");
		divNode.appendChild(textNode);
		elem.appendChild(divNode);
	}
}
	
//print just the given URL (so it's not necessary to load all the websites everytime)
function printOneURL(website,index){
	var elem = document.getElementById("websitesList");
	var row = document.createElement("tr");
	
	var column0 = document.createElement("th");
	var column1 = document.createElement("th");
	column1.setAttribute('align','left');
	var column2 = document.createElement("th");
	var column3 = document.createElement("th");
	
	var hyperlink = document.createElement("input");
	hyperlink.setAttribute("class","hyperlink");
	hyperlink.setAttribute("value","\u2196");
	hyperlink.onclick = function() {window.open(website.url)};
	
	//Defines the properties of the URL in the list
	var url = document.createElement("input");
	url.setAttribute("class","urlButton");
	url.setAttribute("value",website.name);
	url.onclick = function() {webParamListener(website,index);};
	
	//defines the properties of the download button of each website
	var downloadButton = document.createElement('input');
	downloadButton.setAttribute('type','button');
	downloadButton.setAttribute('name','down'+index);
	downloadButton.setAttribute('value','Download');
	downloadButton.setAttribute("class","button");
	downloadButton.onclick = function() {clickDownloadFiles(website);};
	
	//defines the properties of the list files button of each website
	var listFilesButton = document.createElement('input');
	listFilesButton.setAttribute('type','button');
	listFilesButton.setAttribute('name','list'+index);
	listFilesButton.setAttribute('value','List Files (' + website.linksToDownload.length + " new)");
	listFilesButton.setAttribute("class","button");
	listFilesButton.onclick = function() {webFilesListener(website,index)}; 
	
	column0.appendChild(hyperlink);
	column1.appendChild(url);
	column2.appendChild(listFilesButton);
	column3.appendChild(downloadButton);
	row.appendChild(column0);
	row.appendChild(column1);
	row.appendChild(column2);
	row.appendChild(column3);
	elem.appendChild(row);
}

function clickDownloadFiles(website){
	downloadNewFiles(website);
}

function main(){
//	localStorage.removeItem('websites'); //For Test Purposes
	printURLs();
}

//This function download all the files from all the websites being tracked
function downloadAllFiles(){
	websites = getAllWebsites();
	for(var i=0;i<websites.length;i++){
		clickDownloadFiles(websites[i]);
	}
}

function inspectAllWebsites(){
	websites = getAllWebsites();
	for(var i=0;i<websites.length;i++){
		checkNewFiles(websites[i]);
	}
}

function mainPopupListener(){
	document.getElementById('dlAll').onclick = downloadAllFiles;
	document.getElementById("addWeb").onclick = displayAddPopup;
	document.getElementById("inspect").onclick = inspectAllWebsites;
	document.getElementById("clearAll").onclick = function() {
		var r = confirm("Do you want to clear all the websites? (There is no way back)");
		if(r){
			chrome.alarms.clearAll();
			localStorage.removeItem('websites');
			websites = [];
			printURLs();
		}
	}
	chrome.runtime.onMessage.addListener(function(request){
		if(request.type = "printURLs"){
			printrURLs();
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	main();
	mainPopupListener();
	addPopupListener();
	console.log(websites);
});































