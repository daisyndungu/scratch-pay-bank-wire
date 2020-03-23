const datesChannel = postal.channel('Bank Wire')

const subscription = datesChannel.subscribe("businessDates", (data, envelope) => {
    if(data.error){
        return toastNotification(data.error, 'error')
    } else {
        const messageRow = document.querySelector('.no-content')
        messageRow.style.display = 'none'
        const { businessDate, totalDays, holidayDays, weekendDays } = data.results
        const { initialDate, delay } = data.initialQuery
        const tBody = document.querySelector('.business-days-info')
        const tRow = document.createElement('tr')
        const formatedBsDate = luxon.DateTime.fromISO(businessDate).toLocaleString(luxon.DateTime.DATE_FULL)
        const formatedInitialDate = luxon.DateTime.fromISO(initialDate).toLocaleString(luxon.DateTime.DATE_FULL)
        tRow.innerHTML = `
            <td>${formatedInitialDate}</td>
            <td>${formatedBsDate}</td>
            <td>${holidayDays}</td>
            <td>${weekendDays}</td>
            <td>${delay}</td>
            <td>${totalDays}</td>
            `
        return tBody.appendChild(tRow)
    }
});

document.querySelector('#date-form').addEventListener('submit', e => {
    e.preventDefault()
    const initialDate = document.querySelector('#initial-date').value
    const delay = document.querySelector('#delay-days').value
    businessDateWithDelayApi(initialDate, delay)
})

document.addEventListener('DOMContentLoaded', function () {
    const elem = document.querySelector('.datepicker')
    const currYear = new Date().getFullYear()
    const options = {
        autoClose: true,
        format: 'mmmm dd, yyyy',
        defaultDate: new Date(currYear, 1, 31),
        maxDate: new Date(currYear + 10, 12, 31),
        yearRange: [2000, currYear + 10]
    }
    M.Datepicker.init(elem, options);
});

function toastNotification(message, type){
    var toastHTML = message;
    M.toast({ html: toastHTML, classes:'danger' })
}