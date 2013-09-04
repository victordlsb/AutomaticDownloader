var websites = new Array();
var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

Object.freeze (weekDays);

function storeWebsites(){
	localStorage.removeItem("websites");
	localStorage.websites=JSON.stringify(websites);
	chrome.alarms.clearAll();
	websites.forEach(setAlarms);	

}


function getAllWebsites(){
	if (localStorage.websites === undefined){
		return new Array();
	}
	return JSON.parse(localStorage.websites);
}
	
//For test purposes
function removeAndReloadWebsites(){
	localStorage.removeItem('websites');
	websites.push(TrackedWebsite('http://www.dcs.bbk.ac.uk/courses/'),[".pdf"]);
	websites.push(TrackedWebsite('http://www.dcs.bbk.ac.uk/courses/msccs/'),[".pdf"]);
	websites.push(TrackedWebsite('http://www.cran.r-project.org/doc/manuals/'),[".pdf"]);
	localStorage.websites=JSON.stringify(websites);
}

function returnToMain(){
	document.getElementById("main").style.visibility = "visible";
	document.getElementById("webParam").style.visibility = "hidden";
	document.getElementById("addPopup").style.visibility = "hidden";
	document.getElementById("webFiles").style.visibility="hidden";
	document.getElementById("addHour").style.visibility = "hidden";
	document.getElementById("onDay").style.visibility = "hidden";
	document.getElementById("paramHour").style.visibility = "hidden";
	document.getElementById("paramOnDay").style.visibility = "hidden";
}

function printAlarmsLog(){
	chrome.alarms.getAll(function (alarms){ 
	for(var i=0;i<alarms.length;i++){
		for(var j=0;j<websites.length;j++){
			if(websites[j].id.toString() === alarms[i].name){
				console.log(websites[j].name);
				break;
			}
		}
		console.log(new Date(alarms[i].scheduledTime));
	};
	});
}


function downloadFiles(files,website){
	//TODO check if end of the url correspond to the filename. If not, not download
	destFolder = website.destinationFolder;
	var index = websites.indexOf(website);
	var date = new Date();
	date.toString();
	for(var i=0;i<files.length;i++){
		//Looks for the name of the file by splitting the string of the URL and checking the last member of the array
		arrayFiles = files[i].split("/");
		destPath = ".\\" + destFolder +  "\\" + arrayFiles[arrayFiles.length-1];
		chrome.downloads.download({filename: destPath, conflictAction:"overwrite", url: files[i], saveAs: false});
		//TODO make sure the files are downloaded before adding them to the filesDownloaded array
		websites[index].filesDownloaded.push([arrayFiles[arrayFiles.length-1],date]);
	}
	//This delete duplicated files
	var indexToDelete = [];
	for(var i=0;i<websites[index].filesDownloaded.length-1;i++){
		for(var j=i+1;j<websites[index].filesDownloaded.length;j++){
			if(websites[index].filesDownloaded[i][0] === websites[index].filesDownloaded[j][0]){
				if(websites[index].filesDownloaded[i][1] < websites[index].filesDownloaded[j][1]){
					indexToDelete.push(i);
				} 
			}
		}
	}
	var auxArrayDownloaded = websites[index].filesDownloaded;
	for(var i=0;i<indexToDelete.length;i++){
		delete auxArrayDownloaded[indexToDelete];
	}
	websites[index].filesDownloaded = [];
	auxArrayDownloaded.forEach(function(file){
		if(file){
			websites[index].filesDownloaded.push(file);
		}
	});
	websites[index].linksToDownload = [];
	websites[index].schedule.lastCheck = date;
	storeWebsites();
	
}

function storeDownloadableFiles(files,website){
	var index = websites.indexOf(website);
	var date = new Date();
	date.toString();
	websites[index].linksToDownload = files;
	websites[index].schedule.lastCheck = date;
	storeWebsites();
	printURLs;
}

function checkLastModified(url){
	xhraux = new XMLHttpRequest();
	xhraux.open("GET",url,false);
	xhraux.send();
	var lastMod = xhraux.getResponseHeader ("Last-Modified");
	xhraux.abort();
	lastMode = new Date(lastMod);
	return lastMode;
}

//TODO add a format checking
//Transforms an string of extensions separated by commas (",") for an array 
//and adds them to the array provided if it does not contain it
function extToArray(extensions,otherExtensions){
	if(otherExtensions !== ""){
		otherExtensions = otherExtensions.split(",");
		otherExtensions.forEach(function (ext){
			// Check if the first character is a dot ("."). If not, adds it.
			if(ext.substring(0,1) !== "."){
				ext = "." + ext;
			};
			//Checks if in the extensions array. If not, adds it
			if (extensions.indexOf(ext) === -1){
				extensions.push(ext);
			}
		});
	}
	return extensions;
}