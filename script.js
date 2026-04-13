// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Koa", weight: 70, happiness: 70, energy: 70 };


// Makes sure that your function is called once all the DOM elements of the page are ready to be used.
$(function () { 

	// Called function to update the name, happiness, and weight of our pet in our HTML
	checkAndUpdatePetInfoInHtml();

	// When each button is clicked, it will "call" function for that button (functions are below)
	$('.treat-button').click(clickedTreatButton);
	$('.play-button').click(clickedPlayButton);
	$('.exercise-button').click(clickedExerciseButton);

	// nap button 
	$('.nap-button').click(clickedNapButton);
})


function clickedTreatButton() {
	// Increase pet happiness
	pet_info.happiness += 10;

	// Increase pet weight
	pet_info.weight += 10;
	checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
	// Increase pet happiness
	pet_info.happiness += 10;

	// Decrease pet weight
	pet_info.weight -= 10;

	// lower energy level
	pet_info.energy -= 10;
	checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
	// Decrease pet happiness
	pet_info.happiness -= 10;
	// Decrease pet weight
	pet_info.weight -= 10;
	// lower energy 
	pet_info.energy -= 10;
	checkAndUpdatePetInfoInHtml();
}

function clickedNapButton(){
	// disable other buttons for 5sec
	const nap_duration = 3000; 
	disableButtons(true);
	
	setTimeout( function() {
		// increase happiness
		pet_info.happiness += 10;
		// increase energy 
		pet_info.energy += 30;

		disableButtons(false);
		checkAndUpdatePetInfoInHtml();
	}, nap_duration);

	// function to disable buttons when nap is clicked
	function disableButtons(disable){
		const actionButtons = $('.treat-button, .play-button, .exercise-button');
		actionButtons.prop('disabled', disable);
		actionButtons.css("background-color", disable ? "gray" : "");
	}
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
	// adding conditional to not exceed 100
	if(pet_info.happiness >= 100){
		pet_info.happiness = 100;
	}
}

function checkEnergyLevel(){
	// check energy level, cannot go over 100, cannot be less than 0
	if(pet_info.energy >= 100){
		pet_info.energy = 100;
	}
	if(pet_info.energy <= 0){
		pet_info.energy = 0;
	}
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
	$('.name').text(pet_info['name']);
	$('.weight').text(pet_info['weight']);
	$('.happiness').text(pet_info['happiness']);
	$('.energy').text(pet_info.energy);
}
