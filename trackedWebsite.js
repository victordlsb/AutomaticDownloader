// trackedWebsite: does not use the new to create the object trackedWebsite. 
//Creates an object with private parameters only accessible by the getter 

var trackedWebsite = function(url){
	return {
		get get_URL() {
			return url;
		}
		//TODO get get_Extensions (array with the extensions for this) and set_Extensions
	}
	
}
