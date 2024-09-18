//steps
//1. identify and select the buttons
let rightbutton;
rightbutton = document.getElementById('right_arrow');

let leftbutton;
leftbutton = document.getElementById('left_arrow');

//2. identify sentence1, sentence2, image1, and image2 sections
let sentence1 = document.getElementById('sentence1');
let sentence2 = document.getElementById('sentence2');

let image1 = document.getElementById('sleep_dragon');
let image2 = document.getElementById('hunt_dragon');

//3. hide sentence2 and image2 first
sentence2.style.display = 'none';
image2.style.display ='none';

//4. listen to event click on the button
rightbutton.addEventListener("click", nextStage);
leftbutton.addEventListener("click", previousStage);

//5. show sentence2 and image2 instead of sentence1 and image1
function nextStage(){
    sentence1.style.display = 'none';
    sentence2.style.display = 'block';

    image1.style.display = 'none';
    image2.style.display = 'block'; 
}

//6. show sentence1 and image1 instead of sentence2 and image2 
function previousStage(){
    sentence2.style.display = 'none';
    sentence1.style.display = 'block';

    image2.style.display = 'none';
    image1.style.display = 'block';
}

//ZZZ steps
//1. identify the zzz
let zzzContainer =document.getElementById('zzz_container');

//2. listen to event mouseover and mouseout on image1
image1.addEventListener('mouseover', showText);
image1.addEventListener('mouseout', hideText);

//3. show zzz
function showText(){
    zzzContainer.style.display='block';
}

//4. hide zzz
function hideText(){
    zzzContainer.style.display ='none';
}