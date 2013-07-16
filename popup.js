
function retrieveFilesURLS(url){
	
	var doc = document.implementation.createDocument(url, 'html', null);
	var links = doc.links;
	document.write(links.length);
	var arr;
	for(var i=0;i<links.length;i++){
	// Now only detecting pdfs. Using MIME-types to do so
	// TODO: selecting different MIME-TYPES http://www.freeformatter.com/mime-types-list.html
		if(links[i].type="application/pdf"){
			arr.push(links[i]);
			
		}
	}
	return arr;
	
}

function printURLs(){
	//document.write("hello world");
	var arr = retrieveFilesURLS('http://blogs.adobe.com/pdfdevjunkie/web_designers_guide');
	//document.write(arr);
}


document.addEventListener('DOMContentLoaded', function () {printURLs();});

