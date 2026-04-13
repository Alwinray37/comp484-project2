// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Koa", weight: 70, happiness: 7, energy: 7 };

// global variables
let pet_message = $('.pet-message');
let treatBtn = $('.treat-button');
let playBtn = $('.play-button');
let exerciseBtn = $('.exercise-button');
let napBtn = $('.nap-button');
let jokeBtn = $('.joke-button');

// Makes sure that your function is called once all the DOM elements of the page are ready to be used.
$(function () { 
	// When each button is clicked, it will "call" function for that button (functions are below)
	treatBtn.click(clickedTreatButton);
	playBtn.click(clickedPlayButton);
	exerciseBtn.click(clickedExerciseButton);
	napBtn.click(clickedNapButton);
	jokeBtn.click(clickedJokeButton);
	// creating the boxes for status bars
	setBoxes();
	// Called function to update the name, happiness, and weight of our pet in our HTML
	checkAndUpdatePetInfoInHtml();
})
// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
	$('.name').text(pet_info['name']);
	$('.weight').text(pet_info['weight']);
	$('.happiness').text(pet_info['happiness']);
	$('.energy').text(pet_info.energy);

	// updates to status
	updateHappinessBar();
	updateEnergyBar();
}
function checkAndUpdatePetInfoInHtml() {
	checkWeightAndHappinessBeforeUpdating();
	checkEnergyLevel();
	updatePetInfoInHtml();
	// debug
	console.log(pet_info);
}
function checkWeightAndHappinessBeforeUpdating() {
	// Add conditional so if weight and happiness is lower than zero.
	if(pet_info.happiness <= 0){
		pet_info.happiness = 0;
	}
	if(pet_info.weight <= 0){
		pet_info.weight = 0;
	}
	// adding conditional to not exceed 10
	if(pet_info.happiness >= 10){
		pet_info.happiness = 10;
	}
}
function checkEnergyLevel(){
	// check energy level, cannot go over 10, cannot be less than 0
	if(pet_info.energy >= 10){
		pet_info.energy = 10;
	}
	if(pet_info.energy <= 0){
		pet_info.energy = 0;
	}
	if(pet_info.energy == 0){
		pet_message.text("I'm too tired...");
		disableButtons(true);
	}
}

// Button functions ==============================
function clickedTreatButton() {
	// Increase pet happiness
	pet_info.happiness += 1;

	// Increase pet weight
	pet_info.weight += 1;

	// update pet message
	pet_message.text("Yummy!");
	
	checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
	// Increase pet happiness
	pet_info.happiness += 1;

	// Decrease pet weight
	pet_info.weight -= 1;

	// lower energy level
	pet_info.energy -= 1;

	// update pet message
	pet_message.text("Woof! Let's play!");

	checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
	// Decrease pet happiness
	pet_info.happiness -= 1;
	// Decrease pet weight
	pet_info.weight -= 1;
	// lower energy level
	pet_info.energy -= 1;

	// update pet message
	pet_message.text("Pant... Pant...");

	checkAndUpdatePetInfoInHtml();
}

function clickedNapButton(){
	// disable other buttons for 5sec
	const nap_duration = 3000; 
	disableButtons(true);
	
	// update pet message
	pet_message.text("Zzz...");

	setTimeout( function() {
		// increase happiness
		pet_info.happiness += 1;
		// increase energy 
		pet_info.energy += 3;

		disableButtons(false);
		// update pet message
		pet_message.text("I feel refreshed!");

		checkAndUpdatePetInfoInHtml();
	}, nap_duration);
}
function clickedJokeButton(){
	fetch("https://official-joke-api.appspot.com/random_joke")
		.then(response => response.json())
		.then(data => {
			pet_message.text(data.setup + " ... " + data.punchline);
		}
	).catch( () => {
		pet_message.text("No jokes right now :(");
	});
}

// helper functions ================================
// function to disable buttons when nap is clicked, or energy is 0
function disableButtons(disable){
	const actionButtons = $('.treat-button, .play-button, .exercise-button, .joke-button');
	actionButtons.prop('disabled', disable);
	actionButtons.css("background-color", disable ? "gray" : "");
}

// initialize the boxes for the status bars
function setBoxes(){
	for(let i=0; i < 10; i++){
		let $box = $("<div class='box'></div>");
		$("#happiness-bar-cont").append($box);
		$("#energy-bar-cont").append($box.clone());
	}
}

function updateHappinessBar(){
	// 4 is red, above four is green
	$("#happiness-bar-cont .box").each(function(index){
		$(this).removeClass("box-fill-green box-fill-red");

		if(index < pet_info.happiness && pet_info.happiness <= 4){
			$(this).addClass("box-fill-red");
		} 
		else if(index < pet_info.happiness && pet_info.happiness > 4){
			$(this).addClass("box-fill-green");
		}
	});
}

function updateEnergyBar(){
	// four is red, above four is green
	$("#energy-bar-cont .box").each(function(index){
		$(this).removeClass("box-fill-green box-fill-red");

		if(index < pet_info.energy && pet_info.energy <= 4){
			$(this).addClass("box-fill-red");
		} 
		else if(index < pet_info.energy && pet_info.energy > 4){
			$(this).addClass("box-fill-green");
		}
	});
}
