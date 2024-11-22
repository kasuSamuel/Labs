const modeToggle = document.getElementById("mode-toggle");
const fontSelector = document.getElementById("font-selector");
const searchBar = document.querySelector(".search-bar");
const imgElement = document.querySelector(".toggle-wrapper img");
const searchInput = document.querySelector(".search-input");
const options = document.querySelectorAll(" option");
const searchButton = document.querySelector(".search-button");
const input = document.getElementById("wordInput");

modeToggle.addEventListener("change", () => {
  document.documentElement.setAttribute(
    "data-theme",
    modeToggle.checked ? "dark" : "light"
  );
  searchBar.style.backgroundColor = modeToggle.checked ? "#757575" : "#f4f4f4";
  imgElement.src = modeToggle.checked
    ? "./assets/images/icon-dark-moon.svg"
    : "./assets/images/icon-moon.svg";
  fontSelector.classList.toggle("white-text");
  options.forEach((option) => {
    option.style.backgroundColor = modeToggle.checked ? "#121212" : "#ffffff";
    option.style.color = modeToggle.checked ? "white" : "black";
  });
});
searchInput.addEventListener("click", function () {
  searchBar.style.borderColor = "#A445ED";
  searchBar.style.borderStyle = "solid";
  searchBar.style.borderWidth = "3px";
});

document.addEventListener("click", function (event) {
  // Check if the click was not inside the searchBar or searchInput
  if (
    !searchBar.contains(event.target) &&
    !searchInput.contains(event.target)
  ) {
    searchBar.style.borderColor = "none";
    searchBar.style.borderStyle = "none";
    searchBar.style.borderWidth = "0";
  }
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
 // Function to fetch the definition of a word

async function fetchWordDefinition(inputValue) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;

  try {
    // Make the fetch request to the API
    const response = await fetch(url);

    // Check if the response is successful (status 200)
    if (!response.ok) {
      if (response.status === 404) {
        document.querySelector("error").style.display = "block";
        document.getElementById("audioIcon").style.display = "none";
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();
    // Access the array of objects
    const wordContainer = document.querySelector(".word-container");

    wordContainer.innerHTML = `
    
      <h1 id="wordTitle" class="word">${data[0].word}</h1>
      <p id="phonetics" class="phonetics">${data[0].phonetic || "N/A"}</p>

  `;

    const footer = document.querySelector("footer");
    footer.innerHTML = `
        <div style="width: 100%; height: 1px; background-color: #979797; margin-top: .3rem;"></div>
      <p class="source">
        Source: <a href="${data[0].sourceUrls[0]}" target="_blank">${data[0].sourceUrls[0]}</a> <img src="./assets/images/icon-new-window.svg" alt="">
      </p>  `;




    const section = document.querySelector("section");
    data.map((item) => {
      const wordHTML = `
      ${item.meanings
        .map(
          (meaning) => `
  <div class="word-card">
    <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
        <h3 class="part-of-speech">${meaning.partOfSpeech}</h3>
  
      <div class="line"></div>
    </div>
    <p class="display-meaning">Meaning:</p>
    <ul>
      ${item.meanings
        .map((meaning) =>
          meaning.definitions
            .map(
              (def) => `
        <li><p>${def.definition}</p></li>
      `
            )
            .join("")
        )
        .join("")}
    </ul>
    <div class="synonyms">
      <p class="synonyms-title">Synonyms:</p>
      ${item.meanings
        .map(
          (meaning) => `
        <p>${meaning.definitions[0].synonyms.join(", ")}</p>
      `
        )
        .join("")}
    </div>
  </div>
    `
        )
        .join("")}`;

      // Append the generated HTML to the section
      section.innerHTML = wordHTML;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

searchButton.addEventListener("click", () => {
  fetchWordDefinition(input.value);

  if (input.value === "") {
    document.querySelector(".error").style.display = "block";
    searchBar.style.borderColor = "red";
    searchBar.style.borderStyle = "solid";
    searchBar.style.borderWidth = "3px";
  }
  setTimeout(() => {
    document.querySelector(".error").style.display = "none";
    searchBar.style.borderColor = "none";
    searchBar.style.borderStyle = "none";
    searchBar.style.borderWidth = "0";
  }, 2000);
});
