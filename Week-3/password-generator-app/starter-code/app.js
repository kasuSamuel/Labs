const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const copyButton = document.querySelector('.copy-btn');
const passwordText = document.getElementById('password');
const message = document.getElementById('message');
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.querySelector(".generate-btn");
const strengthBars = document.querySelectorAll(".strength-bars .bar");
const levelTitle = document.querySelector(".level-title");
const copyBtn = document.querySelector(".copy-btn");

// Password character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

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


// Function to generate a random password
function generatePassword() {
  const length = parseInt(lengthSlider.value, 10);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  let charPool = "";
  if (includeUppercase) charPool += uppercaseChars;
  if (includeLowercase) charPool += lowercaseChars;
  if (includeNumbers) charPool += numberChars;
  if (includeSymbols) charPool += symbolChars;

  // Validate inputs
  if (charPool === "") {
    passwordText.textContent = "No Password!";
    passwordText.style.color= '#E6E5EA';
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }
 
  passwordText.textContent = password || "No Password!";
  passwordText.style.color= '#E6E5EA';
  updateStrength(password);
}


// Update strength indicator
function updateStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) strength++;

  // Update strength bars
  strengthBars.forEach((bar, index) => {
    bar.classList.remove("active");
    bar.classList.add("not-active");
    if (index < strength) {
        // Reset styles to remove any previous state
        bar.style.backgroundColor = 'blue'; 
        bar.style.border = 'red';          
    
        // Apply styles based on strength
        if (strength === 1) {
            bar.style.backgroundColor = '#F64A4A';
            bar.style.border = '#F64A4A solid 1px';
        } 
        if (strength === 2) {
            bar.style.backgroundColor = '#FB7C58';
            bar.style.border = '#FB7C58 solid 1px';
        } 
        if (strength === 3) {
            bar.style.backgroundColor = '#F8CD65';
            bar.style.border = '#F8CD65 solid 1px';
        } 
        if (strength === 4) {
            bar.style.backgroundColor = '#A4FFAF';
            bar.style.border = '#A4FFAF solid 1px';
        }
    }
    
    
  });

  // Update strength level title
  const strengthTitles = ["TOO WEAK!", "WEAK", "MEDIUM", "STRONG"];
  levelTitle.textContent = strengthTitles[strength - 1] || "";
}

// Event Listener for Generate Button
generateBtn.addEventListener("click", generatePassword);
