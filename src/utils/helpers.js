import bizniz from 'bizniz';
import { DateTime } from 'luxon';
import Holidays from 'date-holidays';

/** Return a list of objects containing all
 * the information about all the holidays in given year
 * for a specific country/Region
 * 
 * @param year - specific year of the calendar
 * @param country - the country of the holiday calendar
 */
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

/** Return the all number of bank holidays with a specific duration
 * 
 * @param {*} startDate - the begin of the duration
 * @param {*} endDate - end of duration
 * @param {*} country - the country of the holiday calendar
 */
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

/** Return all the holiday within a specific duration in the same year
 * 
 * @param startDate - begining of the period within the specified year
 * @param endDate - end of the period within the specified year
 * @param year - holiday calendar year
 * @param country - country of the calendar
 */
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
            // Skip if a holiday on a Saturday
            if (holiday.substitute && bizniz.isWeekendDay(nextDay)) {
                continue;
            }
            counter++;
        }
    }
    return counter;
}

/** Check if a given date is a holiday
 * 
 * @param startDate - date value inform of a JS Date object
 */
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