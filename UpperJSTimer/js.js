var CORRECTION_VALUE_X = 50,
    CORRECTION_VALUE_Y = 30,
    INTERVAL_VALUE_DEFAULT = 1000, 
    INTERVAL_VALUE_FOR_SECONDS = 59, 
    INTERVAL_BLINK_DEFAULT = 1,
    INTERVAL_BLINK_FOR_SECONDS = 10,
    intervalBlink = INTERVAL_BLINK_DEFAULT,
    callCounter = 1,  
    intervalValue = INTERVAL_VALUE_DEFAULT,
    currentFormat = "Date",
    arrFormat = ["Date", "Time", "Full Time", "Seconds", "Full Year"],
    clsFormat = {
        "Date" : "date",
        "Time" : "time", 
        "Full Time" : "full-time", 
        "Seconds" : "seconds", 
        "Full Year" : "full-year"
    },
    
    spanClassName = "white",
    time = document.querySelector('time'),
    ul = document.querySelector('ul');
 
function getNextFormat(){
		var currentIndex = arrFormat.indexOf(currentFormat);   
		return arrFormat[(currentIndex + 1 === arrFormat.length) ? 0 : ++currentIndex];  
}

function setValueOfInterval(){
  intervalValue = (currentFormat === "Seconds") ? INTERVAL_VALUE_FOR_SECONDS : INTERVAL_VALUE_DEFAULT; 
  intervalBlink = (currentFormat === "Seconds") ? INTERVAL_BLINK_FOR_SECONDS : INTERVAL_BLINK_DEFAULT;
}

function addZero (num) {
    return (num < 10) ? '0' + num : num;
}

function getDayOfWeek(numberOfDay){
		switch (numberOfDay) {
    	case 1:
      	return "Пн";
			case 2:
      	return "Вт";
      case 3:
      	return "Ср";
      case 4:
      	return "Чт";
      case 5:
      	return "Пт";
      case 6:
      	return "Сб"; 
      case 0:
      	return "Вс";
      default: 
      	return numberOfDay;
    }
}

function getCurrentPosition(event) { 
    return {
      'left': (event.clientX - CORRECTION_VALUE_X)+"px",
      'top': (event.clientY - CORRECTION_VALUE_Y)+"px"
    }
}

Date.prototype.getMyFormatDateTime = function(format){
		 var myMs = addZero(this.getMilliseconds()),
     		 mySec = addZero(this.getSeconds()),
         myMin = addZero(this.getMinutes()),
         myHour = addZero(this.getHours()),
     		 myDate = addZero(this.getDate()),
     		 myDayOfWeak = getDayOfWeek(this.getDay()),
     		 myMonth = addZero(this.getMonth() + 1),	
     		 myYear = this.getFullYear();
     		 	
     if (callCounter % intervalBlink === 0) {
     		spanClassName = (spanClassName === "white") ? "darkslategrey" : "white";
     }
     var textTagSeparator = "<span class='"+ spanClassName +"'> : </span>";
     
     time.className = clsFormat[format];
		 switch (format) {
    		case "Date":
        		return  myDate + "/ " + myDayOfWeak;
        case "Time":
        		return myHour + textTagSeparator + myMin + textTagSeparator + mySec;
        case "Full Time": 
        		return myYear + "/" + myMonth + "/" + myDate + " " + myDayOfWeak + " " + myHour + textTagSeparator + myMin + textTagSeparator + mySec;
        case "Seconds":
        		return mySec + textTagSeparator +  myMs;  
        case "Full Year":
        		return myYear + "/" + myMonth + "/" + myDate;     
    }

}

//=== Start timer===========================
var timerId = setTimeout(function setTimer() {
  var currentDate = new Date();
  time.innerHTML  = currentDate.getMyFormatDateTime(currentFormat);
  callCounter++;
  setValueOfInterval();
  
  timerId = setTimeout(setTimer, intervalValue);
},intervalValue);

//============================================================
//===========================Events===========================
//============================================================

time.addEventListener('click', function (event){
	currentFormat = getNextFormat();
}, false);

time.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  var objPosition = getCurrentPosition(event);
  
  ul.style.display = 'block';
  
  ul.style.left = objPosition['left'];
  ul.style.top = objPosition['top'];
}, false);

ul.addEventListener('click', function (event){
		if (event.target.tagName === 'LI') {
    		currentFormat = event.target.textContent;
    		ul.style.display = "none";	
    }
 },false);

ul.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  },false);

document.addEventListener('click', function (event){
  ul.style.display = "none";
}, false);

document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  },false);
