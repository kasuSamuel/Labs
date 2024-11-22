// DOM Elements
const modeToggle = document.getElementById("mode-toggle");
const fontSelector = document.getElementById("font-selector");
const searchBar = document.querySelector(".search-bar");
const imgElement = document.querySelector(".toggle-wrapper img");
const searchButton = document.querySelector(".search-button");
const input = document.getElementById("wordInput");

// Initialize the page with saved preferences
document.addEventListener("DOMContentLoaded", () => {
  // Load Dark Mode preference
  const savedMode = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedMode);
  modeToggle.checked = savedMode === "dark";
  applyModeStyles(savedMode === "dark");

  // Load the last searched word and its content
  const savedWord = localStorage.getItem("searchedWord");
  const savedWordContent = localStorage.getItem("wordContent");
  if (savedWord && savedWordContent) {
    input.value = savedWord;
    displayWordData(JSON.parse(savedWordContent));
  }
});

// Apply styles based on mode
function applyModeStyles(isDarkMode) {
  searchBar.style.backgroundColor = isDarkMode ? "#757575" : "#f4f4f4";
  imgElement.src = isDarkMode
    ? "./assets/images/icon-dark-moon.svg"
    : "./assets/images/icon-moon.svg";
  fontSelector.classList.toggle("white-text", isDarkMode);
}

// Toggle Dark/Light Mode
modeToggle.addEventListener("change", () => {
  const isDarkMode = modeToggle.checked;
  const mode = isDarkMode ? "dark" : "light";

  // Save the mode to LocalStorage
  localStorage.setItem("theme", mode);

  // Apply the mode styles
  document.documentElement.setAttribute("data-theme", mode);
  applyModeStyles(isDarkMode);
});

// Fetch Word Definition
async function fetchWordDefinition(word) {
  if (!word) {
    displayError("Please enter a word.");
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      handleFetchError(response.status);
      return;
    }

    const data = await response.json();

    // Save word and content to LocalStorage
    localStorage.setItem("searchedWord", word);
    localStorage.setItem("wordContent", JSON.stringify(data));

    // Display the word data
    displayWordData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display Word Data
function displayWordData(data) {
  const wordContainer = document.querySelector(".word-container");
  const footer = document.querySelector("footer");
  const section = document.querySelector("section");

  wordContainer.innerHTML = `
    <h1 id="wordTitle" class="word">${data[0].word}</h1>
    <p id="phonetics" class="phonetics">${data[0].phonetic || "N/A"}</p>
  `;

  footer.innerHTML = `
    <div style="width: 100%; height: 1px; background-color: #979797; margin-top: 0.3rem;"></div>
    <p class="source">
      Source: <a href="${data[0].sourceUrls[0]}" target="_blank">${data[0].sourceUrls[0]}</a>
      <img src="./assets/images/icon-new-window.svg" alt="">
    </p>
  `;

  section.innerHTML = data
    .map(item =>
      item.meanings
        .map(meaning => `
          <div class="word-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 class="part-of-speech">${meaning.partOfSpeech}</h3>
                <div class="line"></div>
            </div>

            <p class="display-meaning">Meaning:</p>
            <ul>
              ${meaning.definitions
                .map(def => `<li><p>${def.definition}</p></li>`)
                .join("")}
            </ul>
            <div class="synonyms">
              <p class="synonyms-title">Synonyms:</p>
              ${meaning.definitions[0]?.synonyms?.join(", ") || "None"}
            </div>
          </div>
        `)
        .join("")
    )
    .join("");
}

// Handle Fetch Errors
function handleFetchError(status) {
  const errorElement = document.querySelector(".error");
  errorElement.style.display = "block";

  if (status === 404) {
    errorElement.textContent = "Word not found.";
  } else {
    errorElement.textContent = `Error: ${status}`;
  }
}

// Display Error
function displayError(message) {
  const errorElement = document.querySelector(".error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
  setTimeout(() => (errorElement.style.display = "none"), 2000);
}

// Trigger search on button click or Enter key
searchButton.addEventListener("click", () => fetchWordDefinition(input.value));
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchWordDefinition(input.value);
  }
});
