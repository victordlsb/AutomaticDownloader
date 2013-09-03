backgroundInit();

function backgroundInit(){
	websites = getAllWebsites();
	websites.forEach(setAlarms);	
	chrome.alarms.getAll(function (alarms){ console.log(alarms);});
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
	schedule.lastCheck = new Date(schedule.lastCheck);
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
				if(schedule.lastCheck.setHours(schedule.lastCheck.getHours() +1) < new Date())
					downloadOrStore(website);
			}
			
			var nextCheck = new Date();
			if (nextCheck.getMinutes() < schedule.atMin && schedule.atMin !== 0){
				nextCheck.setMinutes(schedule.atMin);
			} else {
				nextCheck.setHours(nextCheck.getHours()+1,schedule.atMin);
			}
			chrome.alarms.create(JSON.stringify(website),{when:nextCheck.getTime(),periodInMinutes:60});
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
			chrome.alarms.create(JSON.stringify(website),{when:nextCheck.getTime(),periodInMinutes:1440});
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
			chrome.alarms.create(JSON.stringify(website),{when:nextCheck.getTime(),periodInMinutes:10080});
			break;
		
		case "monthly":
			
			var nextCheck = new Date();
			if(check){
				if(schedule.lastCheck.getYear() < nextCheck.getYear() && ((nextCheck.getMonth !== 0) || schedule.lastCheck !== 11))	{
					downloadOrStore(website);
				} else if (schedule.lastCheck.getMonth()+1 < nextCheck.getMonth()){
					downloadOrStore(website);
				} else if (schedule.lastCheck.setMonth(schedule.lastCheck.getMonth()+1)  < nextCheck){
					downloadOrStore(website);
				}
			}
			
			if(nextCheck.getDate() > schedule.atDay){
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
						
			//For this no repeating alarm is created as it is assumed that the browser will be closed at some point in one month
			chrome.alarms.create(JSON.stringify(website),{when:nextCheck.getTime()});
			
	}			
}