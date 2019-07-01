# Datex
## This library is **Date Extension**

```js
var today = new Date();
var dx = today.toDatex();
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
```
