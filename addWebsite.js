function addPopupListener(){
	document.getElementById("addURL").onclick =  addURL;
	document.getElementById("closeAdd").onclick = closeAdd;
}

function displayAddPopup(){
	document.getElementById("main").style.visibility = "hidden";
	document.getElementById("addPopup").style.visibility = "visible";
}

function closeAdd(){
	document.getElementById("main").style.visibility = "visible";
	document.getElementById("addPopup").style.visibility = "hidden";
}

function addURL(){

	closeAdd();
}
	