//Creates a TrackedWebsite object

var TrackedWebsite = function(url,extensions,name,destinationFolder){

	this.extensions = extensions;
	this.url = url;
	this.name = name;
	this.destinationFolder = destinationFolder;
	this.filesDownloaded = [];
	this.filesOmitted = [];

}
