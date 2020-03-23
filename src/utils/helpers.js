import bizniz from 'bizniz';
import { DateTime } from 'luxon';
import Holidays from 'date-holidays';

function getHolidays(year, country = 'US') {
    const countryDetails = {
        country,
        state: 'IL',
    };
    const options = {
        types: 'public',
    };
    const holidays = new Holidays(countryDetails, options);
    const allHolidays = holidays.getHolidays(year);
    return allHolidays;
}

function checkBankHoliday(startDate, endDate, country = 'US') {
    const startYear = DateTime.fromJSDate(startDate).year;
    const endYear = DateTime.fromJSDate(endDate).year;
    let totalHolidays = 0
    if (startYear != endYear) {
        const lastDate = DateTime.fromFormat(`December 31 ${startYear}`, 'MMMM d yyyy')
            .setLocale('en_US')
            .toJSDate();
        const firstDate = DateTime.fromFormat(`January 1 ${endYear}`, 'MMMM d yyyy')
            .setLocale('en_US')
            .toJSDate();
        totalHolidays = calculateHolidaysInAYear(startDate, lastDate, startYear, country) + calculateHolidaysInAYear(firstDate, endDate, endYear, country);
    } else {
        totalHolidays = calculateHolidaysInAYear(startDate, endDate, startYear, country);
    }
    return totalHolidays;
};

function calculateHolidaysInAYear(startDate, endDate, year, country) {
    const allHolidays = getHolidays(year, country);
    let counter = 0;
    for (const index in allHolidays) {
        let holiday = allHolidays[index];
        let currentDate = DateTime.fromFormat(holiday.date, 'yyyy-MM-dd hh:mm:ss')
            .setLocale('en_US')
            .toJSDate();
        if (
            DateTime.fromJSDate(startDate)
                .until(DateTime.fromJSDate(endDate))
                .contains(currentDate)
        ) {
            let nextDay = bizniz.addDays(currentDate, 1);
            // A holiday on Saturday
            if (holiday.substitute && bizniz.isWeekendDay(nextDay)) {
                continue;
            }
            counter++;
        }
    }
    return counter;
}

function checkIfHoliday(startDate) {
    const allHolidays = getHolidays(DateTime.fromJSDate(startDate).year);
    const prevDay = bizniz.addDays(startDate, -1);
    return allHolidays.some(holiday => {
        let currentDate = DateTime.fromFormat(holiday.date, 'yyyy-MM-dd hh:mm:ss')
            .setLocale('en_US')
            .toJSDate();
        return DateTime.fromJSDate(prevDay)
            .until(startDate)
            .contains(currentDate);
    });
}

module.exports = { checkBankHoliday, calculateHolidaysInAYear, checkIfHoliday, getHolidays };