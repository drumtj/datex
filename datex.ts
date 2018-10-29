interface DateRange{
  startDate: Date;
  endDate: Date;
  weeks?: DateRange[];
  toTimeArray?: ()=>number[]|number[][];
  toDateArray?: ()=>Date[]|Date[][];
  toDateStringArray?: ()=>string[]|string[][];
}


class Datex {

  date: Date;
  timezoneOffset: number;
  static daynames = {
    normal:{
      ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    min:{
      ko: ['일', '월', '화', '수', '목', '금', '토'],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  }

  static monthnames = {
    normal:{
      ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    min:{
      ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }

  constructor(date:Date){
    this.date = date;
  }

  static dayms = 1000 * 60 * 60 * 24;
  static timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  clone(): Datex{
    return new Datex(new Date(this.date.getTime()));
  }

  getDayName(min:boolean=false, lang:string="en"): string {
    return Datex.getDayName(this.date, min, lang);
  }

  static getDayName(date:Date, min:boolean=false, lang:string="en"): string {
    return Datex.daynames[min?"min":"normal"][lang][date.getDay()];
  }

  getUTCDayName(min:boolean=false, lang:string="en"): string {
    return Datex.getUTCDayName(this.date, min, lang);
  }

  static getUTCDayName(date:Date, min:boolean=false, lang:string="en"): string {
    return Datex.daynames[min?"min":"normal"][lang][date.getUTCDay()];
  }

  getMonthName(min:boolean=false, lang:string="en"): string {
    return Datex.getMonthName(this.date, min, lang);
  }

  static getMonthName(date:Date, min:boolean=false, lang:string="en"): string {
    return Datex.monthnames[min?"min":"normal"][lang][date.getMonth()];
  }

  getUTCMonthName(min:boolean=false, lang:string="en"): string {
    return Datex.getUTCMonthName(this.date, min, lang);
  }

  static getUTCMonthName(date:Date, min:boolean=false, lang:string="en"): string {
    return Datex.monthnames[min?"min":"normal"][lang][date.getUTCMonth()];
  }

  getWeekRange(durationWeek?:number|Date, splitWeek?:boolean): DateRange {
    return Datex.getWeekRange(this.date, durationWeek, splitWeek);
  }

  static getWeekRange(date:Date, durationWeek?:number|Date, splitWeek?:boolean): DateRange {
    var result;
    if(durationWeek instanceof Date){
      result = {
        startDate: Datex.getFirstDateOfMonth(date),
        endDate: Datex.getLastDateOfWeek(durationWeek)
      }
    }else{
      durationWeek = durationWeek || 1;
      if(durationWeek > 0){
        result = {
          startDate: Datex.getFirstDateOfWeek(date),
          endDate: Datex.setLastDateOfWeek(Datex.getOffsetWeek(date, durationWeek-1))//offset(getLastSunday(date), 6 + (7 * (durationWeek-1)))
        }
      }else{
        result = {
          startDate: Datex.setFirstDateOfWeek(Datex.getOffsetWeek(date, durationWeek)),
          endDate: Datex.getLastDateOfWeek(date)
        }
      }
    }

    if(splitWeek){
      Datex.splitWeek(result);
    }

    return Datex.dateRangeWithFunc(result);
  }

  getMonthRange(durationMonth?:number, splitWeek?:boolean): DateRange {
    return Datex.getMonthRange(this.date, durationMonth, splitWeek);
  }

  static getMonthRange(date:Date, durationMonth?:number, splitWeek?:boolean): DateRange {
    durationMonth = durationMonth || 1;
    var result;
    if(durationMonth < 0){
      result = {
        startDate: Datex.setFirstDateOfMonth(Datex.getOffsetMonth(date, durationMonth)),
        endDate: Datex.getLastDateOfMonth(date)
      }
    }else{
      result = {
        startDate: Datex.getFirstDateOfMonth(date),
        endDate: Datex.setLastDateOfMonth(Datex.getOffsetMonth(date, durationMonth-1))
      }
    }

    if(splitWeek){
      Datex.splitWeek(result);
    }

    return Datex.dateRangeWithFunc(result);
  }

  getFullMonthRange(durationMonth?:number, splitWeek?:boolean): DateRange{
    return Datex.getFullMonthRange(this.date, durationMonth, splitWeek);
  }

  static getFullMonthRange(date:Date, durationMonth?:number, splitWeek?:boolean): DateRange{
    durationMonth = durationMonth || 1;
    var result;
    if(durationMonth < 0){
      result = {
        startDate: Datex.setFirstDateOfWeek(Datex.setFirstDateOfMonth(Datex.getOffsetMonth(date, durationMonth))),
        endDate: Datex.setLastDateOfWeek(Datex.getLastDateOfMonth(date))
      }
    }else{
      result = {
        startDate: Datex.setFirstDateOfWeek(Datex.getFirstDateOfMonth(date)),
        endDate: Datex.setLastDateOfWeek(Datex.setLastDateOfMonth(Datex.getOffsetMonth(date, durationMonth-1)))
      }
    }

    if(splitWeek){
      Datex.splitWeek(result);
    }

    return Datex.dateRangeWithFunc(result);
  }

  static splitWeek(dateRange:DateRange): DateRange {
    var arr = [], t, et, endDate;
    //시간은 초기화날짜만남김
    //한 주가 요일별로 꽉차야하므로 맞춰준다
    if(!Datex.isSunday(dateRange.startDate)){
      t = Datex.timereset(Datex.getFirstDateOfWeek(dateRange.startDate));
    }else{
      t = new Date(Datex.getResetTime(dateRange.startDate.getTime()));
    }
    if(!Datex.isSaturday(dateRange.endDate)){
      endDate = Datex.timereset(Datex.getLastDateOfWeek(dateRange.endDate));
    }else{
      endDate = new Date(Datex.getResetTime(dateRange.endDate.getTime()));
    }

    while(t <= endDate){
      et = Datex.getLastDateOfWeek(t);
      if(et > endDate){
        et = endDate;
      }
      arr.push({
        startDate: t,
        endDate: et
      });
      //t = Datex.getOffset(t, 7);
      t = Datex.setFirstDateOfWeek(Datex.getOffset(t, 7));
    }
    dateRange["weeks"] = arr;
    return dateRange;
  }

  static _getTimeArray(dateRange:DateRange):number[]{
    var arr = [], t = Datex.getResetTime(dateRange.startDate.getTime()), et = Datex.getResetTime(dateRange.endDate.getTime());
    while(t <= et){
      arr.push(t);
      t += Datex.dayms;
    }
    return arr;

  }

  static getTimeArray(dateRange:DateRange):number[]|number[][]{
    if(dateRange.weeks){
      var arr = [];
      for(var o in dateRange.weeks){
        arr.push(Datex._getTimeArray(dateRange.weeks[o]));
      }
      return arr;
    }else{
      return Datex._getTimeArray(dateRange);
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

  static getDateArray(dateRange:DateRange): Date[]|Date[][]{
    if(dateRange.weeks){
      var arr = [];
      for(var o in dateRange.weeks){
        arr.push(Datex._getTimeArray(dateRange.weeks[o]).map(function(v,i,a){
          return new Date(v);
        }));
      }
      return arr;
    }else{
      return Datex._getTimeArray(dateRange).map(function(v,i,a){
        return new Date(v);
      });
    }
  }

  static getDateStringArray(dateRange:DateRange): string[]|string[][]{
    if(dateRange.weeks){
      var arr = [];
      for(var o in dateRange.weeks){
        arr.push(Datex._getTimeArray(dateRange.weeks[o]).map(function(v,i,a){
          return Datex.getSimpleDateString(new Date(v));
        }));
      }
      return arr;
    }else{
      return Datex._getTimeArray(dateRange).map(function(v,i,a){
        return Datex.getSimpleDateString(new Date(v));
      });
    }
  }

  static dateRangeWithFunc(dateRange:DateRange): DateRange {
    dateRange.toTimeArray = function(){
      return Datex.getTimeArray.call(Datex, this);
    };

    dateRange.toDateArray = function(){
      return Datex.getDateArray.call(Datex, this);
    };

    dateRange.toDateStringArray = function(){
      return Datex.getDateStringArray.call(Datex, this);
    };

    return dateRange;
  }

  toSimpleString(): string{
    return Datex.getSimpleDateString(this.date);
  }

  static getSimpleDateString(date:Date): string{
    //아래처럼하면 0시0분에 이전 날짜를 보여주는 오류
    //return d.toJSON().substr(0,10);
    //return [date.getFullYear(), ("0"+(date.getMonth()+1)).substr(-2), ("0"+date.getDate()).substr(-2)].join("-");
    return date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).substr(-2) + '-' + ('0'+date.getDate()).substr(-2);
    //아래처럼하면 00시에 다른날짜,,,
    //return date.toISOString().split('T')[0];
  }



  timereset(): Datex {
    Datex.timereset(this.date);
    return this;
  }

  static timereset(date:Date): Date {
    //Datex.dayms = 1000 * 60 * 60 * 24 //1day time
    //date.setTime(Math.floor((date.getTime() - Datex.timezoneOffset) / Datex.dayms) * Datex.dayms + Datex.timezoneOffset);
    date.setTime(Datex.getResetTime(date.getTime()));
    return date;
  }

  static getResetTime(time:number): number {
    return Math.floor((time - Datex.timezoneOffset) / Datex.dayms) * Datex.dayms + Datex.timezoneOffset;
  }

  getWeekCount(): number {
    return Datex.getWeekCount(this.date);
  }

  static getWeekCount(date:Date): number {
    var first = new Date(date.getFullYear(),0,1);
    // var numday = ((this.date.getTime() - first.getTime()) / dayms);
    return Math.ceil((((date.getTime() - first.getTime()) / Datex.dayms) + first.getDay()+1) / 7);
  }

  setOffset(day:number): Datex {
    if(!day) return this;
    Datex.setOffset(this.date, day);
    return this;
    //return this.setDate(this.date.getDate() + day);
  }

  getOffset(day:number): Datex {
    return this.clone().setOffset(day);
    // if(!day) return this.clone();
    // this.date.setDate(this.date.getDate() + day);
    // return this.clone().setDate(this.date.getDate() + day);
  }

  static setOffset(date:Date, day:number): Date {
    if(!day) return date;
    date.setDate(date.getDate() + day);
    return date;
  }

  static getOffset(date:Date, day:number): Date {
    return Datex.setOffset(new Date(date.getTime()), day);
  }

  setOffsetWeek(week:number): Datex {
    if(!week) return this;
    Datex.setOffsetWeek(this.date, week);
    return this;
  }

  getOffsetWeek(week:number): Datex {
    return this.clone().setOffsetWeek(week);
    // if(!week) return this;
    // return this.getOffset(week * 7);
  }

  static setOffsetWeek(date:Date, week:number): Date {
    if(!week) return date;
    return Datex.setOffset(date, week * 7);
  }

  static getOffsetWeek(date:Date, week:number): Date {
    return Datex.getOffset(date, week * 7);
  }

  setOffsetMonth(month:number): Datex {
    if(!month) return this;
    Datex.setOffsetMonth(this.date, month);
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

  static setOffsetMonth(date:Date, month:number): Date {
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

  static getOffsetMonth(date:Date, month:number): Date {
    return Datex.setOffsetMonth(new Date(date.getTime()), month);
  }

  setFirstDateOfWeek(): Datex {
    // this.date.setDate(this.date.getDate() - this.date.getDay());
    Datex.setFirstDateOfWeek(this.date);
    return this;
  }

  getFirstDateOfWeek(): Datex {
    return this.clone().setFirstDateOfWeek();
    // this.date.setDate(this.date.getDate() - this.date.getDay());
    // return this;
  }

  static setFirstDateOfWeek(date:Date): Date {
    date.setDate(date.getDate() - date.getDay());
    return date;
  }

  static getFirstDateOfWeek(date:Date): Date {
    return Datex.setFirstDateOfWeek(new Date(date.getTime()));
  }

  setLastDateOfWeek(): Datex {
    Datex.setLastDateOfWeek(this.date);
    // this.date.setDate(this.date.getDate() + 6 - this.date.getDay());
    return this;
  }

  getLastDateOfWeek(): Datex {
    return this.clone().setLastDateOfWeek();
    // this.date.setDate(this.date.getDate() + 6 - this.date.getDay());
    // return this;
  }

  static setLastDateOfWeek(date:Date): Date {
    date.setDate(date.getDate() + 6 - date.getDay());
    return date;
  }

  static getLastDateOfWeek(date:Date): Date {
    return Datex.setLastDateOfWeek(new Date(date.getTime()));
  }

  setFirstDateOfMonth(): Datex {
    //this.date.setDate(1);
    Datex.setFirstDateOfMonth(this.date);
    return this;
  }

  getFirstDateOfMonth(): Datex {
    return this.clone().setFirstDateOfMonth();
    // this.date.setDate(1);
    // return this;
  }

  static setFirstDateOfMonth(date:Date): Date {
    date.setDate(1);
    return date
  }

  static getFirstDateOfMonth(date:Date): Date {
    return Datex.setFirstDateOfMonth(new Date(date.getTime()));
  }

  setLastDateOfMonth(): Datex {
    Datex.setLastDateOfMonth(this.date);
    // this.setOffsetMonth(1).date.setDate(0);
    return this;
  }

  getLastDateOfMonth(): Datex {
    return this.clone().setLastDateOfMonth();
    // this.setOffsetMonth(1).date.setDate(0);
    // return this;
  }

  static setLastDateOfMonth(date:Date): Date {
    Datex.setOffsetMonth(date, 1).setDate(0);
    return date;
  }

  static getLastDateOfMonth(date:Date): Date {
    return Datex.setLastDateOfMonth(new Date(date.getTime()));
  }

  isLeapYear(): boolean {
    return Datex.isLeapYear(this.date);
  }

  static isLeapYear(date:Date): boolean {
    return date.getFullYear() % 4 == 0;
  }

  isSunday() : boolean {
    return Datex.isSunday(this.date);
  }

  static isSunday(date:Date) : boolean {
    return date.getDay() == 0;
  }

  isMonday() : boolean {
    return Datex.isMonday(this.date);
  }

  static isMonday(date:Date) : boolean {
    return date.getDay() == 1;
  }

  isTuesday() : boolean {
    return Datex.isTuesday(this.date);
  }

  static isTuesday(date:Date) : boolean {
    return date.getDay() == 2;
  }

  isWednesday() : boolean {
    return Datex.isWednesday(this.date);
  }

  static isWednesday(date:Date) : boolean {
    return date.getDay() == 3;
  }

  isThursday() : boolean {
    return Datex.isThursday(this.date);
  }

  static isThursday(date:Date) : boolean {
    return date.getDay() == 4;
  }

  isFriday() : boolean {
    return Datex.isFriday(this.date);
  }

  static isFriday(date:Date) : boolean {
    return date.getDay() == 5;
  }

  isSaturday(): boolean{
    return Datex.isSaturday(this.date);
  }

  static isSaturday(date:Date): boolean{
    return date.getDay() == 6;
  }

  /////////////////////////////////////////
  /////////////////////////////////////////

  getDate(): number {
    return this.date.getDate();
  }
  getDay(): number {
    return this.date.getDay();
  }
  getFullYear(): number {
    return this.date.getFullYear();
  }
  getHours(): number {
    return this.date.getHours();
  }
  getMilliseconds(): number {
    return this.date.getMilliseconds();
  }
  getMinutes(): number {
    return this.date.getMinutes();
  }
  getMonth(): number {
    return this.date.getMonth();
  }
  getSeconds(): number {
    return this.date.getSeconds();
  }
  getTime(): number {
    return this.date.getTime();
  }
  getTimezoneOffset(): number {
    return this.date.getTimezoneOffset();
  }
  getUTCDate(): number {
    return this.date.getUTCDate();
  }
  getUTCDay(): number {
    return this.date.getUTCDay();
  }
  getUTCFullYear(): number {
    return this.date.getUTCFullYear();
  }
  getUTCHours(): number {
    return this.date.getUTCHours();
  }
  getUTCMilliseconds(): number {
    return this.date.getUTCMilliseconds();
  }
  getUTCMinutes(): number {
    return this.date.getUTCMinutes();
  }
  getUTCMonth(): number {
    return this.date.getUTCMonth();
  }
  getUTCSeconds(): number {
    return this.date.getUTCSeconds();
  }
  setDate(date: number): Datex {
    this.date.setDate.apply(arguments);
    return this;
  }
  setFullYear(year: number, month?: number, date?: number): Datex {
    this.date.setFullYear.apply(arguments);
    return this;
  }
  setHours(hours: number, min?: number, sec?: number, ms?: number): Datex {
    this.date.setHours.apply(arguments);
    return this;
  }
  setMilliseconds(ms: number): Datex {
    this.date.setMilliseconds.apply(arguments);
    return this;
  }
  setMinutes(min: number, sec?: number, ms?: number): Datex {
    this.date.setMinutes.apply(arguments);
    return this;
  }
  setMonth(month: number, date?: number): Datex {
    this.date.setMonth.apply(arguments);
    return this;
  }
  setSeconds(sec: number, ms?: number): Datex {
    this.date.setSeconds.apply(arguments);
    return this;
  }
  setTime(time: number): Datex {
    this.date.setTime.apply(arguments);
    return this;
  }
  setUTCDate(date: number): Datex {
    this.date.setUTCDate.apply(arguments);
    return this;
  }
  setUTCFullYear(year: number, month?: number, date?: number): Datex {
    this.date.setUTCFullYear.apply(arguments);
    return this;
  }
  setUTCHours(hours: number, min?: number, sec?: number, ms?: number): Datex {
    this.date.setUTCHours.apply(arguments);
    return this;
  }
  setUTCMilliseconds(ms: number): Datex {
    this.date.setUTCMilliseconds.apply(arguments);
    return this;
  }
  setUTCMinutes(min: number, sec?: number, ms?: number): Datex{
    this.date.setUTCMinutes.apply(arguments);
    return this;
  }
  setUTCMonth(month: number, date?: number): Datex{
    this.date.setUTCMonth.apply(arguments);
    return this;
  }
  setUTCSeconds(sec: number, ms?: number): Datex {
    this.date.setUTCSeconds.apply(arguments);
    return this;
  }
  toDateString(){
    return this.date.toDateString();
  }
  toISOString(){
    return this.date.toISOString();
  }
  toJSON(key?: any){
    return this.date.toJSON(key);
  }
  toLocaleDateString(){
    return this.date.toLocaleDateString();
  }
  toLocaleString(){
    return this.date.toLocaleString();
  }
  toLocaleTimeString(){
    return this.date.toLocaleTimeString();
  }
  toString(){
    return this.date.toString();
  }
  toTimeString(){
    return this.date.toTimeString();
  }
  toUTCString(){
    return this.date.toUTCString();
  }
  valueOf(){
    return this.date.valueOf();
  }
}

Date.prototype['toDatex'] = function(){
  return new Datex(this);
}

//new Datex(new Date()).
