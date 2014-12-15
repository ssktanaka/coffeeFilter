function validateName() {
	//get value of inputName id
	var value = document.getElementById("inputName").value;
	var name_regex = /^[a-z,š,á,é,í,ó,ú,â,ê,ô,ã‌​,õ,ç,à,è,ì,ò,ñ,ă,č,ï,ù,č,ć,đ,š,ž, ,.'-]+$/;
	//change value to lowercase
	value = value.toLowerCase();	
	//if value matches name_regex, clear "error" div and return true. else, prompt user for valid input.
	if (name_regex.test(value)){
		clearNameError(value);
		return true;
	} else if (!isNaN((parseFloat(value) || parseInt(value)))) {
		promptValidName();
		return false;
	} else {
		promptName();
		return false;
	}
}

function validateEmail() {
	var value = document.getElementById("inputEmail").value;
	var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//change value to lowercase
	value = value.toLowerCase();
	//if value matches email_regex, clear "error" div and return true. else, prompt user for valid email.
	if (email_regex.test(value)){
		clearEmailError();
		return true;
	} else {
		promptEmail();
		return false;
	} 
}

function validateSubject() {
	//get value of subject field
	var subjectField = document.getElementById("inputSubject").selectedIndex;
	//if the user has selected a subject, return true. else, return false.
	if (subjectField !== 0) {
		return true;
	} else {
		return false;
	}
}

function validateMessage() {
	//get value of message field
	var messageField = document.getElementById("inputMessage").value;
	//if the user has entered a message, return true. else, return false.
	if (messageField != "") {
		return true;
	} else {
		return false;
	}
}

function validateFields() {
	//if email, name, subject, and message fields are all valid, call send function and return true.
	//else, prompt user for entries. 
	if (validateEmail() && validateName() && validateSubject() && validateMessage()) {
		send();
		return true;
	} else {
		promptEntries();
		validateName();
		validateEmail();
		return false;
	}
}

//name functions
function promptValidName(){
	//if user enters numbers, display error and prompt for a valid entry.
	var errorDiv = document.getElementById("name_error");
	errorDiv.innerHTML = "That doesn't seem like a name..."; 
	errorDiv.style.display = "inline";
}

function promptName(){
	//if user enters invalid entry, display error and prompt for valid entry.
	var errorDiv = document.getElementById("name_error");
	errorDiv.innerHTML = "Please enter your full name."; 
	errorDiv.style.display = "inline";
}
function clearNameError(){
	//clear Error Message in Div
	var errorDiv = document.getElementById("name_error");
	errorDiv.style.display = "none";
}

//email functions
function promptEmail(){
	//if user enters invalid entry, display error and prompt for valid entry.
	var errorDiv = document.getElementById("email_error");
	errorDiv.innerHTML = "Please enter a valid email address."; 
	errorDiv.style.display = "inline";
}

function clearEmailError(){
	//clear Error Message in Div
	var errorDiv = document.getElementById("email_error");
	errorDiv.style.display = "none";
}

//general clear functions
function validateInput() {
	//clear Error message when clicked
	var errorDiv = document.getElementById("sendError");
	errorDiv.style.display = "none";
}

//send functions
function promptEntries() {
	//if entries are not valid, display error message
	var errorDiv = document.getElementById("sendError");
	errorDiv.innerHTML = "Please fill out all fields."; 
	errorDiv.style.display = "inline";
}

function send(){
	//if message is successfully send, clear Error Message in Div
	var success = document.getElementById("sent");
	success.innerHTML = "Sent!";
	success.style.display = "inline";
    clearAllInputs();	
}

function clearAllInputs(){
	//once sent, clear all inputs
	document.getElementById("inputName").value = "";
	document.getElementById("inputEmail").value = "";
	document.getElementById("inputSubject").value = "Choose a Subject";
	document.getElementById("inputMessage").value = "";
}

//fade out send button, through jQuery.
$(document).ready(function(){
  $("button").click(function(){
    $("#sent").fadeOut(5000);
  });
});





