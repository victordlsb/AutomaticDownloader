backgroundInit();

function backgroundInit(){
	chrome.alarms.clearAll();
	websites = getAllWebsites();
	websites.forEach(setAlarms);	
}

chrome.alarms.onAlarm.addListener(function(alarm) {
	var website = "";
	var index;
	for(var i=0;i<websites.length;i++){
		if(websites[i].id.toString() === alarm.name){
			website = websites[i];
			index = i;
			break;
		}
	}
	console.log(websites);
	console.log(website);
	
	if(website !== ""){
		downloadOrStore(website);		
	} 
	
	chrome.alarms.clear(alarm.name);
	setAlarms(website);
	

});


//This downloads or Store the links depending on the website parameters
function downloadOrStore(website){
	if(website.schedule.download){
		retrieveFilesURLs(website,downloadFiles);
	} else {
		retrieveFilesURLs(website,storeDownloadableFiles);
	}
	chrome.runtime.sendMessage({type: "printURLs"});
}


function setAlarms(website){
	if(website !== ""){
		var schedule = website.schedule;
		schedule.lastCheck = new Date(schedule.lastCheck);
		schedule.lastCheck.setMinutes(schedule.lastCheck.getMinutes() - 2);
		var type = schedule.typeSched;
		//This will make a check if it has never done one on that website 

			
		switch (type){
			
			case "hourly":
				

				if(schedule.lastCheck.setHours(schedule.lastCheck.getHours() +1) < new Date()){
					downloadOrStore(website);
				}
				
				
				var nextCheck = new Date();
				if (nextCheck.getMinutes() < schedule.atMin && schedule.atMin !== 0){
					nextCheck.setMinutes(schedule.atMin);
				} else {
					nextCheck.setHours(nextCheck.getHours()+1,schedule.atMin);
				}
				nextCheck.setSeconds(0);
				chrome.alarms.create(website.id.toString(),{when:nextCheck.getTime()});
				break;
			
			case "daily":
				
				if(schedule.lastCheck.setDate(schedule.lastCheck.getDate() +1) < new Date()){
					downloadOrStore(website);
				}
				
				var nextCheck = new Date();
				if(nextCheck.getHours() > schedule.atHour){
					nextCheck.setDate(nextCheck.getDate() + 1);
				} 
				nextCheck.setHours(schedule.atHour);
				nextCheck.setMinutes(schedule.atMin);
				nextCheck.setSeconds(0);
				chrome.alarms.create(website.id.toString(),{when:nextCheck.getTime()});
				break;
			
			case "weekly":
			
				if(schedule.lastCheck.setDate(schedule.lastCheck.getDate() + 7) < new Date())
					downloadOrStore(website);
				
				
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
				nextCheck.setSeconds(0);
				chrome.alarms.create(website.id.toString(),{when:nextCheck.getTime()});
				break;
			
			case "monthly":
				
				var nextCheck = new Date();
				if(schedule.lastCheck.getYear() < nextCheck.getYear() && ((nextCheck.getMonth !== 0) || schedule.lastCheck !== 11))	{
					downloadOrStore(website);
				} else if (schedule.lastCheck.getMonth()+1 < nextCheck.getMonth()){
					downloadOrStore(website);
				} else if (schedule.lastCheck.setMonth(schedule.lastCheck.getMonth()+1)  < nextCheck){
					downloadOrStore(website);
				}
				
		
				if(nextCheck.getDate() > parseInt(schedule.atDay)){
					console.log(1);
					nextCheck.setMonth(nextCheck.getMonth()+1);
				} else if (nextCheck.getDate() == schedule.atDay && nextCheck.getHours() > schedule.atHour){
					console.log(2);
					nextCheck.setMonth(nextCheck.getMonth()+1);
				} else if (nextCheck.getDate() == schedule.atDay && nextCheck.getHours() == schedule.atHour && schedule.getMinutes() > schedule.atMin){
					console.log(3);
					nextCheck.setMonth(nextCheck.getMonth()+1);
				}
				if(schedule.atDay == 29 || schedule.atDay ==30 || schedule.atDay == 31){
					if(nextCheck.getMonth() === 1 || nextCheck.getMonth() ===3 || nextCheck.getMonth() === 5 || nextCheck.getMonth() === 8 || nextCheck.getMonth() ===10){
						nextCheck.setDate(1);
						nextCheck.setMonth(nextCheck.getMonth() + 1);
					}
				} else {
					nextCheck.setDate(schedule.atDay);
				}
				nextCheck.setHours(schedule.atHour);
				nextCheck.setMinutes(schedule.atMin);
				nextCheck.setSeconds(0);
				chrome.alarms.create(website.id.toString(),{when:nextCheck.getTime()});				
		}			
	}
}