backgroundInit();

function backgroundInit(){
	websites = getAllWebsites();
	websites.forEach(setAlarms);	
}

chrome.alarms.onAlarm.addListener(function(alarm) {
	websites = getAllWebsites();
	var website = "";
	var index;
	for(var i=0;i<websites.length;i++){
		if(JSON.stringify(websites[i]) === alarm.name){
			website = websites[i];
			index = i;
			break;
		}
	}
	downloadOrStore(website);


});


//This downloads or Store the links depending on the website parameters
function downloadOrStore(website){
	if(website.schedule.download){
		retrieveFilesURLs(website,downloadFiles);
	} else {
		retrieveFilesURLs(website,storeDownloadableFiles);
	}
}


function setAlarms(website){
	var schedule = website.schedule;
	var type = schedule.typeSched;
	var check = true;
	//This will make a check if it has never done one on that website 
	if(schedule.lastCheck === ""){
		downloadOrStore(website);
		check = false;
	}
		
	switch (type){
		
		case "hourly":
			
			if(check){
				if(schedule.lastCheck.setHour(schedule.lastCheck.getHour() +1) < new Date())
					downloadOrStore(website);
			}
			
			var nextCheck = new Date();
			if (nextCheck.getMinutes() < schedule.atMin && schedule.atMin !== 0){
				nextCheck.setMinutes(schedule.atMin);
			} else {
				nextCheck.setHours(nextCheck.getHours()+1,schedule.atMin);
			}
			chrome.alarms.create(JSON.stringify(website),{when:nextCheck,periodInMinutes:60});
			break;
		
		case "daily":
			if(check){
				if(schedule.lastCheck.setDate(schedule.lastCheck.getDate() +1) < new Date())
					downloadOrStore(website);
			}
			
			var nextCheck = new Date();
			if(nextCheck.getHours() > schedule.atHour){
				nextCheck.setDate(nextCheck.getDate() + 1);
			} 
			nextCheck.setHours(schedule.atHour);
			nextCheck.setMinutes(schedule.atMin);
			chrome.alarms.create(JSON.stringify(website),{when:nextCheck,periodInMinutes:1440});
			break;
		
		case "weekly":
		
			if(check){
				if(schedule.lastCheck.setDate(schedule.lastCheck.getDate() + 7) < new Date())
					downloadOrStore(website);
			}
			
			var nextCheck = new Date();
			var day;
			for(var i=0;i<weekDays.length;i++){
				if (weekDays[i] === schedule.atDay){
					day = i;
					break;
				}
			}
			
			if(nextCheck.getDay() > day){
				aux = 7 - (nextCheck.getDay() - day);
				nextCheck.setDate(nextCheck.getDate()+aux);
			} else if (nextCheck.getDay() < day){
				nextCheck.setDate(day - nextCheck.getDate());
			} else{
				if(nextCheck.getHours() > schedule.atHour){
					nextCheck.setDate(nextCheck.getDate() + 7);
				} 
			}
			nextCheck.setHours(schedule.atHour);
			nextCheck.setMinutes(schedule.atMin);
			chrome.alarms.create(JSON.stringify(website),{when:nextCheck,periodInMinutes:10080});
			break;
		
	}
			
			
			
}