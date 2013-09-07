backgroundInit();

function backgroundInit(){
	chrome.alarms.clearAll();
	websites = getAllWebsites();
	websites.forEach(setAlarms);	
}


function setAlarms(website){
	if(website !== ""){
		var schedule = website.schedule;
		var scheduleLastCheck = new Date(schedule.lastCheck);
		scheduleLastCheck.setMinutes(scheduleLastCheck.getMinutes()-1);
		var type = schedule.typeSched;


			
		switch (type){
			
			case "hourly":
				

				if(scheduleLastCheck.setHours(scheduleLastCheck.getHours() +1) < new Date()){
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
				
				if(scheduleLastCheck.setDate(scheduleLastCheck.getDate() +1) < new Date()){
					downloadOrStore(website);
				}
				
				var nextCheck = new Date();
				if(nextCheck.getHours() > schedule.atHour){
					nextCheck.setDate(nextCheck.getDate() + 1);
					console.log(nextCheck);
				} else if (nextCheck.getHours() == schedule.atHour && nextCheck.getMinutes() > schedule.atMin){
					nextCheck.setDate(nextCheck.getDate() + 1);
					console.log(nextCheck);
				}
				nextCheck.setHours(schedule.atHour);
				nextCheck.setMinutes(schedule.atMin);
				nextCheck.setSeconds(0);
				chrome.alarms.create(website.id.toString(),{when:nextCheck.getTime()});
				break;
			
			case "weekly":
			
				if(scheduleLastCheck.setDate(scheduleLastCheck.getDate() + 7) < new Date())
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
					} else if (nextCheck.getHours() == schedule.atHour && nextCheck.getMinutes() > schedule.atMin){
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
				if(scheduleLastCheck.getYear() < nextCheck.getYear() && ((nextCheck.getMonth !== 0) || scheduleLastCheck.getMonth() !== 11))	{
					downloadOrStore(website);
				} else if (scheduleLastCheck.getMonth()+1 < nextCheck.getMonth()){
					downloadOrStore(website);
				} else if (scheduleLastCheck.setMonth(scheduleLastCheck.getMonth()+1)  < nextCheck){
					downloadOrStore(website);
				}
				
		
				if(nextCheck.getDate() > parseInt(schedule.atDay)){
					nextCheck.setMonth(nextCheck.getMonth()+1);
				} else if (nextCheck.getDate() == schedule.atDay && nextCheck.getHours() > schedule.atHour){
					nextCheck.setMonth(nextCheck.getMonth()+1);
				} else if (nextCheck.getDate() == schedule.atDay && nextCheck.getHours() == schedule.atHour && nextCheck.getMinutes() > schedule.atMin){
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
	
	if(website !== ""){
		downloadOrStore(website);		
	} 
	
	chrome.alarms.clear(alarm.name);
	setAlarms(website);
	

});


