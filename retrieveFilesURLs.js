//This function reads the links from a given TrackedWebsite
function retrieveFilesURLs(website, callback){
	//Get the HTML of the website
	var doc;
	var xhr = new XMLHttpRequest();
	xhr.open("GET",website.url);
	xhr.responseType = "document";
	xhr.onload = function (e) {
		if (xhr.readyState === 4){
			if(xhr.status === 200){
				doc = xhr.responseXML;
				// Get all the links in the website and put them in an array (from Download extension from Chrome Extensions Samples)
				var links = [].slice.apply(doc.getElementsByTagName("a"));
				links = links.map(function(element){
					var href = element.href;
					var hashIndex = href.indexOf('#');
					if (hashIndex >= 0) {
						href = href.substr(0, hashIndex);
					}		
					return href;
				});	
			
				//Look for the extensions desired 
				var files = new Array();
				var k;				
				for (k = 0; k<website.extensions.length;k++){
					for(var i=0;i<links.length;i++){
						//Bit of geniality here. Looks if the link contains the substring with the extension
						//and if so, it checks that its placed in the last position of the string by using the length of the extension string
						if(links[i].search(website.extensions[k])===links[i].length-website.extensions[k].length){
							files.push(links[i]);
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
				
				//This calls the function that needs the files
				callback(files,website.destinationFolder);
				
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = function (e){
		console.error(xhr.statusText);
	};
	xhr.send(null);
}