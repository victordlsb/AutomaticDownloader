

//To put in trackedWebsite.js {

// }


//printURLs receives an array of TrackedWebsites and print the urls on the main popup
//It prints also the button to download the files from that website
function printURLs(websites){
	if(websites !== undefined){
		websites.forEach(PrintOneURL);
	} else {
		var elem = document.getElementById("websitesList");
		elem.appendChild(document.createTextNode("Add a website by clicking the 'Add website' button"));
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
	var url = document.createTextNode(website.get_URL);
	var downloadButton = document.createElement('input');
	downloadButton.setAttribute('type','button');
	downloadButton.setAttribute('name','down'+index);
	downloadButton.setAttribute('value','Download');
	downloadButton.onclick = function() {clickDownloadFiles(website.get_URL);};
	var listFilesButton = document.createElement('input');
	listFilesButton.setAttribute('type','button');
	listFilesButton.setAttribute('name','list'+index);
	listFilesButton.setAttribute('value','List Files');
	listFilesButton.onclick = function() {}; //TODO make the function to list the files to be downloaded
	column1.appendChild(url);
	column2.appendChild(listFilesButton);
	column3.appendChild(downloadButton);
	row.appendChild(column1);
	row.appendChild(column2);
	row.appendChild(column3);
	elem.appendChild(row);
}

function clickDownloadFiles(URL){
	var filesURLs = retrieveFilesURLs(URL);
	downloadFiles(filesURLs);
}



//For test purposes
function removeAndReloadWebsites(websites){
	localStorage.removeItem('websites');
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/msccs/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/mscinfo/'));
	localStorage.websites=JSON.stringify(websites);
}

function getAllWebsites(){
	if (localStorage.websites === undefined){
		return undefined;
	}
	return JSON.parse(localStorage.websites);
}
	

function main(){
	//localStorage.removeItem('websites');
	var websites = new Array();
	removeAndReloadWebsites(websites);
	websites=getAllWebsites();
	printURLs(websites);	
}

//This function download all the files from all the websites being tracked
function downloadAllFiles(){
	websites = getAllWebsites();
	for(var i=0;i<websites.length;i++){
		clickDownloadFiles(websites[i].get_URL);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	main();
	document.getElementById('dlAll').onclick = downloadAllFiles;
	
});





































