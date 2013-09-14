function testWebsite(){
	date = new Date();
	schedule = new Schedule(true,"never","1","1","0");
	return new TrackedWebsite("http://www.dcs.bbk.ac.uk/courses/msccs",".pdf","Test website",".\\test\\MScCSBook.txt",schedule,date.getTime());
}

function test100WebArray(){
	var webs = [];
	schedule = new Schedule(true,"never","1","1","0");
	date = new Date();
	for(var i=0;i<100;i++){
		 webs.push(new TrackedWebsite("http://www.dcs.bbk.ac.uk/courses/msccs",".pdf","Test website " + i,".\\test"+ i + "\\MScCSBook.txt",schedule,date.getTime()+i));
	}
	return webs;
}

function test500WebArray(){
	var webs = [];
	schedule = new Schedule(true,"never","1","1","0");
	date = new Date();
	for(var i=0;i<500;i++){
		 webs.push(new TrackedWebsite("http://www.dcs.bbk.ac.uk/courses/msccs",".pdf","Test website " + i,".\\test"+ i + "\\MScCSBook.txt",schedule,date.getTime()+i));
	}
	return webs;
}

function test100Downloads(website){
	files = [];
	for(var i=0;i<100;i++){
		chrome.downloads.download({filename: website.destinationFolder, url: "http://www.dcs.bbk.ac.uk/courses/msccs/MScCSBook.pdf", saveAs: false});
	}
	//Results: Google Chrome crashes after 50 downloads
	//
}

function test50Downloads(website){
	files = [];
	for(var i=0;i<50;i++){
		chrome.downloads.download({filename: website.destinationFolder, url: "http://www.dcs.bbk.ac.uk/courses/msccs/MScCSBook.pdf", saveAs: false});
	}
	//Results: Google Chrome Crashes
	//Up to 15 with security alarm
}

function websitesPrint(webs){
	websites = webs;
	localStorage.removeItem("websites");
	localStorage.websites=JSON.stringify(websites);
	printURLs();
}
