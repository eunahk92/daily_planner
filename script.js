let m = moment();

var todaysDate = m.format('dddd, MMMM Do YYYY');
var currentHour = m.format('HH');

$(document).ready(function() {
    var localStoredDate = localStorage.getItem('todaysDate');

    if (localStoredDate == todaysDate) {
        for (let l = 0; l < localStorage.length; l++) {
            let key = localStorage.key(l);
            let value = localStorage.getItem(key);
            var textAreaId = '#taskInputBox' + key;
            $(textAreaId).val(value);
        }
    } else {
        localStorage.clear();
        var dateStored = localStorage.setItem('todaysDate', todaysDate);
    }
});

// Set current date on header
$('#currentDay').text(todaysDate);

createTodaysAgenda = () => {
    for (var i = 09; i <= 19; i++) {
        // Military time to compare to current time
        var militaryTime = (moment().hour(i).minute(0)).format('HH');
        // console.log(militaryTime);
        // Regular time to be displayed
        var regularTime = (m.hour(i).minute(0)).format('h a');
        // console.log(regularTime);

        var newHourRow = `
            <div class='row'>
                <p class='hour col-md-1' id='${militaryTime}'><br>${regularTime}</p>
                <textarea type='text' id='taskInputBox${militaryTime}' class= 'description col-md-9' name='taskInputBox'></textarea>
                <button type='submit' class='saveBtn col-md-1' value='Save'>Save</button>
            </div>
        `
        $('.container').append(newHourRow);

        var textareaId = '#taskInputBox' + militaryTime;
        console.log(textareaId);

        if (militaryTime < currentHour) {
            $(textareaId).addClass('past');
        } else if (militaryTime == currentHour) {
            $(textareaId).addClass('present');
        } else {
            $(textareaId).addClass('future');       
        }

        $('.saveBtn').on('click', function (e) {
            e.preventDefault();
        
            var taskValue = $(this).siblings('.description').val();
            var timeValue = $(this).siblings('.hour').attr('id');
            localStorage.setItem(timeValue, taskValue);
            
        });

        

    }

};
createTodaysAgenda();

