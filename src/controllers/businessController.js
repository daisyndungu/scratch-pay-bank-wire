import bizniz from 'bizniz'
import { DateTime } from 'luxon'

import { checkBankHoliday, checkIfHoliday } from '../utils/helpers';

function businessDaysWithDelay(req, res) {
    let { initialDate, delay } = req.method == 'POST' ? req.body : req.query;
    delay = Number(delay)
    const parsedInitDate = DateTime.fromISO(initialDate).toJSDate()
    try {
        const dateAfterDelay = bizniz.addDays(parsedInitDate, delay);
        let weekendDays = bizniz.weekendDaysBetween(parsedInitDate, dateAfterDelay);
        let businessDate = bizniz.addDays(parsedInitDate, delay + (weekendDays / 2));

        // check if businessDate is a Sunday
        if (bizniz.isWeekendDay(businessDate)) {
            const nextDay = bizniz.addDays(businessDate, 1);
            if (!bizniz.isWeekendDay(nextDay)) {
                businessDate = nextDay
                weekendDays += 1
            }
        }

        let holidayDays = checkBankHoliday(parsedInitDate, businessDate);
        businessDate = bizniz.addDays(businessDate, holidayDays);
        if (checkIfHoliday(parsedInitDate)) {
            holidayDays += 1;
        } 
        return res.status(201).json({
            ok: true,
            initialQuery: {
                initialDate,
                delay,
            },
            results: {
                businessDate: DateTime.fromJSDate(businessDate).toUTC(),
                totalDays: delay + weekendDays / 2 + holidayDays,
                holidayDays,
                weekendDays,
            },
        });
    } catch(err) {
        return res.status(500).json({
            ok: false,
            initialQuery: {
                initialDate,
                delay,
            },
            results: {
                businessDate: '',
                totalDays: 0,
                holidayDays: 0,
                weekendDays: 0,
            },
            error: "Unable to get business date, counter check the date provided"
        });
    }
}

module.exports = { businessDaysWithDelay }