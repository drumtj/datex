!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Datex=t():e.Datex=t().default}("undefined"!=typeof self?self:this,function(){return window.Datex=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){var t="function"==typeof Map?new Map:void 0;return(i=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return s(e,arguments,f(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),o(r,e)})(e)}function s(e,t,n){return(s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var a=new(Function.bind.apply(e,r));return n&&o(a,n.prototype),a}).apply(null,arguments)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.r(t),n.d(t,"default",function(){return D});var y={normal:{ko:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},min:{ko:["일","월","화","수","목","금","토"],en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},l={normal:{ko:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],en:["January","February","March","April","May","June","July","August","September","October","November","December"]},min:{ko:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],en:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},c=864e5,g=60*(new Date).getTimezoneOffset()*1e3;function h(e){var t,n,r,a=[];for(t=D.isSunday(e.startDate)?new Date(D.getResetTime(e.startDate.getTime())):D.timereset(D.getFirstDayOfWeek(e.startDate)),r=D.isSaturday(e.endDate)?new Date(D.getResetTime(e.endDate.getTime())):D.timereset(D.getLastDayOfWeek(e.endDate));t<=r;)(n=D.getLastDayOfWeek(t))>r&&(n=r),a.push({startDate:t,endDate:n}),t=D.setFirstDayOfWeek(D.getOffset(t,7));return e.weeks=a,e}function k(e){for(var t=[],n=D.getResetTime(e.startDate.getTime()),r=D.getResetTime(e.endDate.getTime());n<=r;)t.push(n),n+=c;return t}function v(e){return e.toTimeArray=function(){return function(e){if(e.weeks){var t=[];for(var n in e.weeks)t.push(k(e.weeks[n]));return t}return k(e)}.call(null,this)},e.toDateArray=function(){return function(e){if(e.weeks){var t=[];for(var n in e.weeks)t.push(k(e.weeks[n]).map(function(e,t,n){return new Date(e)}));return t}return k(e).map(function(e,t,n){return new Date(e)})}.call(null,this)},e.toDateStringArray=function(){return function(e){if(e.weeks){var t=[];for(var n in e.weeks)t.push(k(e.weeks[n]).map(function(e,t,n){return D.getSimpleDateString(new Date(e))}));return t}return k(e).map(function(e,t,n){return D.getSimpleDateString(new Date(e))})}.call(null,this)},e}var D=function(e){function t(e,n,r,a,i,s,o){var y;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),y=u(this,void 0!==o?f(t).call(this,e,n,r,a,i,s,o):void 0!==s?f(t).call(this,e,n,r,a,i,s):void 0!==i?f(t).call(this,e,n,r,a,i):void 0!==a?f(t).call(this,e,n,r,a):void 0!==r?f(t).call(this,e,n,r):void 0!==n?f(t).call(this,e,n):void 0!==e?f(t).call(this,e):f(t).call(this)),u(y)}var n,r,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(t,i(Date)),n=t,s=[{key:"getDayName",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"en";return y[t?"min":"normal"][n][e.getDay()]}},{key:"getUTCDayName",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"en";return y[t?"min":"normal"][n][e.getUTCDay()]}},{key:"getMonthName",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"en";return l[t?"min":"normal"][n][e.getMonth()]}},{key:"getUTCMonthName",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"en";return l[t?"min":"normal"][n][e.getUTCMonth()]}},{key:"getWeekRange",value:function(e,n,r){var a;return a=n instanceof Date||n instanceof t?{startDate:t.getFirstDayOfMonth(e),endDate:t.getLastDayOfWeek(n)}:(n=n||1)>0?{startDate:t.getFirstDayOfWeek(e),endDate:t.setLastDayOfWeek(t.getOffsetWeek(e,n-1))}:{startDate:t.setFirstDayOfWeek(t.getOffsetWeek(e,n)),endDate:t.getLastDayOfWeek(e)},r&&h(a),v(a)}},{key:"getSimpleDateString",value:function(e){return e.getFullYear()+"-"+("0"+(e.getMonth()+1)).substr(-2)+"-"+("0"+e.getDate()).substr(-2)}},{key:"timereset",value:function(e){return e.setTime(t.getResetTime(e.getTime())),e}},{key:"getResetTime",value:function(e){return Math.floor((e-g)/c)*c+g}},{key:"getWeekCount",value:function(e){var t=new Date(e.getFullYear(),0,1);return Math.ceil(((e.getTime()-t.getTime())/c+t.getDay()+1)/7)}},{key:"setOffset",value:function(e,t){return t?(e.setDate(e.getDate()+t),e):e}},{key:"getOffset",value:function(e,n){return t.setOffset(new Date(e.getTime()),n)}},{key:"setOffsetWeek",value:function(e,n){return n?t.setOffset(e,7*n):e}},{key:"getOffsetWeek",value:function(e,n){return t.getOffset(e,7*n)}},{key:"setOffsetMonth",value:function(e,t){if(!t)return e;var n=12*e.getFullYear()+e.getMonth();return e.setMonth(e.getMonth()+t),12*e.getFullYear()+e.getMonth()-n>t&&e.setDate(0),e}},{key:"getOffsetMonth",value:function(e,n){return t.setOffsetMonth(new Date(e.getTime()),n)}},{key:"setFirstDayOfWeek",value:function(e){return e.setDate(e.getDate()-e.getDay()),e}},{key:"getFirstDayOfWeek",value:function(e){return t.setFirstDayOfWeek(new Date(e.getTime()))}},{key:"setSunday",value:function(e){return t.setFirstDayOfWeek(e)}},{key:"getSunday",value:function(e){return t.getFirstDayOfWeek(e)}},{key:"setMonday",value:function(e){return t.setOffset(t.setFirstDayOfWeek(e),1),e}},{key:"getMonday",value:function(e){return t.setOffset(t.getFirstDayOfWeek(e),1)}},{key:"setTuesday",value:function(e){return t.setOffset(t.setFirstDayOfWeek(e),2),e}},{key:"getTuesday",value:function(e){return t.setOffset(t.getFirstDayOfWeek(e),2)}},{key:"setWednesday",value:function(e){return t.setOffset(t.setFirstDayOfWeek(e),3),e}},{key:"getWednesday",value:function(e){return t.setOffset(t.getFirstDayOfWeek(e),3)}},{key:"setThursday",value:function(e){return t.setOffset(t.setFirstDayOfWeek(e),4),e}},{key:"getThursday",value:function(e){return t.setOffset(t.getFirstDayOfWeek(e),4)}},{key:"setFriday",value:function(e){return t.setOffset(t.setFirstDayOfWeek(e),5),e}},{key:"getFriday",value:function(e){return t.setOffset(t.getFirstDayOfWeek(e),5)}},{key:"setSaturday",value:function(e){return t.setLastDayOfWeek(e)}},{key:"getSaturday",value:function(e){return t.getLastDayOfWeek(e)}},{key:"setLastDayOfWeek",value:function(e){return e.setDate(e.getDate()+6-e.getDay()),e}},{key:"getLastDayOfWeek",value:function(e){return t.setLastDayOfWeek(new Date(e.getTime()))}},{key:"setFirstDayOfMonth",value:function(e){return e.setDate(1),e}},{key:"getFirstDayOfMonth",value:function(e){return t.setFirstDayOfMonth(new Date(e.getTime()))}},{key:"setLastDayOfMonth",value:function(e){return t.setOffsetMonth(e,1).setDate(0),e}},{key:"getLastDayOfMonth",value:function(e){return t.setLastDayOfMonth(new Date(e.getTime()))}},{key:"isLeapYear",value:function(e){return e.getFullYear()%4==0}},{key:"isSunday",value:function(e){return 0==e.getDay()}},{key:"isMonday",value:function(e){return 1==e.getDay()}},{key:"isTuesday",value:function(e){return 2==e.getDay()}},{key:"isWednesday",value:function(e){return 3==e.getDay()}},{key:"isThursday",value:function(e){return 4==e.getDay()}},{key:"isFriday",value:function(e){return 5==e.getDay()}},{key:"isSaturday",value:function(e){return 6==e.getDay()}},{key:"getMonthRange",value:function(e,n,r){var a;return a=(n=n||1)<0?{startDate:t.setFirstDayOfMonth(t.getOffsetMonth(e,n)),endDate:t.getLastDayOfMonth(e)}:{startDate:t.getFirstDayOfMonth(e),endDate:t.setLastDayOfMonth(t.getOffsetMonth(e,n-1))},r&&h(a),v(a)}},{key:"getFullMonthRange",value:function(e,n,r){var a;return a=(n=n||1)<0?{startDate:t.setFirstDayOfWeek(t.setFirstDayOfMonth(t.getOffsetMonth(e,n))),endDate:t.setLastDayOfWeek(t.getLastDayOfMonth(e))}:{startDate:t.setFirstDayOfWeek(t.getFirstDayOfMonth(e)),endDate:t.setLastDayOfWeek(t.setLastDayOfMonth(t.getOffsetMonth(e,n-1)))},r&&h(a),v(a)}},{key:"format",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"en";return n.replace(/hh/g,("0"+e.getHours()).substr(-2)).replace(/h/g,e.getHours().toString()).replace(/mm/g,("0"+e.getMinutes()).substr(-2)).replace(/m/g,e.getMinutes().toString()).replace(/ss/g,("0"+e.getSeconds()).substr(-2)).replace(/s/g,e.getSeconds().toString()).replace(/YYYY/g,e.getFullYear().toString()).replace(/YY/g,(e.getFullYear()%100).toString()).replace(/MMMM/g,t.getMonthName(e,!1,r)).replace(/MMM/g,t.getMonthName(e,!0,r)).replace(/MM/g,("0"+(e.getMonth()+1)).substr(-2)).replace(/M/g,(e.getMonth()+1).toString()).replace(/DDDD/g,t.getDayName(e,!1,r)).replace(/DDD/g,t.getDayName(e,!0,r)).replace(/DD/g,("0"+e.getDate()).substr(-2)).replace(/D/g,e.getDate().toString())}}],(r=[{key:"clone",value:function(){return new t(this)}},{key:"getDayName",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return t.getDayName(this,e,n)}},{key:"getUTCDayName",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return t.getUTCDayName(this,e,n)}},{key:"getMonthName",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return t.getMonthName(this,e,n)}},{key:"getUTCMonthName",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return t.getUTCMonthName(this,e,n)}},{key:"getWeekRange",value:function(e,n){return t.getWeekRange(this,e,n)}},{key:"toSimpleString",value:function(){return t.getSimpleDateString(this)}},{key:"timereset",value:function(){return t.timereset(this),this}},{key:"getWeekCount",value:function(){return t.getWeekCount(this)}},{key:"setOffset",value:function(e){return e?(t.setOffset(this,e),this):this}},{key:"getOffset",value:function(e){return this.clone().setOffset(e)}},{key:"setOffsetWeek",value:function(e){return e?(t.setOffsetWeek(this,e),this):this}},{key:"getOffsetWeek",value:function(e){return this.clone().setOffsetWeek(e)}},{key:"setOffsetMonth",value:function(e){return e?(t.setOffsetMonth(this,e),this):this}},{key:"getOffsetMonth",value:function(e){return this.clone().setOffsetMonth(e)}},{key:"setFirstDayOfWeek",value:function(){return t.setFirstDayOfWeek(this),this}},{key:"getFirstDayOfWeek",value:function(){return this.clone().setFirstDayOfWeek()}},{key:"setSunday",value:function(){return t.setFirstDayOfWeek(this),this}},{key:"getSunday",value:function(){return this.clone().setFirstDayOfWeek()}},{key:"setMonday",value:function(){return t.setMonday(this),this}},{key:"getMonday",value:function(){return this.clone().setMonday()}},{key:"setTuesday",value:function(){return t.setTuesday(this),this}},{key:"getTuesday",value:function(){return this.clone().setTuesday()}},{key:"setWednesday",value:function(){return t.setWednesday(this),this}},{key:"getWednesday",value:function(){return this.clone().setWednesday()}},{key:"setThursday",value:function(){return t.setThursday(this),this}},{key:"getThursday",value:function(){return this.clone().setThursday()}},{key:"setFriday",value:function(){return t.setFriday(this),this}},{key:"getFriday",value:function(){return this.clone().setFriday()}},{key:"setSaturday",value:function(){return t.setLastDayOfWeek(this),this}},{key:"getSaturday",value:function(){return this.clone().setLastDayOfWeek()}},{key:"setLastDayOfWeek",value:function(){return t.setLastDayOfWeek(this),this}},{key:"getLastDayOfWeek",value:function(){return this.clone().setLastDayOfWeek()}},{key:"setFirstDayOfMonth",value:function(){return t.setFirstDayOfMonth(this),this}},{key:"getFirstDayOfMonth",value:function(){return this.clone().setFirstDayOfMonth()}},{key:"setLastDayOfMonth",value:function(){return t.setLastDayOfMonth(this),this}},{key:"getLastDayOfMonth",value:function(){return this.clone().setLastDayOfMonth()}},{key:"isLeapYear",value:function(){return t.isLeapYear(this)}},{key:"isSunday",value:function(){return t.isSunday(this)}},{key:"isMonday",value:function(){return t.isMonday(this)}},{key:"isTuesday",value:function(){return t.isTuesday(this)}},{key:"isWednesday",value:function(){return t.isWednesday(this)}},{key:"isThursday",value:function(){return t.isThursday(this)}},{key:"isFriday",value:function(){return t.isFriday(this)}},{key:"isSaturday",value:function(){return t.isSaturday(this)}},{key:"getMonthRange",value:function(e,n){return t.getMonthRange(this,e,n)}},{key:"getFullMonthRange",value:function(e,n){return t.getFullMonthRange(this,e,n)}},{key:"format",value:function(e,n){return t.format(this,e,n)}}])&&a(n.prototype,r),s&&a(n,s),t}();Date.prototype.toDatex=function(){return new D(this)}}])});
//# sourceMappingURL=datex.js.map