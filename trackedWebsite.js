// trackedWebsite: does not use the new to create the object trackedWebsite. 
//Creates an object with private parameters only accessible by the getter 

var trackedWebsite = function(url,extensions){
	return {
		//This returns the URL of the website
		get get_URL() {
			return url;
		},

		get get_Extensions(){
			return extensions;
		},
		
		set set_Extensions(ext){
			this.extensions = ext;
		}
		
		//TODO get_Name (name of the website and the one that will appear in the list
		//TODO path to be downloaded 
	}
	
}
