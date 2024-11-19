const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const copyButton = document.querySelector('.copy-btn');
const passwordText = document.getElementById('password');
const message = document.getElementById('message');
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Slider functionality
    function updateSliderBackground(slider) {
        const value = slider.value;
        const min = slider.min || 0;
        const max = slider.max || 100;
        const percentage = ((value - min) * 100) / (max - min);
        lengthSlider.style.background = `linear-gradient(to right, #A4FFAF  ${percentage}%, #0f0f0f ${percentage}%)`;
    }

    // Attach event listener
lengthSlider.addEventListener("input",  () => {
    updateSliderBackground(lengthSlider);
});
// Initialize background on page load
updateSliderBackground(lengthSlider);

// Function to copy the text to clipboard
copyButton.addEventListener('click', () => {
    // Use the Clipboard API to write the text to the clipboard
    navigator.clipboard.writeText(passwordText.textContent)
        .then(() => {
            message.style.display = 'block';
        })
        .catch(err => {
            message.innerText = 'Failed to copy password.';
            message.style.display = 'block';
        });

    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
});