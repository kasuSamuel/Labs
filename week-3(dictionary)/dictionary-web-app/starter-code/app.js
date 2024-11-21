const modeToggle = document.getElementById("mode-toggle");
const fontSelector = document.getElementById("font-selector");
const searchBar = document.querySelector(".search-bar");
const imgElement = document.querySelector(".toggle-wrapper img");
const searchInput = document.querySelector(".search-input");
const options = document.querySelectorAll(" option");

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
  searchBar.style.borderWidth = "1px";
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
  document.body.style.fontFamily =
    e.target.value === "serif"
      ? "Georgia, serif"
      : e.target.value === "mono"
      ? "Mono, monospace"
      : "Arial, sans-serif";
}); // Function to fetch the definition of a word

async function fetchWordDefinition(inputValue) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;
  try {
    // Make the fetch request to the API
    const response = await fetch(url);

    // Check if the response is successful (status 200)
    if (!response.ok) throw new Error("Word not found");

    // Parse the JSON data from the response
    const data = await response.json();
    const phonetic = data[0].phonetic;
    const source = data[data.length - 1].sourceUrls[0];

    let phoneticsElement = document.getElementById("phonetics");
    phoneticsElement.textContent = phonetic;

    let sourceElement = document.querySelector(".source a");
    sourceElement.textContent = source;
    // Extract the definition from the API response
    const meanings = data[0].meanings;
    if (meanings && meanings.length > 0) {
      const definition = meanings[0].definitions[0].definition;
      return definition;
    } else {
      throw new Error("No definition found");
    }
  } catch (error) {
    console.error("Error fetching word definition:", error);
    return null; // or return an appropriate error message
  }
}

const word = "black";

fetchWordDefinition(word).then((definition) => {
  if (definition) {
    let wordTitleElement = document.getElementById("wordTitle");
    wordTitleElement.textContent = word;
    let definitionElement = document.getElementById("definition");
    definitionElement.textContent = definition;
  } else {
    console.log("No definition found.");
  }

  


});


    // Function to render dictionary data
    function renderData(data) {
        const container = document.getElementById('dictionary-data');
        
        data.forEach(item => {
          const wordHtml = `
            <div class="word-container">
              <h2>${item.word}</h2>
              <p><strong>Phonetic:</strong> ${item.phonetic}</p>
              <div>
                <h3>Phonetics:</h3>
                <ul>
                  ${item.phonetics.map(phonetic => `
                    <li>
                      <span>${phonetic.text}</span>
                      ${phonetic.audio ? `<br><audio controls><source src="${phonetic.audio}" type="audio/mpeg">Your browser does not support the audio element.</audio>` : ''}
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div>
                <h3>Meanings:</h3>
                ${item.meanings.map(meaning => `
                  <div>
                    <h4>${meaning.partOfSpeech}</h4>
                    <ul class="meanings-list">
                      ${meaning.definitions.map(def => `
                        <li>
                          <p class="definition">${def.definition}</p>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
              <div>
                <h3>Source:</h3>
                <a href="${item.sourceUrls[0]}" target="_blank">Link to source</a>
              </div>
            </div>
          `;
          
          container.innerHTML += wordHtml;
        });
      }
  
      // Call function to render the data
      renderData(data);