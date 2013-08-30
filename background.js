backgroundInit();

function backgroundInit(){
	websites = getAllWebsites();
	websites.forEach(setAlarms);
	
}

function setAlarms(website,index){
	var schedule = website.schedule;
	var type = schedule.typeSched;
	//This will make a check if it has never done one on that website or 
	if(schedule.lastCheck === "" || schedule.nextCheck < new Date()){
		if(schedule.download){
			retrieveFileURLs(website,downloadFiles);
		} else {
			retrieveFileURLs(website,storeDowloadableFiles);
		}
	}
		
	switch (type){
		
		case "hourly":
			
}