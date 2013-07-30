function downloadFiles(files){
	console.log(files[0]);
	//TODO: be able to indicate where to download it automatically. Not possible until Google updates its APIs
	for(var i=0;i<files.length;i++){
		chrome.downloads.download({url: files[i].href, saveAs: false});
	}
}

