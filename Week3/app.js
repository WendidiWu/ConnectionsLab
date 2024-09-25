function fetchDataWithRetry(url, retries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (attempt) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // or response.text()
                })
                .then(data => resolve(data))
                .catch(error => {
                    if (attempt < retries) {
                        console.log(`Attempt ${attempt + 1} failed. Retrying...`);
                        setTimeout(() => attemptFetch(attempt + 1), delay);
                    } else {
                        reject(`Failed after ${retries} attempts: ${error.message}`);
                    }
                });
        };

        attemptFetch(0);
    });
}


let button = document.getElementById('go_button');

button.addEventListener('click', function(){
    let inputMonth = document.getElementById("month").value;
    let inputDate = document.getElementById('date').value;
    let inputYear = parseInt(document.getElementById('year').value);
    let API_URL = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/" + inputMonth + '/' + inputDate;

    fetchDataWithRetry(API_URL)
    .then(data => {
        console.log('Data fetched successfully:', data);

        //Events
        let events = data.events;
        //event 1
        let eventYear1 = document.getElementById('event_year_1');
        eventYear1.innerHTML = events[0].year;

        let eventHeading1 = document.getElementById('event_heading_1');
        eventHeading1.innerHTML = events[0].text;

        let eventPara1 = document.getElementById('event_para_1');
        eventPara1.innerHTML =events[0].pages[0].extract_html;

        let eventImage1 = document.getElementById('event_image_1');
        eventImage1.src = events[0].pages[0].thumbnail.source;

        //event 2
        let eventYear2 = document.getElementById('event_year_2');
        eventYear2.innerHTML = events[Math.floor(events.length/5)].year;

        let eventHeading2 = document.getElementById('event_heading_2');
        eventHeading2.innerHTML = events[Math.floor(events.length/5)].text;

        let eventPara2 = document.getElementById('event_para_2');
        eventPara2.innerHTML =events[Math.floor(events.length/5)].pages[0].extract_html;

        let eventImage2 = document.getElementById('event_image_2');
        eventImage2.src = events[Math.floor(events.length/5)].pages[0].thumbnail.source;

        //event 3
        let eventYear3 = document.getElementById('event_year_3');
        eventYear3.innerHTML = events[Math.floor(events.length/5*2)].year;

        let eventHeading3 = document.getElementById('event_heading_3');
        eventHeading3.innerHTML = events[Math.floor(events.length/5*2)].text;

        let eventPara3 = document.getElementById('event_para_3');
        eventPara3.innerHTML =events[Math.floor(events.length/5*2)].pages[0].extract_html;

        let eventImage3 = document.getElementById('event_image_3');
        eventImage3.src = events[Math.floor(events.length/5*2)].pages[0].thumbnail.source;

        //event 4
        let eventYear4 = document.getElementById('event_year_4');
        eventYear4.innerHTML = events[Math.floor(events.length/5*3)].year;

        let eventHeading4 = document.getElementById('event_heading_4');
        eventHeading4.innerHTML = events[Math.floor(events.length/5*3)].text;

        let eventPara4 = document.getElementById('event_para_4');
        eventPara4.innerHTML =events[Math.floor(events.length/5*3)].pages[0].extract_html;

        let eventImage4 = document.getElementById('event_image_4');
        eventImage4.src = events[Math.floor(events.length/5*3)].pages[0].thumbnail.source;

        //event 5
        let eventYear5 = document.getElementById('event_year_5');
        eventYear5.innerHTML = events[events.length/5*4].year;

        let eventHeading5 = document.getElementById('event_heading_5');
        eventHeading5.innerHTML = events[events.length/5*4].text;
 
        let eventPara5 = document.getElementById('event_para_5');
        eventPara5.innerHTML =events[events.length/5*4].pages[0].extract_html;

        let eventImage5 = document.getElementById('event_image_5');
        eventImage5.src = events[events.length/5*4].pages[0].thumbnail.source;


        //Holidays
        let holidays = data.holidays;

        let holidayHeading1 = document.getElementById('holiday_heading_1');
        holidayHeading1.innerHTML = holidays[0].text;

        let holidayHeading2 = document.getElementById('holiday_heading_2');
        holidayHeading2.innerHTML = holidays[holidays.length - 1].text;

        let holidayHeading3 = document.getElementById('holiday_heading_3');
        holidayHeading3.innerHTML = holidays[Math.floor(holidays.length/2)].text;


        //Births
        let births = data.births;
        births.sort((a, b) => {
            return Math.abs(a.year - inputYear) - Math.abs(b.year - inputYear);
        });

        let birthYear1 = document.getElementById('birth_year_1');
        birthYear1.innerHTML = births[0].year;

        let birthHeading1 = document.getElementById('birth_heading_1');
        birthHeading1.innerHTML = births[0].text;

        let birthPara1 = document.getElementById('birth_para_1');
        birthPara1.innerHTML =births[0].pages[0].extract_html;

        let birthImage1 = document.getElementById('birth_image_1');
        birthImage1.src = births[0].pages[0].thumbnail.source;



       

    })
    
    
    .catch(error => {
        console.error('Error fetching data:', error);
    });












    // let API_URL = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/" + inputMonth + '/' + inputDate;
    // fetch(API_URL)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })

})






// //input month
// const select_month = document.getElementById('month')

// for(let i =1; i<=12; i++){
//     let option = document.createElement('option')
//     let value = i;
//     option.value = value;
//     option.text = value;
//     select_month.appendChild(option); 
// }

// //input date
// const select_date = document.getElementById('date')

// for(let i =1; i<=31; i++){
//     let option = document.createElement('option')
//     let value = i;
//     option.value = value;
//     option.text = value;
//     select_date.appendChild(option); 
// }

