var websites = new Array();


function storeWebsites(){
	localStorage.removeItem("websites");
	localStorage.websites=JSON.stringify(websites);
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

}