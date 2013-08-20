//Creates a TrackedWebsite object

var TrackedWebsite = function(url,extensions,name,destinationFolder,schedule){

	//extensions should be a string with all the extensions separated by ',' 
	this.extensions = extensions;
	//url: A string containing the URL to track
	this.url = url;
	//name: The name of the website to identify it (can be the same as the URL)
	this.name = name;
	//The destination folder relative to the downloads folder of Google chrome
	this.destinationFolder = destinationFolder;
	//filesDownloaded: a 2D array of strings
	//The [][0] elements indicate the name of the files downloaded
	//The [][1] elements indicate the date when it was downloaded (a Date() object parsed to String)
	this.filesDownloaded = [];
	//filesOmitted: An array of strings indicating the files to omit
	this.filesOmitted = [];
	//linksToDownload: An array of URLs with files to be downloaded which aren't downloaded yet
	this.linksToDownload = [];
	//schedule: a Schedule object which contains the information of when to download or check the files to download
	this.schedule = schedule;
}
