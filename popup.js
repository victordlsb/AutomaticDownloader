//This function reads the links from a given TrackedWebsite

function retrieveFilesURLs(url){
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();
	var doc;
	if(xhr.responseText !== null){
		var parser = new DOMParser();
		doc = parser.parseFromString(xhr.responseText, "text/xml");
	} else if(xhr.responseXML !== null){
		doc = xhr.responseXML;
	}
	console.log(doc);
	var links = doc.getElementsByTagName("a");
	var files = new Array();
	var j = 0;
	for(var i=0;i<links.length;i++){
	//Implement the .pdf as an array of the file extension that can be read.
		if(links[i].href.search(".pdf")===links[i].href.length-4){
			files[j]=links[i];
			j++;
		}
	}
	return files;
}


//To put in trackedWebsite.js {
// trackedWebsite: does not use the new to create the object trackedWebsite. 
//Creates an object with private parameters only accessible by the getter 

var trackedWebsite = function(url){
	return {
		get get_URL() {
			return url;
		}
	}
}

// }


//printURLs receives an array of TrackedWebsites and print the urls on the main popup
//It prints also the button to download the files from that website
function printURLs(websites){
	var i;
	var elem = document.getElementById("websitesList");
	for (i = 0; i<websites.length; i++){ 	
		var node = document.createElement("li");
		var url = document.createTextNode(websites[i].get_Url);
		var downloadButton = document.createElement('input');
		downloadButton.setAttribute('type','button');
		downloadButton.setAttribute('name','down'+i);
		downloadButton.setAttribute('value','DL');
		//downloadButton.onclick=downloadFiles(retrieveFilesURLs(websites[i].get_URL));
		node.appendChild(url);
		node.appendChild(downloadButton);
		elem.appendChild(node);
	}
}

function downloadFiles(files){
	console.log(files[0]);
	//TODO: be able to indicate where to download it automatically. Not possible until Google updates its APIs
	for(var i=0;i<files.length;i++){
		chrome.downloads.download({url: files[i].href, saveAs: false});
	}
}

//This function loads everything

/*Test websites 
'http://www.dcs.bbk.ac.uk/courses/'
'http://www.dcs.bbk.ac.uk/courses/msccs/'
'http://www.dcs.bbk.ac.uk/courses/mscinfo/'
*/

function main(){
	var websites = new Array();
	//websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/'));
	//websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/msccs/'));
	//websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/mscinfo/'));
	//localStorage.websites=JSON.stringify(websites);
	websites=JSON.parse(localStorage.websites);
	printURLs(websites);
}


document.addEventListener('DOMContentLoaded', function () {
	main();
});









































