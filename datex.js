var Datex = (function () {
    function Datex(date) {
        this.date = date;
    }
    Datex.prototype.clone = function () {
        return new Datex(new Date(this.date.getTime()));
    };
    Datex.prototype.getDayName = function (min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.getDayName(this.date, min, lang);
    };
    Datex.getDayName = function (date, min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.daynames[min ? "min" : "normal"][lang][date.getDay()];
    };
    Datex.prototype.getUTCDayName = function (min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.getUTCDayName(this.date, min, lang);
    };
    Datex.getUTCDayName = function (date, min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.daynames[min ? "min" : "normal"][lang][date.getUTCDay()];
    };
    Datex.prototype.getMonthName = function (min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.getMonthName(this.date, min, lang);
    };
    Datex.getMonthName = function (date, min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.monthnames[min ? "min" : "normal"][lang][date.getMonth()];
    };
    Datex.prototype.getUTCMonthName = function (min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.getUTCMonthName(this.date, min, lang);
    };
    Datex.getUTCMonthName = function (date, min, lang) {
        if (min === void 0) { min = false; }
        if (lang === void 0) { lang = "en"; }
        return Datex.monthnames[min ? "min" : "normal"][lang][date.getUTCMonth()];
    };
    Datex.prototype.getWeekRange = function (durationWeek, splitWeek) {
        return Datex.getWeekRange(this.date, durationWeek, splitWeek);
    };
    Datex.getWeekRange = function (date, durationWeek, splitWeek) {
        var result;
        if (durationWeek instanceof Date) {
            result = {
                startDate: Datex.getFirstDayOfMonth(date),
                endDate: Datex.getLastDayOfWeek(durationWeek)
            };
        }
        else {
            durationWeek = durationWeek || 1;
            if (durationWeek > 0) {
                result = {
                    startDate: Datex.getFirstDayOfWeek(date),
                    endDate: Datex.setLastDayOfWeek(Datex.getOffsetWeek(date, durationWeek - 1))
                };
            }
            else {
                result = {
                    startDate: Datex.setFirstDayOfWeek(Datex.getOffsetWeek(date, durationWeek)),
                    endDate: Datex.getLastDayOfWeek(date)
                };
            }
        }
        if (splitWeek) {
            Datex.splitWeek(result);
        }
        return Datex.dateRangeWithFunc(result);
    };
    Datex.prototype.getMonthRange = function (durationMonth, splitWeek) {
        return Datex.getMonthRange(this.date, durationMonth, splitWeek);
    };
    Datex.getMonthRange = function (date, durationMonth, splitWeek) {
        durationMonth = durationMonth || 1;
        var result;
        if (durationMonth < 0) {
            result = {
                startDate: Datex.setFirstDayOfMonth(Datex.getOffsetMonth(date, durationMonth)),
                endDate: Datex.getLastDayOfMonth(date)
            };
        }
        else {
            result = {
                startDate: Datex.getFirstDayOfMonth(date),
                endDate: Datex.setLastDayOfMonth(Datex.getOffsetMonth(date, durationMonth - 1))
            };
        }
        if (splitWeek) {
            Datex.splitWeek(result);
        }
        return Datex.dateRangeWithFunc(result);
    };
    Datex.prototype.getFullMonthRange = function (durationMonth, splitWeek) {
        return Datex.getFullMonthRange(this.date, durationMonth, splitWeek);
    };
    Datex.getFullMonthRange = function (date, durationMonth, splitWeek) {
        durationMonth = durationMonth || 1;
        var result;
        if (durationMonth < 0) {
            result = {
                startDate: Datex.setFirstDayOfWeek(Datex.setFirstDayOfMonth(Datex.getOffsetMonth(date, durationMonth))),
                endDate: Datex.setLastDayOfWeek(Datex.getLastDayOfMonth(date))
            };
        }
        else {
            result = {
                startDate: Datex.setFirstDayOfWeek(Datex.getFirstDayOfMonth(date)),
                endDate: Datex.setLastDayOfWeek(Datex.setLastDayOfMonth(Datex.getOffsetMonth(date, durationMonth - 1)))
            };
        }
        if (splitWeek) {
            Datex.splitWeek(result);
        }
        return Datex.dateRangeWithFunc(result);
    };
    Datex.splitWeek = function (dateRange) {
        var arr = [], t, et, endDate;
        if (!Datex.isSunday(dateRange.startDate)) {
            t = Datex.timereset(Datex.getFirstDayOfWeek(dateRange.startDate));
        }
        else {
            t = new Date(Datex.getResetTime(dateRange.startDate.getTime()));
        }
        if (!Datex.isSaturday(dateRange.endDate)) {
            endDate = Datex.timereset(Datex.getLastDayOfWeek(dateRange.endDate));
        }
        else {
            endDate = new Date(Datex.getResetTime(dateRange.endDate.getTime()));
        }
        while (t <= endDate) {
            et = Datex.getLastDayOfWeek(t);
            if (et > endDate) {
                et = endDate;
            }
            arr.push({
                startDate: t,
                endDate: et
            });
            t = Datex.setFirstDayOfWeek(Datex.getOffset(t, 7));
        }
        dateRange["weeks"] = arr;
        return dateRange;
    };
    Datex._getTimeArray = function (dateRange) {
        var arr = [], t = Datex.getResetTime(dateRange.startDate.getTime()), et = Datex.getResetTime(dateRange.endDate.getTime());
        while (t <= et) {
            arr.push(t);
            t += Datex.dayms;
        }
        return arr;
    };
    Datex.getTimeArray = function (dateRange) {
        if (dateRange.weeks) {
            var arr = [];
            for (var o in dateRange.weeks) {
                arr.push(Datex._getTimeArray(dateRange.weeks[o]));
            }
            return arr;
        }
        else {
            return Datex._getTimeArray(dateRange);
        }
    };
    Datex.getDateArray = function (dateRange) {
        if (dateRange.weeks) {
            var arr = [];
            for (var o in dateRange.weeks) {
                arr.push(Datex._getTimeArray(dateRange.weeks[o]).map(function (v, i, a) {
                    return new Date(v);
                }));
            }
            return arr;
        }
        else {
            return Datex._getTimeArray(dateRange).map(function (v, i, a) {
                return new Date(v);
            });
        }
    };
    Datex.getDateStringArray = function (dateRange) {
        if (dateRange.weeks) {
            var arr = [];
            for (var o in dateRange.weeks) {
                arr.push(Datex._getTimeArray(dateRange.weeks[o]).map(function (v, i, a) {
                    return Datex.getSimpleDateString(new Date(v));
                }));
            }
            return arr;
        }
        else {
            return Datex._getTimeArray(dateRange).map(function (v, i, a) {
                return Datex.getSimpleDateString(new Date(v));
            });
        }
    };
    Datex.dateRangeWithFunc = function (dateRange) {
        dateRange.toTimeArray = function () {
            return Datex.getTimeArray.call(Datex, this);
        };
        dateRange.toDateArray = function () {
            return Datex.getDateArray.call(Datex, this);
        };
        dateRange.toDateStringArray = function () {
            return Datex.getDateStringArray.call(Datex, this);
        };
        return dateRange;
    };
    Datex.prototype.toSimpleString = function () {
        return Datex.getSimpleDateString(this.date);
    };
    Datex.getSimpleDateString = function (date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).substr(-2) + '-' + ('0' + date.getDate()).substr(-2);
    };
    Datex.prototype.timereset = function () {
        Datex.timereset(this.date);
        return this;
    };
    Datex.timereset = function (date) {
        date.setTime(Datex.getResetTime(date.getTime()));
        return date;
    };
    Datex.getResetTime = function (time) {
        return Math.floor((time - Datex.timezoneOffset) / Datex.dayms) * Datex.dayms + Datex.timezoneOffset;
    };
    Datex.prototype.getWeekCount = function () {
        return Datex.getWeekCount(this.date);
    };
    Datex.getWeekCount = function (date) {
        var first = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date.getTime() - first.getTime()) / Datex.dayms) + first.getDay() + 1) / 7);
    };
    Datex.prototype.setOffset = function (day) {
        if (!day)
            return this;
        Datex.setOffset(this.date, day);
        return this;
    };
    Datex.prototype.getOffset = function (day) {
        return this.clone().setOffset(day);
    };
    Datex.setOffset = function (date, day) {
        if (!day)
            return date;
        date.setDate(date.getDate() + day);
        return date;
    };
    Datex.getOffset = function (date, day) {
        return Datex.setOffset(new Date(date.getTime()), day);
    };
    Datex.prototype.setOffsetWeek = function (week) {
        if (!week)
            return this;
        Datex.setOffsetWeek(this.date, week);
        return this;
    };
    Datex.prototype.getOffsetWeek = function (week) {
        return this.clone().setOffsetWeek(week);
    };
    Datex.setOffsetWeek = function (date, week) {
        if (!week)
            return date;
        return Datex.setOffset(date, week * 7);
    };
    Datex.getOffsetWeek = function (date, week) {
        return Datex.getOffset(date, week * 7);
    };
    Datex.prototype.setOffsetMonth = function (month) {
        if (!month)
            return this;
        Datex.setOffsetMonth(this.date, month);
        return this;
    };
    Datex.prototype.getOffsetMonth = function (month) {
        return this.clone().setOffsetMonth(month);
    };
    Datex.setOffsetMonth = function (date, month) {
        if (!month)
            return date;
        var tm = date.getFullYear() * 12 + date.getMonth();
        date.setMonth(date.getMonth() + month);
        if ((date.getFullYear() * 12 + date.getMonth()) - tm > month) {
            date.setDate(0);
        }
        return date;
    };
    Datex.getOffsetMonth = function (date, month) {
        return Datex.setOffsetMonth(new Date(date.getTime()), month);
    };
    Datex.prototype.setFirstDayOfWeek = function () {
        Datex.setFirstDayOfWeek(this.date);
        return this;
    };
    Datex.prototype.getFirstDayOfWeek = function () {
        return this.clone().setFirstDayOfWeek();
    };
    Datex.setFirstDayOfWeek = function (date) {
        date.setDate(date.getDate() - date.getDay());
        return date;
    };
    Datex.getFirstDayOfWeek = function (date) {
        return Datex.setFirstDayOfWeek(new Date(date.getTime()));
    };
    Datex.prototype.setSunday = function () {
        Datex.setFirstDayOfWeek(this.date);
        return this;
    };
    Datex.prototype.getSunday = function () {
        return this.clone().setFirstDayOfWeek();
    };
    Datex.setSunday = function (date) {
        return Datex.setFirstDayOfWeek(date);
    };
    Datex.getSunday = function (date) {
        return Datex.getFirstDayOfWeek(date);
    };
    Datex.prototype.setMonday = function () {
        Datex.setMonday(this.date);
        return this;
    };
    Datex.prototype.getMonday = function () {
        return this.clone().setMonday();
    };
    Datex.setMonday = function (date) {
        Datex.setOffset(Datex.setFirstDayOfWeek(date), 1);
        return date;
    };
    Datex.getMonday = function (date) {
        return Datex.setOffset(Datex.getFirstDayOfWeek(date), 1);
    };
    Datex.prototype.setTuesday = function () {
        Datex.setTuesday(this.date);
        return this;
    };
    Datex.prototype.getTuesday = function () {
        return this.clone().setTuesday();
    };
    Datex.setTuesday = function (date) {
        Datex.setOffset(Datex.setFirstDayOfWeek(date), 2);
        return date;
    };
    Datex.getTuesday = function (date) {
        return Datex.setOffset(Datex.getFirstDayOfWeek(date), 2);
    };
    Datex.prototype.setWednesday = function () {
        Datex.setWednesday(this.date);
        return this;
    };
    Datex.prototype.getWednesday = function () {
        return this.clone().setWednesday();
    };
    Datex.setWednesday = function (date) {
        Datex.setOffset(Datex.setFirstDayOfWeek(date), 3);
        return date;
    };
    Datex.getWednesday = function (date) {
        return Datex.setOffset(Datex.getFirstDayOfWeek(date), 3);
    };
    Datex.prototype.setThursday = function () {
        Datex.setThursday(this.date);
        return this;
    };
    Datex.prototype.getThursday = function () {
        return this.clone().setThursday();
    };
    Datex.setThursday = function (date) {
        Datex.setOffset(Datex.setFirstDayOfWeek(date), 4);
        return date;
    };
    Datex.getThursday = function (date) {
        return Datex.setOffset(Datex.getFirstDayOfWeek(date), 4);
    };
    Datex.prototype.setFriday = function () {
        Datex.setFriday(this.date);
        return this;
    };
    Datex.prototype.getFriday = function () {
        return this.clone().setFriday();
    };
    Datex.setFriday = function (date) {
        Datex.setOffset(Datex.setFirstDayOfWeek(date), 5);
        return date;
    };
    Datex.getFriday = function (date) {
        return Datex.setOffset(Datex.getFirstDayOfWeek(date), 5);
    };
    Datex.prototype.setSaturday = function () {
        Datex.setLastDayOfWeek(this.date);
        return this;
    };
    Datex.prototype.getSaturday = function () {
        return this.clone().setLastDayOfWeek();
    };
    Datex.setSaturday = function (date) {
        return Datex.setLastDayOfWeek(date);
    };
    Datex.getSaturday = function (date) {
        return Datex.getLastDayOfWeek(date);
    };
    Datex.prototype.setLastDayOfWeek = function () {
        Datex.setLastDayOfWeek(this.date);
        return this;
    };
    Datex.prototype.getLastDayOfWeek = function () {
        return this.clone().setLastDayOfWeek();
    };
    Datex.setLastDayOfWeek = function (date) {
        date.setDate(date.getDate() + 6 - date.getDay());
        return date;
    };
    Datex.getLastDayOfWeek = function (date) {
        return Datex.setLastDayOfWeek(new Date(date.getTime()));
    };
    Datex.prototype.setFirstDayOfMonth = function () {
        Datex.setFirstDayOfMonth(this.date);
        return this;
    };
    Datex.prototype.getFirstDayOfMonth = function () {
        return this.clone().setFirstDayOfMonth();
    };
    Datex.setFirstDayOfMonth = function (date) {
        date.setDate(1);
        return date;
    };
    Datex.getFirstDayOfMonth = function (date) {
        return Datex.setFirstDayOfMonth(new Date(date.getTime()));
    };
    Datex.prototype.setLastDayOfMonth = function () {
        Datex.setLastDayOfMonth(this.date);
        return this;
    };
    Datex.prototype.getLastDayOfMonth = function () {
        return this.clone().setLastDayOfMonth();
    };
    Datex.setLastDayOfMonth = function (date) {
        Datex.setOffsetMonth(date, 1).setDate(0);
        return date;
    };
    Datex.getLastDayOfMonth = function (date) {
        return Datex.setLastDayOfMonth(new Date(date.getTime()));
    };
    Datex.prototype.isLeapYear = function () {
        return Datex.isLeapYear(this.date);
    };
    Datex.isLeapYear = function (date) {
        return date.getFullYear() % 4 == 0;
    };
    Datex.prototype.isSunday = function () {
        return Datex.isSunday(this.date);
    };
    Datex.isSunday = function (date) {
        return date.getDay() == 0;
    };
    Datex.prototype.isMonday = function () {
        return Datex.isMonday(this.date);
    };
    Datex.isMonday = function (date) {
        return date.getDay() == 1;
    };
    Datex.prototype.isTuesday = function () {
        return Datex.isTuesday(this.date);
    };
    Datex.isTuesday = function (date) {
        return date.getDay() == 2;
    };
    Datex.prototype.isWednesday = function () {
        return Datex.isWednesday(this.date);
    };
    Datex.isWednesday = function (date) {
        return date.getDay() == 3;
    };
    Datex.prototype.isThursday = function () {
        return Datex.isThursday(this.date);
    };
    Datex.isThursday = function (date) {
        return date.getDay() == 4;
    };
    Datex.prototype.isFriday = function () {
        return Datex.isFriday(this.date);
    };
    Datex.isFriday = function (date) {
        return date.getDay() == 5;
    };
    Datex.prototype.isSaturday = function () {
        return Datex.isSaturday(this.date);
    };
    Datex.isSaturday = function (date) {
        return date.getDay() == 6;
    };
    Datex.prototype.getDate = function () {
        return this.date.getDate();
    };
    Datex.prototype.getDay = function () {
        return this.date.getDay();
    };
    Datex.prototype.getFullYear = function () {
        return this.date.getFullYear();
    };
    Datex.prototype.getHours = function () {
        return this.date.getHours();
    };
    Datex.prototype.getMilliseconds = function () {
        return this.date.getMilliseconds();
    };
    Datex.prototype.getMinutes = function () {
        return this.date.getMinutes();
    };
    Datex.prototype.getMonth = function () {
        return this.date.getMonth();
    };
    Datex.prototype.getSeconds = function () {
        return this.date.getSeconds();
    };
    Datex.prototype.getTime = function () {
        return this.date.getTime();
    };
    Datex.prototype.getTimezoneOffset = function () {
        return this.date.getTimezoneOffset();
    };
    Datex.prototype.getUTCDate = function () {
        return this.date.getUTCDate();
    };
    Datex.prototype.getUTCDay = function () {
        return this.date.getUTCDay();
    };
    Datex.prototype.getUTCFullYear = function () {
        return this.date.getUTCFullYear();
    };
    Datex.prototype.getUTCHours = function () {
        return this.date.getUTCHours();
    };
    Datex.prototype.getUTCMilliseconds = function () {
        return this.date.getUTCMilliseconds();
    };
    Datex.prototype.getUTCMinutes = function () {
        return this.date.getUTCMinutes();
    };
    Datex.prototype.getUTCMonth = function () {
        return this.date.getUTCMonth();
    };
    Datex.prototype.getUTCSeconds = function () {
        return this.date.getUTCSeconds();
    };
    Datex.prototype.setDate = function (date) {
        this.date.setDate.apply(arguments);
        return this;
    };
    Datex.prototype.setFullYear = function (year, month, date) {
        this.date.setFullYear.apply(arguments);
        return this;
    };
    Datex.prototype.setHours = function (hours, min, sec, ms) {
        this.date.setHours.apply(arguments);
        return this;
    };
    Datex.prototype.setMilliseconds = function (ms) {
        this.date.setMilliseconds.apply(arguments);
        return this;
    };
    Datex.prototype.setMinutes = function (min, sec, ms) {
        this.date.setMinutes.apply(arguments);
        return this;
    };
    Datex.prototype.setMonth = function (month, date) {
        this.date.setMonth.apply(arguments);
        return this;
    };
    Datex.prototype.setSeconds = function (sec, ms) {
        this.date.setSeconds.apply(arguments);
        return this;
    };
    Datex.prototype.setTime = function (time) {
        this.date.setTime.apply(arguments);
        return this;
    };
    Datex.prototype.setUTCDate = function (date) {
        this.date.setUTCDate.apply(arguments);
        return this;
    };
    Datex.prototype.setUTCFullYear = function (year, month, date) {
        this.date.setUTCFullYear.apply(arguments);
        return this;
    };
    Datex.prototype.setUTCHours = function (hours, min, sec, ms) {
        this.date.setUTCHours.apply(arguments);
        return this;
    };
    Datex.prototype.setUTCMilliseconds = function (ms) {
        this.date.setUTCMilliseconds.apply(arguments);
        return this;
    };
    Datex.prototype.setUTCMinutes = function (min, sec, ms) {
        this.date.setUTCMinutes.apply(arguments);
        return this;
    };
    Datex.prototype.setUTCMonth = function (month, date) {
        this.date.setUTCMonth.apply(arguments);
        return this;
    };
    Datex.prototype.setUTCSeconds = function (sec, ms) {
        this.date.setUTCSeconds.apply(arguments);
        return this;
    };
    Datex.prototype.toDateString = function () {
        return this.date.toDateString();
    };
    Datex.prototype.toISOString = function () {
        return this.date.toISOString();
    };
    Datex.prototype.toJSON = function (key) {
        return this.date.toJSON(key);
    };
    Datex.prototype.toLocaleDateString = function () {
        return this.date.toLocaleDateString();
    };
    Datex.prototype.toLocaleString = function () {
        return this.date.toLocaleString();
    };
    Datex.prototype.toLocaleTimeString = function () {
        return this.date.toLocaleTimeString();
    };
    Datex.prototype.toString = function () {
        return this.date.toString();
    };
    Datex.prototype.toTimeString = function () {
        return this.date.toTimeString();
    };
    Datex.prototype.toUTCString = function () {
        return this.date.toUTCString();
    };
    Datex.prototype.valueOf = function () {
        return this.date.valueOf();
    };
    Datex.daynames = {
        normal: {
            ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        min: {
            ko: ['일', '월', '화', '수', '목', '금', '토'],
            en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }
    };
    Datex.monthnames = {
        normal: {
            ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        min: {
            ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    };
    Datex.dayms = 1000 * 60 * 60 * 24;
    Datex.timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    return Datex;
}());
Date.prototype['toDatex'] = function () {
    return new Datex(this);
};
