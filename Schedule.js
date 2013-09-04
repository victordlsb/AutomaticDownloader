function Schedule(download,typeSched,atDay,atHour,atMin){
	//download: Boolean. If true, the files will download. If false, it only checks for new files to download
	this.download = download;
	//typeSched: receives a string which indicates whether the schedule is hourly, daily, weekly or monthly
	this.typeSched = typeSched;
	//atDay: which day will it check. If weekly, it will be an enum between Monday to Sunday. If monthly, it will be an int from 1 to 31
	this.atDay = atDay;
	//atHour: int with the hour from 00 to 23;
	this.atHour = atHour;
	//atMin: int with the minute. Only 00, 15, 30 and 45 will be allowed
	this.atMin = atMin;
	//lastCheck: date object indicating last moment it was checked.
	this.lastCheck = new Date();
}