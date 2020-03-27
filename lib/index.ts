const daynames = {
  normal:{
    ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  min:{
    ko: ['일', '월', '화', '수', '목', '금', '토'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }
}

const monthnames = {
  normal:{
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  min:{
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
}

const dayms = 1000 * 60 * 60 * 24;
const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;



function splitWeek(dateRange:DateRange): DateRange {
  var arr = [], t, et, endDate;
  //시간은 초기화날짜만남김
  //한 주가 요일별로 꽉차야하므로 맞춰준다
  if(!Datex.isSunday(dateRange.startDate)){
    t = Datex.timereset(Datex.getFirstDayOfWeek(dateRange.startDate));
  }else{
    t = new Date(Datex.getResetTime(dateRange.startDate.getTime()));
  }
  if(!Datex.isSaturday(dateRange.endDate)){
    endDate = Datex.timereset(Datex.getLastDayOfWeek(dateRange.endDate));
  }else{
    endDate = new Date(Datex.getResetTime(dateRange.endDate.getTime()));
  }

  while(t <= endDate){
    et = Datex.getLastDayOfWeek(t);
    if(et > endDate){
      et = endDate;
    }
    arr.push({
      startDate: t,
      endDate: et
    });
    //t = Datex.getOffset(t, 7);
    t = Datex.setFirstDayOfWeek(Datex.getOffset(t, 7));
  }
  dateRange["weeks"] = arr;
  return dateRange;
}

function _getTimeArray(dateRange:DateRange):number[]{
  var arr = [], t = Datex.getResetTime(dateRange.startDate.getTime()), et = Datex.getResetTime(dateRange.endDate.getTime());
  while(t <= et){
    arr.push(t);
    t += dayms;
  }
  return arr;

}

function getTimeArray(dateRange:DateRange):number[]|number[][]{
  if(dateRange.weeks){
    var arr = [];
    for(var o in dateRange.weeks){
      arr.push(_getTimeArray(dateRange.weeks[o]));
    }
    return arr;
  }else{
    return _getTimeArray(dateRange);
  }
}

// static getTimeArray(dateRange:DateRange): number[]|number[][]{
//   if(dateRange.weeks){
//     var arr = [];
//     for(var o in dateRange.weeks){
//       arr.push(Datex.getTimeArray(dateRange.weeks[o]));
//     }
//     return arr;
//   }else{
//     return Datex.getTimeArray(dateRange);
//   }
// }

function getDateArray(dateRange:DateRange): Date[]|Date[][]{
  if(dateRange.weeks){
    var arr = [];
    for(var o in dateRange.weeks){
      arr.push(_getTimeArray(dateRange.weeks[o]).map(function(v,i,a){
        return new Date(v);
      }));
    }
    return arr;
  }else{
    return _getTimeArray(dateRange).map(function(v,i,a){
      return new Date(v);
    });
  }
}

function getDateStringArray(dateRange:DateRange): string[]|string[][]{
  if(dateRange.weeks){
    var arr = [];
    for(var o in dateRange.weeks){
      arr.push(_getTimeArray(dateRange.weeks[o]).map(function(v,i,a){
        return Datex.getSimpleDateString(new Date(v));
      }));
    }
    return arr;
  }else{
    return _getTimeArray(dateRange).map(function(v,i,a){
      return Datex.getSimpleDateString(new Date(v));
    });
  }
}

function dateRangeWithFunc(dateRange:DateRange): DateRange {
  dateRange.toTimeArray = function(){
    return getTimeArray.call(null, this);
  };

  dateRange.toDateArray = function(){
    return getDateArray.call(null, this);
  };

  dateRange.toDateStringArray = function(){
    return getDateStringArray.call(null, this);
  };

  return dateRange;
}


interface DateRange{
  startDate: Date;
  endDate: Date;
  weeks?: DateRange[];
  toTimeArray?: ()=>number[]|number[][];
  toDateArray?: ()=>Date[]|Date[][];
  toDateStringArray?: ()=>string[]|string[][];
}

// class formatDate extends Date {
//   constructor(dateStr) {
//     super(dateStr);
//   }
//
//   getFormattedDate() {
//     var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//
//     return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
//   }
// }

export default class Datex extends Date {

  constructor(year?, month?, date?, hours?, minutes?, seconds?, ms?){
    // super();
    if(ms !== undefined){
      super(year, month, date, hours, minutes, seconds, ms);
    }else if(seconds !== undefined){
      super(year, month, date, hours, minutes, seconds);
    }else if(minutes !== undefined){
      super(year, month, date, hours, minutes);
    }else if(hours !== undefined){
      super(year, month, date, hours);
    }else if(date !== undefined){
      super(year, month, date);
    }else if(month !== undefined){
      super(year, month);
    }else if(year !== undefined){
      super(year);
    }else{
      super();
    }
  }

  clone(): Datex{
    return new Datex(this);
  }

  getDayName(min:boolean=false, lang:string="en"): string {
    return Datex.getDayName(this, min, lang);
  }

  static getDayName(date:Date, min:boolean=false, lang:string="en"): string {
    return daynames[min?"min":"normal"][lang][date.getDay()];
  }

  getUTCDayName(min:boolean=false, lang:string="en"): string {
    return Datex.getUTCDayName(this, min, lang);
  }

  static getUTCDayName(date:Date, min:boolean=false, lang:string="en"): string {
    return daynames[min?"min":"normal"][lang][date.getUTCDay()];
  }

  getMonthName(min:boolean=false, lang:string="en"): string {
    return Datex.getMonthName(this, min, lang);
  }

  static getMonthName(date:Date, min:boolean=false, lang:string="en"): string {
    return monthnames[min?"min":"normal"][lang][date.getMonth()];
  }

  getUTCMonthName(min:boolean=false, lang:string="en"): string {
    return Datex.getUTCMonthName(this, min, lang);
  }

  static getUTCMonthName(date:Date|Datex, min:boolean=false, lang:string="en"): string {
    return monthnames[min?"min":"normal"][lang][date.getUTCMonth()];
  }

  getWeekRange(durationWeek?:number|Date|Datex, splitWeek?:boolean): DateRange {
    return Datex.getWeekRange(this, durationWeek, splitWeek);
  }

  static getWeekRange(date:Date|Datex, durationWeek?:number|Date|Datex, doSplitWeek?:boolean): DateRange {
    var result;
    if(durationWeek as any instanceof Date || durationWeek as any instanceof Datex){
      result = {
        startDate: Datex.getFirstDayOfMonth(date),
        endDate: Datex.getLastDayOfWeek(durationWeek as Date)
      }
    }else{
      durationWeek = durationWeek || 1;
      if(durationWeek > 0){
        result = {
          startDate: Datex.getFirstDayOfWeek(date),
          endDate: Datex.setLastDayOfWeek(Datex.getOffsetWeek(date, durationWeek as number - 1))//offset(getLastSunday(date), 6 + (7 * (durationWeek-1)))
        }
      }else{
        result = {
          startDate: Datex.setFirstDayOfWeek(Datex.getOffsetWeek(date, durationWeek as number)),
          endDate: Datex.getLastDayOfWeek(date)
        }
      }
    }

    if(doSplitWeek){
      splitWeek(result);
    }

    return dateRangeWithFunc(result);
  }



  toSimpleString(): string{
    return Datex.getSimpleDateString(this);
  }

  static getSimpleDateString(date:Date|Datex): string{
    //아래처럼하면 0시0분에 이전 날짜를 보여주는 오류
    //return d.toJSON().substr(0,10);
    //return [date.getFullYear(), ("0"+(date.getMonth()+1)).substr(-2), ("0"+date.getDate()).substr(-2)].join("-");
    return date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).substr(-2) + '-' + ('0'+date.getDate()).substr(-2);
    //아래처럼하면 00시에 다른날짜,,,
    //return date.toISOString().split('T')[0];
  }



  timereset(): Datex {
    Datex.timereset(this);
    return this;
  }

  static timereset(date:Date|Datex): Date {
    //Datex.dayms = 1000 * 60 * 60 * 24 //1day time
    //date.setTime(Math.floor((date.getTime() - Datex.timezoneOffset) / Datex.dayms) * Datex.dayms + Datex.timezoneOffset);
    date.setTime(Datex.getResetTime(date.getTime()));
    return date;
  }

  static getResetTime(time:number): number {
    return Math.floor((time - timezoneOffset) / dayms) * dayms + timezoneOffset;
  }

  getWeekCount(): number {
    return Datex.getWeekCount(this);
  }

  static getWeekCount(date:Date|Datex): number {
    var first = new Date(date.getFullYear(),0,1);
    // var numday = ((this.date.getTime() - first.getTime()) / dayms);
    return Math.ceil((((date.getTime() - first.getTime()) / dayms) + first.getDay()+1) / 7);
  }

  setOffset(day:number): Datex {
    if(!day) return this;
    Datex.setOffset(this, day);
    return this;
    //return this.setDate(this.date.getDate() + day);
  }

  getOffset(day:number): Datex {
    return this.clone().setOffset(day);
    // if(!day) return this.clone();
    // this.date.setDate(this.date.getDate() + day);
    // return this.clone().setDate(this.date.getDate() + day);
  }

  static setOffset(date:Date|Datex, day:number): Date {
    if(!day) return date;
    date.setDate(date.getDate() + day);
    return date;
  }

  static getOffset(date:Date|Datex, day:number): Date {
    return Datex.setOffset(new Date(date.getTime()), day);
  }

  setOffsetWeek(week:number): Datex {
    if(!week) return this;
    Datex.setOffsetWeek(this, week);
    return this;
  }

  getOffsetWeek(week:number): Datex {
    return this.clone().setOffsetWeek(week);
    // if(!week) return this;
    // return this.getOffset(week * 7);
  }

  static setOffsetWeek(date:Date|Datex, week:number): Date {
    if(!week) return date;
    return Datex.setOffset(date, week * 7);
  }

  static getOffsetWeek(date:Date|Datex, week:number): Date {
    return Datex.getOffset(date, week * 7);
  }

  setOffsetMonth(month:number): Datex {
    if(!month) return this;
    Datex.setOffsetMonth(this, month);
    return this;
    // var tm = this.date.getFullYear() * 12 + this.date.getMonth();
    // this.date.setMonth(this.date.getMonth()+ month);
    // if((this.date.getFullYear() * 12 + this.date.getMonth()) - tm > month){
    //   //console.error("!",(this.date.getFullYear() * 12 + this.date.getMonth()), tm);
    //   //지난달 31일에서 1달을 추가했을때 이번달이 30일까지밖에 없어서 그 다음달 1일이 된 상황이면, setDate(0)을 해줘서 1일전날로 설정(마지막날)
    //   this.date.setDate(0);
    // }
    // return this;
  }

  getOffsetMonth(month:number): Datex {
    return this.clone().setOffsetMonth(month);
  }

  static setOffsetMonth(date:Date|Datex, month:number): Date {
    if(!month) return date;
    var tm = date.getFullYear() * 12 + date.getMonth();
    date.setMonth(date.getMonth()+ month);
    if((date.getFullYear() * 12 + date.getMonth()) - tm > month){
      //console.error("!",(this.date.getFullYear() * 12 + this.date.getMonth()), tm);
      //지난달 31일에서 1달을 추가했을때 이번달이 30일까지밖에 없어서 그 다음달 1일이 된 상황이면, setDate(0)을 해줘서 1일전날로 설정(마지막날)
      date.setDate(0);
    }

    return date;
  }

  static getOffsetMonth(date:Date|Datex, month:number): Date {
    return Datex.setOffsetMonth(new Date(date.getTime()), month);
  }

  setFirstDayOfWeek(): Datex {
    // this.date.setDate(this.date.getDate() - this.date.getDay());
    Datex.setFirstDayOfWeek(this);
    return this;
  }

  getFirstDayOfWeek(): Datex {
    return this.clone().setFirstDayOfWeek();
    // this.date.setDate(this.date.getDate() - this.date.getDay());
    // return this;
  }

  static setFirstDayOfWeek(date:Date|Datex): Date {
    date.setDate(date.getDate() - date.getDay());
    return date;
  }

  static getFirstDayOfWeek(date:Date|Datex): Date {
    return Datex.setFirstDayOfWeek(new Date(date.getTime()));
  }

  setSunday(): Datex {
    Datex.setFirstDayOfWeek(this);
    return this;
  }

  getSunday(): Datex {
    return this.clone().setFirstDayOfWeek();
  }

  static setSunday(date:Date|Datex): Date {
    return Datex.setFirstDayOfWeek(date);
  }

  static getSunday(date:Date|Datex): Date {
    return Datex.getFirstDayOfWeek(date);
  }

  setMonday(): Datex {
    Datex.setMonday(this);
    return this;
  }

  getMonday(): Datex {
    return this.clone().setMonday();
  }

  static setMonday(date:Date|Datex): Date {
    //date.setDate(date.getDate() - date.getDay() + 1);
    Datex.setOffset(Datex.setFirstDayOfWeek(date), 1);
    return date;
  }

  static getMonday(date:Date|Datex): Date {
    //return new Date(date.getDate() - date.getDay() + 1);
    return Datex.setOffset(Datex.getFirstDayOfWeek(date), 1);
  }

  setTuesday(): Datex {
    Datex.setTuesday(this);
    return this;
  }

  getTuesday(): Datex {
    return this.clone().setTuesday();
  }

  static setTuesday(date:Date|Datex): Date {
    Datex.setOffset(Datex.setFirstDayOfWeek(date), 2);
    return date;
  }

  static getTuesday(date:Date|Datex): Date {
    return Datex.setOffset(Datex.getFirstDayOfWeek(date), 2);
  }

  setWednesday(): Datex {
    Datex.setWednesday(this);
    return this;
  }

  getWednesday(): Datex {
    return this.clone().setWednesday();
  }

  static setWednesday(date:Date|Datex): Date {
    Datex.setOffset(Datex.setFirstDayOfWeek(date), 3);
    return date;
  }

  static getWednesday(date:Date|Datex): Date {
    return Datex.setOffset(Datex.getFirstDayOfWeek(date), 3);
  }

  setThursday(): Datex {
    Datex.setThursday(this);
    return this;
  }

  getThursday(): Datex {
    return this.clone().setThursday();
  }

  static setThursday(date:Date|Datex): Date {
    Datex.setOffset(Datex.setFirstDayOfWeek(date), 4);
    return date;
  }

  static getThursday(date:Date|Datex): Date {
    return Datex.setOffset(Datex.getFirstDayOfWeek(date), 4);
  }

  setFriday(): Datex {
    Datex.setFriday(this);
    return this;
  }

  getFriday(): Datex {
    return this.clone().setFriday();
  }

  static setFriday(date:Date|Datex): Date {
    Datex.setOffset(Datex.setFirstDayOfWeek(date), 5);
    return date;
  }

  static getFriday(date:Date|Datex): Date {
    return Datex.setOffset(Datex.getFirstDayOfWeek(date), 5);
  }

  setSaturday(): Datex {
    Datex.setLastDayOfWeek(this);
    return this;
  }

  getSaturday(): Datex {
    return this.clone().setLastDayOfWeek();
  }

  static setSaturday(date:Date|Datex): Date {
    return Datex.setLastDayOfWeek(date);
  }

  static getSaturday(date:Date|Datex): Date {
    return Datex.getLastDayOfWeek(date);
  }

  setLastDayOfWeek(): Datex {
    Datex.setLastDayOfWeek(this);
    // this.date.setDate(this.date.getDate() + 6 - this.date.getDay());
    return this;
  }

  getLastDayOfWeek(): Datex {
    return this.clone().setLastDayOfWeek();
    // this.date.setDate(this.date.getDate() + 6 - this.date.getDay());
    // return this;
  }

  static setLastDayOfWeek(date:Date|Datex): Date {
    date.setDate(date.getDate() + 6 - date.getDay());
    return date;
  }

  static getLastDayOfWeek(date:Date|Datex): Date {
    return Datex.setLastDayOfWeek(new Date(date.getTime()));
  }

  setFirstDayOfMonth(): Datex {
    //this.date.setDate(1);
    Datex.setFirstDayOfMonth(this);
    return this;
  }

  getFirstDayOfMonth(): Datex {
    return this.clone().setFirstDayOfMonth();
    // this.date.setDate(1);
    // return this;
  }

  static setFirstDayOfMonth(date:Date|Datex): Date {
    date.setDate(1);
    return date
  }

  static getFirstDayOfMonth(date:Date|Datex): Date {
    return Datex.setFirstDayOfMonth(new Date(date.getTime()));
  }

  setLastDayOfMonth(): Datex {
    Datex.setLastDayOfMonth(this);
    // this.setOffsetMonth(1).date.setDate(0);
    return this;
  }

  getLastDayOfMonth(): Datex {
    return this.clone().setLastDayOfMonth();
    // this.setOffsetMonth(1).date.setDate(0);
    // return this;
  }

  static setLastDayOfMonth(date:Date|Datex): Date {
    Datex.setOffsetMonth(date, 1).setDate(0);
    return date;
  }

  static getLastDayOfMonth(date:Date|Datex): Date {
    return Datex.setLastDayOfMonth(new Date(date.getTime()));
  }

  isLeapYear(): boolean {
    return Datex.isLeapYear(this);
  }

  static isLeapYear(date:Date|Datex): boolean {
    return date.getFullYear() % 4 == 0;
  }

  isSunday() : boolean {
    return Datex.isSunday(this);
  }

  static isSunday(date:Date|Datex) : boolean {
    return date.getDay() == 0;
  }

  isMonday() : boolean {
    return Datex.isMonday(this);
  }

  static isMonday(date:Date|Datex) : boolean {
    return date.getDay() == 1;
  }

  isTuesday() : boolean {
    return Datex.isTuesday(this);
  }

  static isTuesday(date:Date|Datex) : boolean {
    return date.getDay() == 2;
  }

  isWednesday() : boolean {
    return Datex.isWednesday(this);
  }

  static isWednesday(date:Date|Datex) : boolean {
    return date.getDay() == 3;
  }

  isThursday() : boolean {
    return Datex.isThursday(this);
  }

  static isThursday(date:Date|Datex) : boolean {
    return date.getDay() == 4;
  }

  isFriday() : boolean {
    return Datex.isFriday(this);
  }

  static isFriday(date:Date|Datex) : boolean {
    return date.getDay() == 5;
  }

  isSaturday(): boolean{
    return Datex.isSaturday(this);
  }

  static isSaturday(date:Date|Datex): boolean{
    return date.getDay() == 6;
  }


  getMonthRange(durationMonth?:number, doSplitWeek?:boolean): DateRange {
    return Datex.getMonthRange(this, durationMonth, doSplitWeek);
  }

  static getMonthRange(date:Date|Datex, durationMonth?:number, doSplitWeek?:boolean): DateRange {
    durationMonth = durationMonth || 1;
    var result;
    if(durationMonth < 0){
      result = {
        startDate: Datex.setFirstDayOfMonth(Datex.getOffsetMonth(date, durationMonth)),
        endDate: Datex.getLastDayOfMonth(date)
      }
    }else{
      result = {
        startDate: Datex.getFirstDayOfMonth(date),
        endDate: Datex.setLastDayOfMonth(Datex.getOffsetMonth(date, durationMonth-1))
      }
    }

    if(doSplitWeek){
      splitWeek(result);
    }

    return dateRangeWithFunc(result);
  }

  getFullMonthRange(durationMonth?:number, doSplitWeek?:boolean): DateRange{
    return Datex.getFullMonthRange(this, durationMonth, doSplitWeek);
  }

  static getFullMonthRange(date:Date, durationMonth?:number, doSplitWeek?:boolean): DateRange{
    durationMonth = durationMonth || 1;
    var result;
    if(durationMonth < 0){
      result = {
        startDate: Datex.setFirstDayOfWeek(Datex.setFirstDayOfMonth(Datex.getOffsetMonth(date, durationMonth))),
        endDate: Datex.setLastDayOfWeek(Datex.getLastDayOfMonth(date))
      }
    }else{
      result = {
        startDate: Datex.setFirstDayOfWeek(Datex.getFirstDayOfMonth(date)),
        endDate: Datex.setLastDayOfWeek(Datex.setLastDayOfMonth(Datex.getOffsetMonth(date, durationMonth-1)))
      }
    }

    if(doSplitWeek){
      splitWeek(result);
    }

    return dateRangeWithFunc(result);
  }


  static format(date, f="YYYY-MM-DD", lang="en"):string{
  	// return f
    // .replace(/hh/g, ('0' + date.getHours()).substr(-2))
    // .replace(/h/g, date.getHours().toString())
    // .replace(/mm/g, ('0' + date.getMinutes()).substr(-2))
    // .replace(/m/g, date.getMinutes().toString())
    // .replace(/ss/g, ('0' + date.getSeconds()).substr(-2))
    // .replace(/s/g, date.getSeconds().toString())
  	// .replace(/YYYY/g, date.getFullYear().toString())
  	// .replace(/YY/g, (date.getFullYear() % 100).toString())
  	// .replace(/MMMM/g, Datex.getMonthName(date, false, lang))
  	// .replace(/MMM/g, Datex.getMonthName(date, true, lang))
  	// .replace(/MM/g, ('0' + (date.getMonth() + 1)).substr(-2))
  	// .replace(/M/g, (date.getMonth() + 1).toString())
  	// .replace(/DDDD/g, Datex.getDayName(date, false, lang))
  	// .replace(/DDD/g, Datex.getDayName(date, true, lang))
  	// .replace(/DD/g, ('0' + date.getDate()).substr(-2))
  	// .replace(/D/g, date.getDate().toString())

    let list = {}, k = '∼', kc=0;
    function getKey(found){
      return k+(kc++)+k;
    }
    f = f.replace(/hh/g, function(found){
      let key = getKey(found);
      list[key] = ('0' + date.getHours()).substr(-2);
      return key;
    })
    .replace(/h/g, function(found){
      let key = getKey(found);
      list[key] = date.getHours().toString();
      return key;
    })
    .replace(/mm/g, function(found){
      let key = getKey(found);
      list[key] = ('0' + date.getMinutes()).substr(-2)
      return key;
    })
    .replace(/m/g, function(found){
      let key = getKey(found);
      list[key] = date.getMinutes().toString();
      return key;
    })
    .replace(/ss/g, function(found){
      let key = getKey(found);
      list[key] = ('0' + date.getSeconds()).substr(-2);
      return key;
    })
    .replace(/s/g, function(found){
      let key = getKey(found);
      list[key] = date.getSeconds().toString();
      return key;
    })
  	.replace(/YYYY/g, function(found){
      let key = getKey(found);
      list[key] = date.getFullYear().toString();
      return key;
    })
  	.replace(/YY/g, function(found){
      let key = getKey(found);
      list[key] = (date.getFullYear() % 100).toString();
      return key;
    })
  	.replace(/MMMM/g, function(found){
      let key = getKey(found);
      list[key] = Datex.getMonthName(date, false, lang);
      return key;
    })
  	.replace(/MMM/g, function(found){
      let key = getKey(found);
      list[key] = Datex.getMonthName(date, true, lang);
      return key;
    })
  	.replace(/MM/g, function(found){
      let key = getKey(found);
      list[key] = ('0' + (date.getMonth() + 1)).substr(-2);
      return key;
    })
  	.replace(/M/g, function(found){
      let key = getKey(found);
      list[key] = (date.getMonth() + 1).toString();
      return key;
    })
  	.replace(/DDDD/g, function(found){
      let key = getKey(found);
      list[key] = Datex.getDayName(date, false, lang);
      return key;
    })
  	.replace(/DDD/g, function(found){
      let key = getKey(found);
      list[key] = Datex.getDayName(date, true, lang);
      return key;
    })
  	.replace(/DD/g, function(found){
      let key = getKey(found);
      list[key] = ('0' + date.getDate()).substr(-2);
      return key;
    })
  	.replace(/D/g, function(found){
      let key = getKey(found);
      list[key] = date.getDate().toString();
      return key;
    })

    for(let o in list){
      f = f.replace(new RegExp(o, 'g'), list[o]);
    }
    return f;
  }

  format(f?, lang?):string{
    return Datex.format(this, f, lang)
  }

  /////////////////////////////////////////
  /////////////////////////////////////////


}

Date.prototype['toDatex'] = function(){
  return new Datex(this);
}

//new Datex(new Date()).
