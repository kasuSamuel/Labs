// DOM Elements
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

// Password character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

// Update slider background on input
const updateSliderBackground = (slider) => {
  const value = slider.value;
  const min = slider.min || 0;
  const max = slider.max || 100;
  const percentage = ((value - min) * 100) / (max - min);
  lengthSlider.style.background = `linear-gradient(to right, #A4FFAF  ${percentage}%, #0f0f0f ${percentage}%)`;
};

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
  updateSliderBackground(lengthSlider);
});

// Initialize slider background
updateSliderBackground(lengthSlider);

// Function to copy password to clipboard
const copyToClipboard = () => {
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
  }, 1500);
};

copyButton.addEventListener('click', copyToClipboard);

// Password Generator Class
class PasswordGenerator {
  constructor(length, options) {
    this.length = length;
    this.options = options;
  }

  // Generate a random password based on user selections
  generatePassword() {
    const { length, options } = this;
    const { includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;

    let charPool = "";
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool === "") {
      alert("Please select an option for the password.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }

    passwordText.textContent = password;
    passwordText.style.color = '#E6E5EA';
    this.updateStrength(password);
  }

  // Update password strength indicator
  updateStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) strength++;

    this.updateStrengthBars(strength);
  }

  // Update the strength bars based on the password strength
  updateStrengthBars(strength) {
    strengthBars.forEach((bar, index) => {
      bar.classList.remove("active", "not-active");
      bar.style.backgroundColor = "";
      bar.style.border = "";

      if (index < strength) {
        bar.classList.add("active");
        bar.classList.remove("not-active");

        // Apply styles based on strength level
        const strengthColors = ["#F64A4A", "#FB7C58", "#F8CD65", "#A4FFAF"];
        bar.style.backgroundColor = strengthColors[strength - 1];
        bar.style.border = `${strengthColors[strength - 1]} solid 1px`;
      } else {
        bar.classList.add("not-active");
      }
    });

    const strengthTitles = ["TOO WEAK!", "WEAK", "MEDIUM", "STRONG"];
    levelTitle.textContent = strengthTitles[strength - 1] || "";
  }
}

// Function to handle password generation button click
const handleGeneratePassword = () => {
  const length = parseInt(lengthSlider.value, 10);
  const options = {
    includeUppercase: uppercaseCheckbox.checked,
    includeLowercase: lowercaseCheckbox.checked,
    includeNumbers: numbersCheckbox.checked,
    includeSymbols: symbolsCheckbox.checked,
  };

  const passwordGenerator = new PasswordGenerator(length, options);
  passwordGenerator.generatePassword();
};

generateBtn.addEventListener("click", handleGeneratePassword);
