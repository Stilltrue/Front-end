window.onload = function() {
    Date.prototype.addDays = function (number) {
        var value = this.valueOf();
        value += 86400000 * number;
        return new Date(value);
    }

    function getCurrentDate(firstDate, numberOfDay) {
        var currentDate = firstDate.addDays(numberOfDay);
        return currentDate.toLocaleDateString();
    }

    function getFirstDate() {
        tempDate = new Date();
        var dayOfWeek = (tempDate.getDay() === 0) ? 8 : tempDate.getDay();
        dayOfWeek -= 1;
        return tempDate.addDays(-dayOfWeek);
    }

    function Lesson(name, dayOfWeek, time, teacher, room){
        this.name = name;
        this.room = room;
        this.time = time;
        this.teacher = teacher;
        this.dayOfWeek = dayOfWeek;
    }

    function Day(date) {
        this.date  = date;
        this.lessons = [];
    }

    Day.prototype.setArrayOflessons = function(arrayOfLessons, dayOfWeek){
        arrayOfLessons.forEach(function(lesson, i, arr){
            if (lesson.dayOfWeek === dayOfWeek){
                this.lessons.push(lesson);
            }
        }, this);
    };

    Day.prototype.addLesson = function(){
            var article = document.querySelector("#schedule-template-article"),
                plusBlocks = document.querySelectorAll(".plus-lesson");

            for(var i = 0; i < plusBlocks.length; i++){
                plusBlocks[i].addEventListener('click', function(event){

                    var self = event.target;
                    if(self.className != 'plus-lesson') return;
                    var i = plusBlocks.length;
                    while(i--) {
                        if (plusBlocks[i] == self) {
                            var x = i+1;
                            break;
                        }
                    }
                    //var obj = new Lesson("Programming", x, "14:00", "Ilon Mask.", "413");
                    //var temp = article.content;
                    //temp.querySelector(".schedule-lesson-name").textContent = obj.name;
                    //temp.querySelector(".schedule-lesson-time").textContent = obj.time;
                    //temp.querySelector(".schedule-lesson-room").textContent = obj.room;
                    //temp.querySelector(".schedule-lesson-teacher").textContent =  obj.teacher;

                    var temp = article.content;
                    var name1 = temp.querySelector(".schedule-lesson-name").textContent;// = "";//obj.name;
                    var time2 = temp.querySelector(".schedule-lesson-time").textContent;// = "";// obj.time;
                    var room3 = temp.querySelector(".schedule-lesson-room").textContent;// = "";// obj.room;
                    var teacher4 = temp.querySelector(".schedule-lesson-teacher").textContent;// = "";// obj.teacher;

                    name1 = "lesson";
                    time2 = "time";
                    room3 = "room";
                    teacher4 = "teacher";

                    var obj = new Lesson(name1, x, time2, teacher4, room3);

                    event.target.parentNode.appendChild(temp.cloneNode(true));

                    var lessonsArray = readArrayOfLessonsFromLocalStorage();
                    lessonsArray.push(obj);
                    saveArrayOfLessonsToLocalStorage(lessonsArray);
                }, false)
            }
    }

    Day.prototype.removeLesson = function(){
        var removeButtons = document.querySelectorAll(".remove-lesson");
            //var deleteThis = lesson;
            //week.prototype.getArrayOfLessons().remove(deleteThis);
        for(var h = 0; h < removeButtons.length; h++){
            removeButtons[h].addEventListener('click', function(event){
                //event.target.parentNode.parentNode.removeChild(event.target.parentNode);
                var getLessons = readArrayOfLessonsFromLocalStorage();

                var self = event.target;
                if(self.className != 'remove-lesson') return;
                var i = removeButtons.length;
                while(i--) {
                    if (removeButtons[i] == self) {
                        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
                        //if(removeButtons == getLessons[i])
                        getLessons.splice(i, 1);
                        saveArrayOfLessonsToLocalStorage(getLessons);
                        //delete getLessons[getLessons.indexOf(lesson)];
                        break;
                    }
                }
                // я бы удалял нажатый элемент и соответствующий ему элемент из массива уроков
                    //getLessons.splice(getLessons.indexOf(lesson), 1);
                    //getLessons.splice(getLessons.indexOf(lesson), 1);
                //saveArrayOfLessonsToLocalStorage(getLessons);
            }, false)
        }
    }

    function Week() {
        this.dataBegin = new Date();
        this.dataEnd = new Date();
        this.days = [];
    }

    Week.prototype.showWeek = function (){
        var scheduleSections = document.querySelectorAll(".schedule-section"),
            scheduleTemplateHeader = document.querySelector("#schedule-template-header"),
            scheduleTemplateArticle = document.querySelector("#schedule-template-article"),
            currentLesson,
            scheduleSection,
            tmpl,
            tmp2,
            currentDay;

        for (var i = 0; i < scheduleSections.length; i++) {

            scheduleSection = scheduleSections[i],
                tmpl = scheduleTemplateHeader.content,
                currentDay = this.days[i];
                //currentDay.addLesson();
                //currentDay.removeLesson();
            var scheduleTemplatePlus = document.querySelector("#schedule-template-plus");
            tmp2 = scheduleTemplatePlus.content;
            tmp2.querySelector(".plus-lesson").textContent = "+";
            scheduleSection.appendChild(tmp2.cloneNode(true));

            tmpl.querySelector(".schedule-date").textContent = currentDay.date.toLocaleDateString();
            scheduleSection.appendChild(tmpl.cloneNode(true));
            for (var j = 0; j < currentDay.lessons.length; j++) {
                currentLesson = currentDay.lessons[j];

                tmpl = scheduleTemplateArticle.content;
                tmpl.querySelector(".schedule-lesson-name").textContent = currentLesson.name;
                tmpl.querySelector(".schedule-lesson-time").textContent = currentLesson.time;
                tmpl.querySelector(".schedule-lesson-room").textContent = currentLesson.room;
                tmpl.querySelector(".schedule-lesson-teacher").textContent = currentLesson.teacher;
                scheduleSection.appendChild(tmpl.cloneNode(true));
            }
        }
        var addToDay = new Day();
        addToDay.removeLesson();
    }


    Week.prototype.init = function(firstDate, arrayOfLessons) {
        this.dataBegin = firstDate;
        this.dataEnd = firstDate.addDays(4);
        this.createArrayOfDay(arrayOfLessons);

        return this;
    }

    Week.prototype.getArrayOfLessons = function(){
        var resultArray = [];
        for (var i = 0; i < this.days.length; i++) {
            for (var j = 0; j < this.days[i].lessons.length; j++) {
                resultArray.push(this.days[i].lessons[j]);
            }
        }
        return resultArray;
    }

    Week.prototype.createArrayOfDay = function(array){
        var newDay, currentDate;
        for (var i = 1; i <= 5; i++){
            currentDate = (i === 1) ? this.dataBegin : this.dataBegin.addDays(i - 1);
            newDay = new Day(currentDate);
            newDay.setArrayOflessons(array, i);
            this.days.push(newDay);
        }
    }

    function saveArrayOfLessonsToLocalStorage(array){
        var lessonsStr = JSON.stringify(array);
        localStorage.setItem("schedule",lessonsStr);
    }

    function readArrayOfLessonsFromLocalStorage(){
        var lessonsStr = localStorage.getItem("schedule"),
            arrayOfLessons = JSON.parse(lessonsStr);

        //hardcode remove later
        if (!arrayOfLessons){
            arrayOfLessons = [];
            arrayOfLessons.push(new Lesson("Математика", 1, "09:00", "Иванов И.И.", "315"));
            arrayOfLessons.push(new Lesson("Биология", 1, "10:00", "Иванов И.И.", "315"));

            arrayOfLessons.push(new Lesson("Химия", 2, "09:00", "Иванов И.И.", "315"));
            arrayOfLessons.push(new Lesson("Физика", 2, "10:00", "Иванов И.И.", "315"));

            arrayOfLessons.push(new Lesson("Физкультура", 3, "09:00", "Иванов И.И.", "315"));
            arrayOfLessons.push(new Lesson("Физика", 3, "10:00", "Иванов И.И.", "315"));
            arrayOfLessons.push(new Lesson("Литература", 3, "11:00", "Иванов И.И.", "315"));

            arrayOfLessons.push(new Lesson("Химия", 4, "09:00", "Иванов И.И.", "315"));
            arrayOfLessons.push(new Lesson("Физика", 4, "10:00", "Иванов И.И.", "315"));

            arrayOfLessons.push(new Lesson("Математика", 5, "09:00", "Иванов И.И.", "315"));
            arrayOfLessons.push(new Lesson("Биология", 5, "10:00", "Иванов И.И.", "315"));
        }
        //hardcode remove later

        return arrayOfLessons;
    }

    function saveArrayOfLessonsToServer(array){
        var xhr = new XMLHttpRequest(),
            obj;

        xhr.open('POST', 'schedule.json', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        /*xhr.onreadystatechange = function () {
           if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    obj = JSON.parse(xhr.responseText);
                }
            }
        };*/

        xhr.send(JSON.stringify(array));
    }

    function readArrayOfLessonsFromServer(){

    }
    /*  MAIN */
    var btnLogin = document.getElementById("login"),
        btnLoginClose = document.getElementById("btn-login-close"),
        wrapper = document.querySelector(".wrapper"),
        loginContainer = document.querySelector(".login-container"),

        firstDate = getFirstDate(),
        week = new Week(),
        arrayOfLessons;

        arrayOfLessons = readArrayOfLessonsFromLocalStorage();
        week.init(firstDate, arrayOfLessons);
        week.showWeek();

        saveArrayOfLessonsToLocalStorage(week.getArrayOfLessons());

    var addToDay = new Day();
    addToDay.addLesson();

    /*  EVENT */
    btnLogin.addEventListener("click", function (event) {
        loginContainer.classList.add("showmodal");
        wrapper.classList.add("showmodal");
    });
    btnLoginClose.addEventListener("click", function (event) {
        loginContainer.classList.remove("showmodal");
        wrapper.classList.remove("showmodal");
    });
};