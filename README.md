# Datex

[![npm version](https://img.shields.io/npm/v/@drumtj/datex.svg?style=flat)](https://www.npmjs.com/package/@drumtj/datex)
[![license](https://img.shields.io/npm/l/@drumtj/datex.svg)](#)

This library is **Date Class Extension**

## Features

- leap year check available
- day of week check available
- week countable
- can be get date range and convert to array
- can be get date offset

## Installing

Using npm:

```bash
$ npm install @drumtj/datex
```

Using cdn:

```html
<script src="https://unpkg.com/@drumtj/datex@1.0.12/dist/datex.js"></script>
```

Using amd, commonjS Module

```js
const Datex = require('@drumtj/datex');
```

```js
import Datex from '@drumtj/datex';
```

## Example

```js
var dx = new Datex();
if(dx.isMonday()){
  console.log("welcome to the hell", dx.getMonthName(), dx.getDayName());
}

if(dx.isLeapYear()){
  console.log(dx.getFullYear(), "is leap year");
}

//week count in year
dx.getWeekCount();

//set date to later 3day
dx.setOffset(3);
//set time to zero
dx.timereset();

//return new Datex object to set date to later 3day
dx.getOffset(3);
//offset for week
dx.getOffsetWeek(1);
//offset for month
dx.getOffsetMonth(1);
//return first day in week
dx.getFirstDayOfWeek()
//return first day in month
dx.getFirstDayOfMonth()
//return last day in week
dx.getLastDayOfWeek()
//return last day in month
dx.getLastDayOfMonth()



//interface DateRange{
//  startDate: Date;
//  endDate: Date;
//  weeks?: DateRange[];
//  toTimeArray?: ()=>number[]|number[][];
//  toDateArray?: ()=>Date[]|Date[][];
//  toDateStringArray?: ()=>string[]|string[][];
//}

//return DateRange
dx.getWeekRange(1)
//with split to 'DateRange' each week
dx.getWeekRange(1, true)
dx.getMonthRange(1)
//with split to 'DateRange' each week
var dateRange = dx.getMonthRange(1, true)

console.log(dateRange.toDateArray());

//format
dx.format(); //2019-07-02
dx.format("DDD MMM DD YYYY hh:mm:ss"); // Tue Jul 02 2019 16:22:06
dx.format("DDDD MMMM DD YYYY hh:mm:ss"); // Tuesday July 02 2019 16:22:06
dx.format("YYYY년 M월 D일 (DDD)", "ko"); // 2019년 7월 2일 (화)
dx.format("YYYY년 MM월 DD일 (DDDD)", "ko"); // 2019년 07월 02일 (화요일)
```

examples ([source](https://github.com/drumtj/datex/tree/master/examples))
- [method test log](https://drumtj.github.io/datex/log.html)
- [calendar](https://drumtj.github.io/datex/calendar.html)

## License

MIT
