//This function reads the links from a given TrackedWebsite

function retrieveFilesURLs(website){
	
	//Get the HTML of the website
	var xhr = new XMLHttpRequest();
	xhr.open("GET",website.get_URL, false);
	xhr.send();
	var xhr;
	if(xhr.responseXML !== null){
		doc = xhr.responseXML;
	} else {
		var parser = new DOMParser();
		doc = parser.parseFromString(xhr.response, "text/xml");
	};
	console.log(doc);
	// Get all the links in the website and put them in an array (from Download extension from Chrome Extensions Samples)
	var links = [].slice.apply(doc.getElementsByTagName("a"));
	console.log(links);
	links = links.map(function(element){
		var href = element.href;
		var hashIndex = href.indexOf('#');
		if (hashIndex >= 0) {
			href = href.substr(0, hashIndex);
		}		
		return href;
	});	
	
	//Look for the extensions desired 
	// TODO in the final version this line won't be needed. 
	website.get_Extensions = [".pdf"];
	var files = new Array();
	var k;
	for (k = 0; k<website.get_Extensions.length;k++){
		var j = 0;
		for(var i=0;i<links.length;i++){
		//Implement the .pdf as an array of the file extension that can be read.
			if(links[i].search(website.get_Extensions[k])===links[i].length-4){
				files[j]=links[i];
				j++;
			}
		}
	}
	
	// Remove duplicates and invalid URLs. // From Download extension from Chrome Extensions Samples
	var kBadPrefix = 'javascript';
	for (var i = 0; i < files.length;) {
	  if (((i > 0) && (files[i] == files[i - 1])) ||
		  (files[i] == '') ||
		  (kBadPrefix == files[i].toLowerCase().substr(0, kBadPrefix.length))) {
		files.splice(i, 1);
	  } else {
		++i;
	  }
	}

	return files;
}
