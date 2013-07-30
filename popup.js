//This function reads the links from a given TrackedWebsite

function retrieveFilesURLS(url){
	
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
		get_url: function () {
			return url;
		}
	}
}

// }





//printURLs receives an array of TrackedWebsites and print the urls on the main popup
function printURLs(websites){
	var i;
	var elem = document.getElementById("websitesList");
	for (i = 0; i<websites.length; i++){ 	
		var node = document.createElement("li");
		var url = document.createTextNode(websites[i].get_url());
		node.appendChild(url);
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
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/msccs/'));
	websites.push(trackedWebsite('http://www.dcs.bbk.ac.uk/courses/mscinfo/'));
	printURLs(websites);
}


document.addEventListener('DOMContentLoaded', function () {
	main();
});

