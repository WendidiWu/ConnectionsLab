// reload the page until it shows up
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

document.addEventListener('DOMContentLoaded', function(){
    //button allows to go from the start page to the news page
    let button = document.getElementById('go_button');
    
    //store the input value for name, month, date, year
    if(button){
        button.addEventListener('click', function(){
            let inputName = document.getElementById('name').value;
            let inputMonth = document.getElementById('month').value;
            let inputDate = document.getElementById('date').value;
            let inputYear = parseInt(document.getElementById('year').value);
        
            localStorage.setItem('name', inputName);
            localStorage.setItem('month', inputMonth);
            localStorage.setItem('date', inputDate);
            localStorage.setItem('year', inputYear);
            
            window.location.href = 'index.html';
        });
        
    }
    
    //get the input value for name, month, date, year
    let inputName = localStorage.getItem('name');
    let inputMonth = localStorage.getItem('month');
    let inputDate = localStorage.getItem('date');
    let inputYear = localStorage.getItem('year');

    //present the input date on the news page
    let userDate = document.getElementById('your_day');
    userDate.innerHTML = inputMonth +"/" + inputDate + "/" + inputYear;

    //create the link for the dataset
    let API_URL = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/" + inputMonth + '/' + inputDate;
   
    //fetch the data
    fetchDataWithRetry(API_URL)
    .then(data => {
        console.log('Data fetched successfully:', data);

        //Big Events
        let events = data.events;

        //create 5 events with event year, event heading, event paragraph, event image
        for (let i = 0; i < 5; i++) {
            let eventYear = document.getElementById(`event_year_${i+1}`);
            let eventHeading = document.getElementById(`event_heading_${i+1}`);
            let eventPara = document.getElementById(`event_para_${i+1}`);
            let eventImage = document.getElementById(`event_image_${i+1}`);
            
            //divide the events list by 5 and take the index for 1/5, 2/5, 3/5, 4/5, 5/5
            let eventIndex = Math.floor(events.length / 5 * i);
        
            //assign the values
            eventYear.innerHTML = events[eventIndex].year;
            eventHeading.innerHTML = events[eventIndex].text;
            eventPara.innerHTML = events[eventIndex].pages[0].extract_html;
        
            //check if the image source exists
            if (events[eventIndex].pages[0].thumbnail && events[eventIndex].pages[0].thumbnail.source) {
                eventImage.src = events[eventIndex].pages[0].thumbnail.source;
            } else {
                eventImage.src = './assets/image_placeholder.jpeg'; //set a placeholder if no image exists
            }
        }

        // Holidays
        let holidays = data.holidays;

        //create 6 holidays with holiday heading
        for (let i = 0; i < 6; i++) {
            let holidayHeading = document.getElementById(`holiday_heading_${i+1}`);
            
            //divide the events list by 6 and take the index for 1/6, 2/6, 3/6, 4/6, 5/6, 6/6
            let holidayIndex = Math.floor(holidays.length/6*i);
        
            //assign the values
            holidayHeading.innerHTML = holidays[holidayIndex].text;
        }


        //Births

        //take the user inputs and create a user birthday section 
        //get the user's year
        let userYear = document.getElementById('birth_year_user');
        userYear.innerHTML = inputYear;

        //get the user's name
        let userName = document.getElementById('birth_heading_user');
        userName.innerHTML = inputName + ", a warm-hearted Earth Citizen";

        //create the user's paragraph with the user's name
        let userPara = document.getElementById('birth_para_user');
        userPara.innerHTML = inputName + " is a passionate global citizen dedicated to making a positive impact in the world. With a deep appreciation for diverse cultures and a strong commitment to sustainability, this individual embodies the spirit of compassion and unity. Known for their kindness, resilience, and creativity, they strive to connect people from all walks of life, inspiring others to embrace their shared humanity. Their journey reflects a belief that, together, we can create a brighter future for all.";

        //create a birthday section from the dataset
        let births = data.births;

        //compare the year with the user's year and get the closets one
        births.sort((a, b) => {
            return Math.abs(a.year - inputYear) - Math.abs(b.year - inputYear);
        });

        //assign the value
        let birthYear1 = document.getElementById('birth_year_1');
        birthYear1.innerHTML = births[0].year;

        let birthHeading1 = document.getElementById('birth_heading_1');
        birthHeading1.innerHTML = births[0].text;

        let birthPara1 = document.getElementById('birth_para_1');
        birthPara1.innerHTML =births[0].pages[0].extract_html;

        let birthImage1 = document.getElementById('birth_image_1');
        if (births[0].pages[0].thumbnail && births[0].pages[0].thumbnail.source) {
            birthImage1.src = births[0].pages[0].thumbnail.source;
        } else {
            birthImage1.src = './assets/user_image_placeholder.jpeg'; //set a placeholder if no image exists
        }

        //create a button to go back to the start page
        let back = document.getElementById('back_button');
        back.addEventListener('click', function(){
        window.location.href = 'startPage.html';
        })
    })
})
   
/* --- p5 Code ---*/
function setup(){
    createCanvas(560,200);
}

function draw() {
    background(255, 140, 0);

    let eyeY = height / 2;

    let leftX = width / 2 - 75;
    let rightX = width / 2 + 75;

    // Left eye
    noStroke();
    angleMode(DEGREES);
    let leftAngle = atan2(mouseY - eyeY, mouseX - leftX);

    push();
    translate(leftX, eyeY);
    fill(251, 245, 240);
    ellipse(0, 0, 100, 100);
    rotate(leftAngle);
    fill(0);
    ellipse(27, 0, 40, 40);
    pop();

    // Right eye
    let rightAngle = atan2(mouseY - eyeY, mouseX - rightX);

    push();
    translate(rightX, eyeY);
    fill(251, 245, 240);
    ellipse(0, 0, 100, 100);
    rotate(rightAngle);
    fill(0);
    ellipse(27, 0, 40, 40);  
    pop();
}


