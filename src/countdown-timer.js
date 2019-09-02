// deadline is set in minutes
let deadline = 90;
let deadLineMillisec = Date.parse(new Date()) + deadline * 1000 * 60


function getTimeRemaining(endtime) {
    let t = deadLineMillisec - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)));

    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}



function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let timeinterval = setInterval(function () {
        let t = getTimeRemaining(endtime);
        clock.innerHTML =
            ('0' + t.hours).slice(-2) + ' : ' +
            ('0' + t.minutes).slice(-2) + ' : ' +
            ('0' + t.seconds).slice(-2);
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }, 1000);
}

initializeClock('countdownTimer__clock', deadline);