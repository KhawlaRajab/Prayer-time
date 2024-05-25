"use strict";

const cityName=document.querySelector('.city');
const Datee =document.querySelector('.date');
const cardsContainer=document.querySelector('.container');
const select = document.querySelector('.cityOptions');

const cities = [
     {
        ar: 'جنين',
        en:'Jenin'
    },
    {
        ar: 'طولكرم',
        en:'Tulkarm'
    },
    {
        ar: 'رام الله',
        en:'Ramallah'
    },{
        ar: 'نابلس',
        en:'Nablus'
    },

];

//make options
cities.forEach(function (op) {
    select.insertAdjacentHTML('afterbegin', `<option value='${op.ar}'>${op.ar}</option>`);
});

//choose City
let City;
select.addEventListener('change', function (e) {
    cityName.innerHTML = select.value;
    City = select.value;
    cities.forEach(function (c) {
        if (City === c.ar)
            City = c.en;
    })
    prayerTime(City);
})
    



//Date
const datee = new Date();
Datee.innerHTML = datee;
const month = datee.getMonth();
const year = datee.getFullYear();
const day = datee.getDate();

// console.log(datee, day, month, year);





//fetch api
const prayerTime = function (City) {
    const request = fetch(`http://api.aladhan.com/v1/calendarByCity/${year}/${month + 1}?city=${City}&country=Palestine=2`);
    request.then(function (response) {
        return response.json();
    }).then(function (res) {
        console.log(res);
        const timeData = res.data[day-1].timings;
        Datee.innerHTML = `${res.data[day - 1].date.readable +" " +res.data[day - 1].date.hijri.weekday.ar }`; 
//         const html = ` <div class="pray">
//     <div class="name">العشاء</div>
//     <div class="time">${timeData.Isha}</div>
// </div>
// <div class="pray">
//     <div class="name">المغرب</div>
//     <div class="time">${timeData.Maghrib}</div>
// </div>
// <div class="pray">
//     <div class="name">العصر</div>
//     <div class="time">${timeData.Asr}</div>
// </div>
// <div class="pray">
//     <div class="name">الظهر</div>
//     <div class="time">${timeData.Dhuhr}</div>
// </div>
// <div class="pray">
//     <div class="name">الشروق</div>
//     <div class="time">${timeData.Sunrise}</div>
// </div>
// <div class="pray">
//     <div class="name">الفجر</div>
//     <div class="time">${timeData.Fajr}</div>
// </div>`;
        //         cardsContainer.insertAdjacentHTML('afterbegin', html);
        document.querySelector('.isha').innerHTML = timeData.Isha;
        document.querySelector('.maghrib').innerHTML = timeData.Maghrib;
        document.querySelector('.asr').innerHTML = timeData.Asr;
        document.querySelector('.dhuhr').innerHTML = timeData.Dhuhr;
        document.querySelector('.sunrise').innerHTML = timeData.Sunrise;
        document.querySelector('.fajr').innerHTML = timeData.Fajr;
    })
};

prayerTime('Jenin');

