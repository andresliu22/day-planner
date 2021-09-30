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

    

    

    
});

$(".saveBtn").on("click", function(event) {
    var index = $(this).closest('.container').find('.saveBtn').index(this);

    var btnClicked = $(event.target);
    var inputValue = btnClicked.closest('tr').children().eq(1).children().val();

    if (JSON.parse(localStorage.getItem("schedule")) != null) {
        var dayScheduler = JSON.parse(localStorage.getItem("schedule"));  
    } else {
        var dayScheduler = [];
    }
    
    dayScheduler[parseInt(index)] = inputValue;
    localStorage.setItem("schedule", JSON.stringify(dayScheduler));

})