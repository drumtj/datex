var datex;
(function (datex) {
    var dayms = 1000 * 60 * 60 * 24;
    var weekms = dayms * 7;
    var timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    function calZeroTime(time) {
        return Math.floor((time - timezoneOffset) / dayms) * dayms + timezoneOffset;
    }
    datex.calZeroTime = calZeroTime;
    function getZeroTime(date) {
        return calZeroTime(date.getTime());
    }
    datex.getZeroTime = getZeroTime;
    function setZeroTime(date) {
        date.setTime(calZeroTime(date.getTime()));
        return date;
    }
    datex.setZeroTime = setZeroTime;
    function getWeekNumber(date) {
        var first = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date.getTime() - first.getTime()) / dayms) + first.getDay() + 1) / 7);
    }
    datex.getWeekNumber = getWeekNumber;
    function getFullMonthRange(date, durationMonth, splitWeek) {
        durationMonth = durationMonth || 1;
        var result = {
            startDate: getLastSunday(getFirstDate(date)),
            endDate: offset(getNextSunday(getLastDate(dateOffsetMonth(getFirstDate(date), durationMonth - 1))), -1)
        };
        if (splitWeek) {
            var arr = [], t, et;
            t = new Date(getZeroTime(result.startDate));
            while ((et = offset(t, 6)) <= result.endDate) {
                arr.push({
                    startDate: t,
                    endDate: et
                });
                t = offset(t, 7);
            }
            result["weeks"] = arr;
        }
        return result;
    }
    datex.getFullMonthRange = getFullMonthRange;
    function getMonthRange(date, durationMonth) {
        durationMonth = durationMonth || 1;
        return {
            startDate: getFirstDate(date),
            endDate: getLastDate(dateOffsetMonth(getFirstDate(date), durationMonth - 1))
        };
    }
    datex.getMonthRange = getMonthRange;
    function getWeekRange(date, durationWeek, splitWeek) {
        var result;
        if (durationWeek instanceof Date) {
            result = {
                startDate: getLastSunday(date),
                endDate: offset(getNextSunday(durationWeek), -1)
            };
        }
        else {
            durationWeek = durationWeek || 1;
            result = {
                startDate: getLastSunday(date),
                endDate: offset(getLastSunday(date), 6 + (7 * (durationWeek - 1)))
            };
        }
        if (splitWeek) {
            var arr = [], t, et;
            t = new Date(getZeroTime(result.startDate));
            while ((et = offset(t, 6)) <= result.endDate) {
                arr.push({
                    startDate: t,
                    endDate: et
                });
                t = offset(t, 7);
            }
            result["weeks"] = arr;
        }
        return result;
    }
    datex.getWeekRange = getWeekRange;
    function getFirstDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    datex.getFirstDate = getFirstDate;
    function getLastDate(date) {
        var d = new Date(date.getFullYear(), date.getMonth(), 1);
        d.setDate([31, (isLeapYear(date) ? 29 : 28), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31][d.getMonth()]);
        return d;
    }
    datex.getLastDate = getLastDate;
    function isLeapYear(date) {
        return date.getFullYear() % 4 == 0;
    }
    datex.isLeapYear = isLeapYear;
    function dateOffsetMonth(date, offsetMonth) {
        var d = new Date(getZeroTime(date));
        var m = d.getMonth() + (offsetMonth || 0);
        var y = d.getFullYear() + Math.floor(m / 12);
        d.setFullYear(y);
        d.setMonth(m % 12);
        return d;
    }
    datex.dateOffsetMonth = dateOffsetMonth;
    function offset(date, offsetDay) {
        return new Date(calZeroTime(date.getTime() + dayms * (offsetDay || 0)));
    }
    datex.offset = offset;
    function getLastSunday(date) {
        return new Date(calZeroTime(date.getTime() - (dayms * date.getDay())));
    }
    datex.getLastSunday = getLastSunday;
    function getNextSunday(date) {
        return new Date(calZeroTime(date.getTime() + (dayms * (7 - date.getDay()))));
    }
    datex.getNextSunday = getNextSunday;
    function getOffsetSunday(date, offsetWeekNumber) {
        return new Date(getLastSunday(date).getTime() + weekms * (offsetWeekNumber || 0));
    }
    datex.getOffsetSunday = getOffsetSunday;
    function isSaturday(date) {
        return date.getDay() == 6;
    }
    datex.isSaturday = isSaturday;
    function isSunday(date) {
        return date.getDay() == 0;
    }
    datex.isSunday = isSunday;
    function getDateTimeArray(dateRange) {
        var arr = [], t = getZeroTime(dateRange.startDate), et = getZeroTime(dateRange.endDate);
        while (t <= et) {
            arr.push(t);
            t += dayms;
        }
        return arr;
    }
    datex.getDateTimeArray = getDateTimeArray;
    function getDateArray(dateRange) {
        if (dateRange.weeks) {
            var arr = [];
            for (var o in dateRange.weeks) {
                arr.push(getDateTimeArray(dateRange.weeks[o]).map(function (v, i, a) {
                    return new Date(v);
                }));
            }
            return arr;
        }
        else {
            return getDateTimeArray(dateRange).map(function (v, i, a) {
                return new Date(v);
            });
        }
    }
    datex.getDateArray = getDateArray;
    function getDateStringArray(dateRange) {
        if (dateRange.weeks) {
            var arr = [];
            for (var o in dateRange.weeks) {
                arr.push(getDateTimeArray(dateRange.weeks[o]).map(function (v, i, a) {
                    return getSimpleDateString(new Date(v));
                }));
            }
            return arr;
        }
        else {
            return getDateTimeArray(dateRange).map(function (v, i, a) {
                return getSimpleDateString(new Date(v));
            });
        }
    }
    datex.getDateStringArray = getDateStringArray;
    function getSimpleDateString(date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).substr(-2) + '-' + ('0' + date.getDate()).substr(-2);
    }
    datex.getSimpleDateString = getSimpleDateString;
})(datex || (datex = {}));
