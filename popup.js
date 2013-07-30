

//To put in trackedWebsite.js {

// }


//printURLs receives an array of TrackedWebsites and print the urls on the main popup
//It prints also the button to download the files from that website
function printURLs(websites){
	var i;
	var elem = document.getElementById("websitesList");
	console.log(websites);
	websites.forEach(function(website){
		var node = document.createElement("li");
		var url = document.createTextNode(website.get_URL);
		var downloadButton = document.createElement('input');
		downloadButton.setAttribute('type','button');
		downloadButton.setAttribute('name','down'+i);
		downloadButton.setAttribute('value','DL');
		downloadButton.onclick = function(e) {clickDownloadFiles(url);};
		//downloadButton.setAttribute("onclick","clickDownloadFiles(url)");
		console.log(url);
		//downloadButton.addEventListener("onclick",clickDownloadFiles(websites[i].get_Url),false);
		node.appendChild(url);
		node.appendChild(downloadButton);
		elem.appendChild(node);
	});
}
	
	/*
	for (i = 0; i<websites.length; i++){ 	
		var node = document.createElement("li");
		var url = document.createTextNode(websites[i].get_URL);
		var downloadButton = document.createElement('input');
		downloadButton.setAttribute('type','button');
		downloadButton.setAttribute('name','down'+i);
		downloadButton.setAttribute('value','DL');
		downloadButton.onclick = function(e) {clickDownloadFiles(url);};
		//downloadButton.setAttribute("onclick","clickDownloadFiles(url)");
		console.log(url);
		//downloadButton.addEventListener("onclick",clickDownloadFiles(websites[i].get_Url),false);
		node.appendChild(url);
		node.appendChild(downloadButton);
		elem.appendChild(node);
	}*/





function clickDownloadFiles(website){
	console.log(website);
	var filesURLs = retrieveFilesURLs('http://www.dcs.bbk.ac.uk/courses/mscinfo/');
	downloadFiles(filesURLs);
}


//This function loads everything

/*Test websites 
'http://www.dcs.bbk.ac.uk/courses/'
'http://www.dcs.bbk.ac.uk/courses/msccs/'
'http://www.dcs.bbk.ac.uk/courses/mscinfo/'
*/




function main(){
	var websites = new Array();
//	localStorage.removeItem(websites);
//  websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/'));
//	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/msccs/'));
//	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/mscinfo/'));
//	localStorage.websites=JSON.stringify(websites);
	websites=JSON.parse(localStorage.websites);
	printURLs(websites);
	
	
	//console.log(retrieveFilesURLs('http://www.dcs.bbk.ac.uk/courses/msccs/'));
	//console.log(retrieveFilesURLs('http://www.dcs.bbk.ac.uk/courses/'));
	//console.log(retrieveFilesURLs('http://www.dcs.bbk.ac.uk/courses/mscinfo'));
	//setDownloadButtons(websites);
}




document.addEventListener('DOMContentLoaded', function () {
	main();
});









































