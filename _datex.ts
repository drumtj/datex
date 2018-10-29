
module datex {
  interface DateRange{
    startDate: Date;
    endDate: Date;
    weeks?: DateRange[];
  }

  var dayms = 1000 * 60 * 60 * 24;
  var weekms = dayms * 7;
  var timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  export function calZeroTime(time:number): number{
    return Math.floor((time - timezoneOffset) / dayms) * dayms + timezoneOffset;
  }

  export function getZeroTime(date:Date): number{
    return calZeroTime(date.getTime());
  }

  export function setZeroTime(date:Date): Date{
    //Math.floor(result.startDate.getTime()/dayms)*dayms
    //date.setTime( Math.floor(date.getTime() / dayms) * dayms + timezoneOffset );
    date.setTime( calZeroTime(date.getTime()) );
    return date;
  }

  export function getWeekNumber(date:Date): number {
    var first = new Date(date.getFullYear(),0,1);
    // var numday = ((date.getTime() - first.getTime())/dayms);
    return Math.ceil((((date.getTime() - first.getTime())/dayms) + first.getDay()+1) / 7);
  }


  export function getFullMonthRange(date:Date, durationMonth?:number, splitWeek?:boolean): DateRange{
    durationMonth = durationMonth || 1;
    var result = {
      startDate: getLastSunday(getFirstDate(date)),
      //말일이 전부 다르므로 1일을 구하고 month offset을 한다음 그 달의 말일을 구한뒤 다음주일의 하루전으로 빽
      endDate: offset(getNextSunday(getLastDate(dateOffsetMonth(getFirstDate(date), durationMonth-1))), -1)
    }

    if(splitWeek){
      var arr = [], t, et;
      //시간은 초기화날짜만남김
      //t = new Date(Math.floor(result.startDate.getTime()/dayms)*dayms);
      t = new Date(getZeroTime(result.startDate));
      while((et = offset(t, 6)) <= result.endDate){
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

  export function getMonthRange(date:Date, durationMonth?:number): DateRange{
    durationMonth = durationMonth || 1;
    return {
      startDate: getFirstDate(date),
      endDate: getLastDate(dateOffsetMonth(getFirstDate(date), durationMonth-1))
    }
  }

  export function getWeekRange(date:Date, durationWeek?:number|Date, splitWeek?:boolean): DateRange{
    var result;
    if(durationWeek instanceof Date){
      result = {
        startDate: getLastSunday(date),
        endDate: offset(getNextSunday(durationWeek), -1)
      }
    }else{
      durationWeek = durationWeek || 1;
      result = {
        startDate: getLastSunday(date),
        endDate: offset(getLastSunday(date), 6 + (7 * (durationWeek-1)))
      }
    }

    if(splitWeek){
      var arr = [], t, et;
      //시간은 초기화날짜만남김
      //t = new Date(Math.floor(result.startDate.getTime()/dayms)*dayms);
      t = new Date(getZeroTime(result.startDate));
      while((et = offset(t, 6)) <= result.endDate){
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


  export function getFirstDate(date:Date): Date{
    return new Date(date.getFullYear(),date.getMonth(),1);
    // var d = new Date(date);
    // d.setDate(1);
    // return d;
  }

  export function getLastDate(date:Date): Date{
    //var d = new Date(date);
    //offset(date);
    var d = new Date(date.getFullYear(),date.getMonth(),1);
    d.setDate([31,(isLeapYear(date)?29:28),31,30,31,31,30,31,30,31,30,31][d.getMonth()]);
    return d;
  }

  export function isLeapYear(date:Date): boolean{
    return date.getFullYear() % 4 == 0;
  }

  export function dateOffsetMonth(date:Date, offsetMonth?:number): Date{
    //offsetMonth = offsetMonth || 0;
    //var d = new Date(date.getTime());
    var d = new Date(getZeroTime(date));

    var m = d.getMonth() + (offsetMonth || 0);
    var y = d.getFullYear() + Math.floor(m / 12);
    d.setFullYear(y);
    d.setMonth(m%12);
    return d;
  }

  export function offset(date:Date, offsetDay?:number): Date{
    //offsetDay = offsetDay || 0;
    return new Date(calZeroTime(date.getTime() + dayms * (offsetDay || 0)));
  }



  export function getLastSunday(date:Date): Date {
    //var numday = dayms * date.getDay();
    //console.log(date, new Date(getZeroTime(date)), new Date(date.getTime()-(dayms * date.getDay())));
    //console.log(new Date(calZeroTime(date.getTime() - (dayms * date.getDay()))), new Date(date.getTime() - (dayms * date.getDay())));
    return new Date(calZeroTime(date.getTime() - (dayms * date.getDay())));
  }

  export function getNextSunday(date:Date): Date {
    //var numday = dayms * (7-date.getDay());
    return new Date(calZeroTime(date.getTime() + (dayms * (7-date.getDay()))));
  }

  export function getOffsetSunday(date:Date, offsetWeekNumber?:number){
    //offsetWeekNumber = offsetWeekNumber || 0;
    return new Date(getLastSunday(date).getTime() + weekms * (offsetWeekNumber || 0));
  }

  export function isSaturday(date:Date): boolean{
    return date.getDay() == 6;
  }

  export function isSunday(date:Date): boolean{
    return date.getDay() == 0;
  }


  export function getDateTimeArray(dateRange:DateRange): number[]{
    var arr = [], t = getZeroTime(dateRange.startDate), et = getZeroTime(dateRange.endDate);

    //console.error(getSimpleDateString(new Date(t)),"~",getSimpleDateString(new Date(et)));
    while(t <= et){
      arr.push(t);
      //console.error(getSimpleDateString(new Date(t)));
      t += dayms;
    }
    return arr;
  }


  export function getDateArray(dateRange:DateRange): Date[]{
    if(dateRange.weeks){
      var arr = [];
      for(var o in dateRange.weeks){
        arr.push(getDateTimeArray(dateRange.weeks[o]).map(function(v,i,a){
          return new Date(v);
        }));
      }
      return arr;
    }else{
      return getDateTimeArray(dateRange).map(function(v,i,a){
        return new Date(v);
      });
    }
  }

  export function getDateStringArray(dateRange:DateRange): string[]{
    if(dateRange.weeks){
      var arr = [];
      for(var o in dateRange.weeks){
        arr.push(getDateTimeArray(dateRange.weeks[o]).map(function(v,i,a){
          return getSimpleDateString(new Date(v));
        }));
      }
      return arr;
    }else{
      return getDateTimeArray(dateRange).map(function(v,i,a){
        return getSimpleDateString(new Date(v));
      });
    }
  }

  export function getSimpleDateString(date:Date): string{
    //아래처럼하면 0시0분에 이전 날짜를 보여주는 오류
    //return d.toJSON().substr(0,10);
    //return [date.getFullYear(), ("0"+(date.getMonth()+1)).substr(-2), ("0"+date.getDate()).substr(-2)].join("-");
    return date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).substr(-2) + '-' + ('0'+date.getDate()).substr(-2);
    //아래처럼하면 00시에 다른날짜,,,
    //return date.toISOString().split('T')[0];
  }


  // console.error("getWeekNumber", getWeekNumber(new Date()));
  // console.error("getLastSunday", getLastSunday(new Date()));
  // console.error("getNextSunday", getNextSunday(new Date()));
  // console.error("getOffsetSunday 1", getOffsetSunday(new Date(), 1));
  // console.error("getOffsetSunday 2", getOffsetSunday(new Date(), 2));
  // console.error("getOffsetSunday -2", getOffsetSunday(new Date(), -2));
  // console.error("getWeekRange 180101", getWeekRange(new Date("2018-01-01")));
  //
  // console.error("getWeekRange", getWeekRange(new Date()));
  // console.error("getWeekRange splitWeek", getWeekRange(new Date(), 1, true));
  // console.error("getWeekRange 2", getWeekRange(new Date(), 2));
  // console.error("offset", offset(new Date(), 3));
  // console.error("dateOffsetMonth 1", dateOffsetMonth(new Date(), 1));
  // console.error("dateOffsetMonth 12", dateOffsetMonth(new Date(), 12));
  // console.error("getMonthRange", getMonthRange(new Date()));
  // console.error("getMonthRange 2", getMonthRange(new Date(), 2));
  //
  // console.error("------");
  // console.error("getFullMonthRange", getFullMonthRange(new Date()));
  // console.error("getFirstDate", getFirstDate(new Date()));
  // console.error("getLastSunday", getLastSunday(getFirstDate(new Date())));
  // console.error("------");
  //
  // console.error("getDateStringArray getWeekRange 180101", getDateStringArray(getWeekRange(new Date("2018-01-01"))));
  //
  // console.error("getDateStringArray getWeekRange 1", getDateStringArray(getWeekRange(new Date())));
  // console.error("getDateStringArray getWeekRange 2", getDateStringArray(getWeekRange(new Date(), 2)));
  //
  // console.error("getDateStringArray getMonthRange 1 month", getDateStringArray(getMonthRange(new Date(), 1)));
  // console.error("getDateStringArray getMonthRange 2 month", getDateStringArray(getMonthRange(new Date(), 2)));
  //
  // console.error("getDateStringArray getFullMonthRange", getDateStringArray(getFullMonthRange(new Date())));
  // console.error("getDateStringArray getFullMonthRange splitWeek", getDateStringArray(getFullMonthRange(new Date(), 1, true)));
  //
  // console.error("getDateArray getFullMonthRange splitWeek", getDateArray(getFullMonthRange(new Date(), 1, true)));
}
