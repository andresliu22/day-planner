$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

    if (JSON.parse(localStorage.getItem("schedule")) != null) {
        var dayScheduler = JSON.parse(localStorage.getItem("schedule")); 
        $('.input-schedule').each(function(i, obj) {
            if (dayScheduler[i] != null) {
                $(obj).val(dayScheduler[i]);
            }
        });
    }

    let currentTime = moment().format('H');

    $('.task-th').each( function(i, obj) {
        if (i > currentTime - 9) {
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

});

$(".saveBtn").on("click", function(event) {
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
    
})