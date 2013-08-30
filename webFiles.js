function webFilesListener(website){
	document.getElementById("closeWebFiles").onclick = function (){ returnToMain();};
	document.getElementById("webFilesName").innerHTML = website.name;
	displayDownloadedFiles(website);
	displayFilesToDownload(website);
	displayOmittedFiles(website);
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webFiles").style.visibility = "visible";
}

function displayFilesToDownload(website){
	newFilesDiv = document.getElementById("newFiles");
	newFilesDiv.innerHTML = "<h3 class='h3'>New files to download</h3>";
	for(var i=0;i<website.linksToDownload.length;i++){
		var row = document.createElement("tr");
		var column0 = document.createElement("th");
		column0.style.width = "400px";
		row.align = "left";
		newFile = website.linksToDownload[i].split("/");
		column0.appendChild(document.createTextNode(newFile[newFile.length-1]));
		row.appendChild(column0);
		newFilesDiv.appendChild(row);
	}
}

function displayOmittedFiles(website){
	omittedFilesDiv = document.getElementById("omittedFiles");
	omittedFilesDiv.innerHTML = "<h3 class='h3'>Omitted Files</h3>";
	for(var i=0;i<website.filesOmitted.length;i++){
		var row = document.createElement("tr");
		var column0 = document.createElement("th");
		column0.style.width = "400px";
		row.align = "left";
		column0.appendChild(document.createTextNode(website.filesOmitted[i]));
		row.appendChild(column0);
		omittedFilesDiv.appendChild(row);
	}
}

function displayDownloadedFiles(website){
	downFilesDiv = document.getElementById("downloadedFiles");
	downFilesDiv.innerHTML = "<h3 class='h3'>Downloaded Files</h3>";
	for(var i=0;i<website.filesDownloaded.length;i++){
		var row = document.createElement("tr");	
		var column0 = document.createElement("th");
		column0.style.width = "400px";
		row.align = "left";
		var column1 = document.createElement("th");
		console.log(website.filesDownloaded[i][0]);
		date = new Date(website.filesDownloaded[i][1]);
		date = date.getHours() + ":" + date.getMinutes() + "   " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
		column0.appendChild(document.createTextNode(website.filesDownloaded[i][0]));
		column1.appendChild(document.createTextNode(date));
		row.appendChild(column0);
		row.appendChild(column1);
		downFilesDiv.appendChild(row);
	}
}