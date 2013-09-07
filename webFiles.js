function webFilesListener(website){
	document.getElementById("closeWebFiles").onclick = function (){ returnToMain();};
	document.getElementById("webFilesName").innerHTML = website.name;
	document.getElementById("checkNewFiles").onclick = function (){ checkNewFiles(website);};
	document.getElementById("downloadNewFiles").onclick = function (){ downloadNewFiles(website);};
	displayDownloadedFiles(website);
	displayFilesToDownload(website);
	displayOmittedFiles(website);
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webFiles").style.visibility = "visible";
}

function downloadNewFiles(website){
	retrieveFilesURLs(website,function(files,website){ 
		var inMain = false;
		if(document.getElementById("main").style.visibility === "visible"){
			inMain = true;
		}
		web = downloadFiles(files,website);
		webFilesListener(web);
		chrome.runtime.sendMessage({type: "printURLs"});
		if(inMain){
			returnToMain();
		}
	});
}


function checkNewFiles(website){
	retrieveFilesURLs(website, function(files,website){
		var inMain = false;
		if(document.getElementById("main").style.visibility === "visible"){
			inMain = true;
		}
		web = storeDownloadableFiles(files,website);
		webFilesListener(web);
		chrome.runtime.sendMessage({type: "printURLs"});
		if(inMain){
			returnToMain();
		}
	});
}

function displayFilesToDownload(website){
	newFilesDiv = document.getElementById("newFiles");
	newFilesDiv.innerHTML = "";
	newFilesDiv.innerHTML = "<h3 class='h3'>New files to download</h3>";
	for(var i=0;i<website.linksToDownload.length;i++){
		var row = document.createElement("tr");
		var column0 = document.createElement("th");
		column0.style.width = "200px";
		row.align = "left";
		newFile = website.linksToDownload[i].split("/");
		column0.appendChild(document.createTextNode(newFile[newFile.length-1]));
		row.appendChild(column0);
		var omitFileButton = document.createElement('input');
		omitFileButton.setAttribute('type','button');
		omitFileButton.setAttribute('name','omit'+i);
		omitFileButton.setAttribute('value','Omit');
		omitFileButton.setAttribute("class","xbutton");
		omitFileButton.style.position = "relative";
		var ind = i;
		omitFileButton.onclick = function() {
			for(var i=0;i<websites.length;i++){
				if(websites[i].id === website.id){
					index = i;
					break;
				}
			}
			if(index<websites.length){
				websites[index].linksToDownload.splice(ind,1);		
				websites[index].filesOmitted.push(newFile[newFile.length-1]);
				storeWebsites();
				displayOmittedFiles(websites[index]);
				displayFilesToDownload(websites[index]);		
			}
		}; 
		var column1 = document.createElement("th");
		column1.appendChild(omitFileButton);
		row.appendChild(column1);		
		newFilesDiv.appendChild(row);
	}
}

function displayOmittedFiles(website){
	omittedFilesDiv = document.getElementById("omittedFiles");
	omittedFilesDiv.innerHTML = "<h3 class='h3'>Omitted Files</h3>";
	for(var i=0;i<website.filesOmitted.length;i++){
		var row = document.createElement("tr");
		var column0 = document.createElement("th");
		column0.style.width = "200px";
		row.align = "left";
		column0.appendChild(document.createTextNode(website.filesOmitted[i]));
		row.appendChild(column0);
		var admitFileButton = document.createElement('input');
		admitFileButton.setAttribute('type','button');
		admitFileButton.setAttribute('name','admit'+i);
		admitFileButton.setAttribute('value','admit');
		admitFileButton.setAttribute("class","xbuttongreen");
		admitFileButton.style.position = "relative";
		var ind = i;
		admitFileButton.onclick = function() {
			for(var i=0;i<websites.length;i++){
				if(websites[i].id === website.id){
					index = i;
					break;
				}
			}
			if(index<websites.length){
				websites[index].filesOmitted.splice(ind,1);
				storeWebsites();
				displayOmittedFiles(websites[index]);
				checkNewFiles(websites[index]);				
			}
		}; 
		
		var column1 = document.createElement("th");
		column1.appendChild(admitFileButton);
		row.appendChild(column1);	
		
		
		omittedFilesDiv.appendChild(row);
	}
}

function displayDownloadedFiles(website){
	downFilesDiv = document.getElementById("downloadedFiles");
	downFilesDiv.innerHTML = "";
	downFilesDiv.innerHTML = "<h3 class='h3'>Downloaded Files</h3>";
	for(var i=0;i<website.filesDownloaded.length;i++){
		var row = document.createElement("tr");	
		var column0 = document.createElement("th");
		column0.style.width = "200px";
		row.align = "left";
		var column1 = document.createElement("th");
		date = new Date(website.filesDownloaded[i][1]);
		if(date.getHours() < 10)
			var hours = "0" + date.getHours();
		else 
			var hours = date.getHours();
		if(date.getMinutes() < 10)
			var minutes = "0" + date.getMinutes();
		else
			var minutes = date.getMinutes();		
		date = hours + ":" + minutes + "   " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
		column0.appendChild(document.createTextNode(website.filesDownloaded[i][0]));
		column1.appendChild(document.createTextNode(date));
		row.appendChild(column0);
		row.appendChild(column1);
		var deleteDownloadedFileButton = document.createElement('input');
		deleteDownloadedFileButton.setAttribute('type','button');
		deleteDownloadedFileButton.setAttribute('name','delete'+i);
		deleteDownloadedFileButton.setAttribute('value','x');
		deleteDownloadedFileButton.setAttribute("class","xbutton");
		deleteDownloadedFileButton.style.position = "relative";
		deleteDownloadedFileButton.style.left = "20px";
		var ind = i;
		deleteDownloadedFileButton.onclick = function() {
			for(var i=0;i<websites.length;i++){
				if(websites[i].id === website.id){
					index = i;
					break;
				}
			}
			if(index<websites.length){
				websites[index].filesDownloaded.splice(ind,1);			
				storeWebsites();
				checkNewFiles(websites[index]);	
				displayDownloadedFiles(websites[index]);
			}
		}; 
		var column2 = document.createElement("th");
		column2.appendChild(deleteDownloadedFileButton);
		row.appendChild(column2);
		downFilesDiv.appendChild(row);
	}
}



















