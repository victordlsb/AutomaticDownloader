

//To put in trackedWebsite.js {

// }


//printURLs receives an array of TrackedWebsites and print the urls on the main popup
//It prints also the button to download the files from that website
function printURLs(websites){
	websites.forEach(PrintOneURL);
}
	

function PrintOneURL(website,index){
    console.log(website);
	var elem = document.getElementById("websitesList");
	var node = document.createElement("li");
	var url = document.createTextNode(website.get_URL);
	var downloadButton = document.createElement('input');
	downloadButton.setAttribute('type','button');
	downloadButton.setAttribute('name','down'+index);
	downloadButton.setAttribute('value','DL');
	downloadButton.onclick = function() {clickDownloadFiles(url);};
	console.log(url);
	node.appendChild(url);
	node.appendChild(downloadButton);
	elem.appendChild(node);
}

function clickDownloadFiles(website){
	console.log(website);
	var filesURLs = retrieveFilesURLs('http://www.dcs.bbk.ac.uk/courses/mscinfo/');
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


function main(){
	var websites = new Array();
	websites=JSON.parse(localStorage.websites);
	printURLs(websites);
}




document.addEventListener('DOMContentLoaded', function () {
	main();
});









































