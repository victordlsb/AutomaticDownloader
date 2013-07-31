

//To put in trackedWebsite.js {

// }


//printURLs receives an array of TrackedWebsites and print the urls on the main popup
//It prints also the button to download the files from that website
function printURLs(websites){
	websites.forEach(PrintOneURL);
}
	
//print just the given URL (so it's not necessary to load all the websites everytime)
function PrintOneURL(website,index){
	var elem = document.getElementById("websitesList");
	var node = document.createElement("li");
	var url = document.createTextNode(website.get_URL);
	var downloadButton = document.createElement('input');
	downloadButton.setAttribute('type','button');
	downloadButton.setAttribute('name','down'+index);
	downloadButton.setAttribute('value','DL');
	downloadButton.onclick = function() {clickDownloadFiles(website.get_URL);};
	node.appendChild(url);
	node.appendChild(downloadButton);
	elem.appendChild(node);
}

function clickDownloadFiles(URL){
	var filesURLs = retrieveFilesURLs(URL);
	downloadFiles(filesURLs);
}



//For test purposes
function removeAndReloadWebsites(){
	localStorage.removeItem(websites);
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/msccs/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/mscinfo/'));
	localStorage.websites=JSON.stringify(websites);
}

function getAllWebsites(){
	return JSON.parse(localStorage.websites);
}
	

function main(){
	var websites = new Array();
	websites=getAllWebsites();
	printURLs(websites);
}


function downloadAllFiles(){
	websites = getAllWebsites();
	for(var i=0;i<websites.length;i++){
		console.log(websites[i].get_URL);
		clickDownloadFiles(websites[i].get_URL);
	}
}





document.addEventListener('DOMContentLoaded', function () {
	main();
	document.getElementById('dlAll').onclick = downloadAllFiles;
	
});





































