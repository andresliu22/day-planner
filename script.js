$(document).ready(function () {
    getTime()
    setColorCoded()
    setSchedule()

    // Update time every second
    setInterval(getTime, 1000);

    // Update colors every 5 minutes
    setInterval(setColorCoded, 300000);
});

// Get the current time of the day
function getTime() {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

// Set tasks with colors if they past, present or future
function setColorCoded() {
    var currentTime = moment().format('H');
    $('.task-th').each( function(i, obj) {
        if (i < currentTime - 9) {
            $(obj).addClass("past");
            $(obj).children().addClass("past");
        } else if (i == currentTime - 9){
            $(obj).addClass("present");
            $(obj).children().addClass("present");
        } else {
            $(obj).addClass("future");
            $(obj).children().addClass("future");
        }
    })
}

// Set schedule tasks saved in local storage
function setSchedule() {
    if (JSON.parse(localStorage.getItem("schedule")) != null) {
        var dayScheduler = JSON.parse(localStorage.getItem("schedule")); 
        $('.input-schedule').each(function(i, obj) {
            if (dayScheduler[i] != null) {
                $(obj).val(dayScheduler[i]);
            }
        });
    }
}

// Save task to local storage
function saveTask(event) {
    var index = $(this).closest('.container').find('.saveBtn').index(this);
    console.log($(this).index(this));
    var btnClicked = $(event.target);
    var inputValue = btnClicked.closest('tr').children().eq(1).children().val();

    if (JSON.parse(localStorage.getItem("schedule")) != null) {
        var dayScheduler = JSON.parse(localStorage.getItem("schedule"));  
    } else {
        var dayScheduler = [];
    }
    
    if (inputValue.replace(/ /g, "") != "") {
        dayScheduler[parseInt(index)] = inputValue;
        localStorage.setItem("schedule", JSON.stringify(dayScheduler));
    } else {
        alert("Please write task before save");
    }
}

$(".saveBtn").on("click", saveTask);