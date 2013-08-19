function webFilesListener(website){
	document.getElementById("closeWebFiles").onclick = function (){ returnToMain();};
	document.getElementById("webFilesName").innerHTML = website.name;
	displayDownloadedFiles(website);
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webFiles").style.visibility = "visible";
}

function displayDownloadedFiles(website){
	downFilesDiv = document.getElementById("downloadedFiles");
	downFilesDiv.innerHTML = "<h3 class='h3'>Files downloaded</h3>";
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