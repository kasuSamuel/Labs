// DOM Elements
const modeToggle = document.getElementById("mode-toggle");
const fontSelector = document.getElementById("font-selector");
const searchBar = document.querySelector(".search-bar");
const imgElement = document.querySelector(".toggle-wrapper img");
const searchButton = document.querySelector(".search-button");
const input = document.getElementById("wordInput");
document.getElementById("#audioIcon");

// Initialize the page with saved preferences

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


// Apply styles based on mode
function applyModeStyles(isDarkMode) {
  searchBar.style.backgroundColor = isDarkMode ? "#757575" : "#f4f4f4";
  imgElement.src = isDarkMode
    ? "./assets/images/icon-dark-moon.svg"
    : "./assets/images/icon-moon.svg";
  fontSelector.classList.toggle("white-text", isDarkMode);
}

document.getElementById("audioIcon").addEventListener("mouseover", function () {
  this.src = "./assets/images/icon-play-hover.svg";
});

document.getElementById("audioIcon").addEventListener("mouseout", function () {
  this.src = "./assets/images/icon-play.svg";
});

// Toggle Dark/Light Mode
modeToggle.addEventListener("change", () => {
  const isDarkMode = modeToggle.checked;
  const mode = isDarkMode ? "dark" : "light";

  localStorage.setItem("theme", mode);

  document.documentElement.setAttribute("data-theme", mode);
  applyModeStyles(isDarkMode);
});


fontSelector.addEventListener("change", (e) => {
  // Get the value of the selected font
  const selectedFont = e.target.value;
  
  // Map the font options to actual font families
  let fontFamily;
  switch (selectedFont) {
    case "serif":
      fontFamily = "Georgia, serif";
      break;
    case "mono":
      fontFamily = "Courier New, monospace";
      break;
    case "cursive":
      fontFamily = "Comic Sans MS, cursive";
      break;
    case "fantasy":
      fontFamily = "Papyrus, fantasy";
      break;
    case "times":
      fontFamily = "Times New Roman, Times, serif";
      break;
    case "arial":
      fontFamily = "Arial, sans-serif";
      break;
    case "courier":
      fontFamily = "Courier, monospace";
      break;
    default:
      fontFamily = "Arial, sans-serif"; // Default font
  }

  // Apply the selected font to the body
  document.body.style.fontFamily = fontFamily;
});

input.addEventListener("click", function () {
  searchBar.style.borderColor = "#A445ED";
  searchBar.style.borderStyle = "solid";
  searchBar.style.borderWidth = "3px";
});


document.addEventListener("click", function (event) {
  // Check if the click was not inside the searchBar or searchInput
  if (
    !searchBar.contains(event.target) &&
    !input.contains(event.target)
  ) {
    searchBar.style.borderColor = "transparent";
  }
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

  document.getElementById("audioIcon").addEventListener("click", function () {
    const audioUrl = localStorage.getItem("audioUrl");
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  });
  localStorage.setItem("audioUrl", data[0].phonetics[0]?.audio || "");


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
              ${meaning.definitions[0]?.synonyms?.join(", ")}
            </div>
          </div>
        `)
        .join("")
    )
    .join("");
}

// Handle Fetch Errors
function handleFetchError(status) {
  const errorElement = document.querySelector("error");
const allContent = document.querySelector(".all-content");
  const footer = document.querySelector("footer");
  if (status === 404) {

    errorElement.style.display = "block";
    allContent.style.display = "none";
    footer.style.display = "none";
    displayWordData(data);
  } else {
    errorElement.textContent = `Error: ${status}`;
  }
}

// Display Error
function displayError() {
  const errorElement = document.querySelector(".first-error");
  errorElement.style.display = "block";
  searchBar.style.borderColor = "red";
  searchBar.style.borderStyle = "solid";
  searchBar.style.borderWidth = "3px";
  setTimeout(() => (errorElement.style.display = "none", searchBar.style.borderColor = "transparent"), 2000);
}

// Trigger search on button click or Enter key
searchButton.addEventListener("click", () => fetchWordDefinition(input.value));
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchWordDefinition(input.value);
  }
});
