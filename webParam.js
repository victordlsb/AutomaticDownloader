function webParamListener(website,index){
	displayWebParameters(website);
	document.getElementById("deleteWeb").onclick = function () {deleteWebsite(index);};
	document.getElementById("closeWebParam").onclick = closeWebParam;
}

function displayWebParameters(website){
	document.getElementById("paramURL").innerHTML = "";
	document.getElementById("paramURL").appendChild(document.createTextNode(website.get_URL));
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("webParam").style.visibility = "visible";
}


function closeWebParam(){
	document.getElementById("main").style.visibility = "visible";
	document.getElementById("webParam").style.visibility = "hidden";	
}

function deleteWebsite(index){
	var r=confirm("Are you sure you want to delete this website?");
	if(r === true){
		websites.splice(index, 1);
		localStorage.removeItem('websites');
		storeWebsites();
		printURLs();
		closeWebParam();
	}	
}