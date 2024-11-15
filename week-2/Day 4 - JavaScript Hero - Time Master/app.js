// Constructor function for creating Clock objects
class Clock {
  constructor(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;

    // Method to return the time in HH:MM:SS format (24-hour)
    this.getFormattedTime = function () {
      let formattedHours = this.hours < 10 ? '0' + this.hours : this.hours;
      let formattedMinutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
      let formattedSeconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    // Method to return the time in 12-hour format with AM/PM
    this.get12HourTime = function () {
      let hour12 = this.hours % 12;
      hour12 = hour12 ? hour12 : 12; // If hour is 0, use 12
      let ampm = this.hours >= 12 ? 'PM' : 'AM';
      let formattedMinutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
      let formattedSeconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
      return `${hour12}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    };
  }
}
  
  // Flag to track format state (24-hour format is default)
  let is24HourFormat = true;
  
  // Function to update the clock every second
  function updateClock() {
    let currentTime = new Date();
    let clock = new Clock(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
  
    // Get the div element to display the time
    let clockElement = document.getElementById("clock");
  
    // Display time based on format (toggle between 12-hour and 24-hour)
    if (is24HourFormat) {
      clockElement.innerHTML = clock.getFormattedTime(); 
    } else {
      clockElement.innerHTML = clock.get12HourTime(); 
    }
  
    // Update the clock every second (1000 milliseconds)
    setTimeout(updateClock, 1000);
  }
  
  // Add event listener to toggle button
  document.getElementById("toggleFormat").addEventListener("click", function() {
    // Toggle the format
    is24HourFormat = !is24HourFormat;
  
    // Update the button text based on the current format
    let toggleButton = document.getElementById("toggleFormat");
    if (is24HourFormat) {
      toggleButton.textContent = "Switch to 12-hour format";
    } else {
      toggleButton.textContent = "Switch to 24-hour format";
    }
  });
  
  // Start the clock
  updateClock();
  // Function to change the clock color randomly
function changeClockColor() {
    const clockElement = document.getElementById("clock");
    // Generate a random color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    clockElement.style.color = randomColor;
  }
  
  // Add event listener to change color button
  document.getElementById("changeColor").addEventListener("click", changeClockColor);
  