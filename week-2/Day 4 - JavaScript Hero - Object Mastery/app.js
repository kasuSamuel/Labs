// Superheroes and Supervillains data
const characters = [
    { name: "Superman", identity: "Clark Kent", powers: ["super strength", "flight", "x-ray vision"], isHero: true },
    { name: "Batman", identity: "Bruce Wayne", powers: ["intelligence", "martial arts"], isHero: true },
    { name: "Joker", identity: "Unknown", powers: ["insanity", "gadgets"], isHero: false },
    { name: "Wonder Woman", identity: "Diana Prince", powers: ["super strength", "combat skills", "lasso of truth"], isHero: true },
    { name: "Lex Luthor", identity: "Lex Luthor", powers: ["intelligence", "wealth", "power armor"], isHero: false },
    { name: "Aquaman", identity: "Arthur Curry", powers: ["super strength", "aquatic abilities", "trident mastery"], isHero: true },
];

// Function to display all characters
function displayAll() {
    const filteredCharacters = characters;
    displayCharacters(filteredCharacters);
}

// Function to display only heroes
function displayHeroes() {
    const filteredCharacters = characters.filter(character => character.isHero);
    displayCharacters(filteredCharacters);
}

// Function to display only villains
function displayVillains() {
    const filteredCharacters = characters.filter(character => !character.isHero);
    displayCharacters(filteredCharacters);
}

// Function to display characters dynamically
function displayCharacters(filteredCharacters) {
    const characterListDiv = document.getElementById('character-list');
    characterListDiv.innerHTML = '';  // Clear previous content

    filteredCharacters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('character-card');

        // Name and Identity
        const name = document.createElement('h2');
        name.innerText = character.name;
        const identity = document.createElement('p');
        identity.innerText = `Identity: ${character.identity}`;

        // Powers
        const powers = document.createElement('p');
        powers.innerText = `Powers: ${character.powers.join(', ')}`;

        // Buttons
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        const revealIdentityBtn = document.createElement('button');
        revealIdentityBtn.innerText = 'Reveal Identity';
        revealIdentityBtn.onclick = () => alert(`The secret identity of ${character.name} is ${character.identity}`);

        const showPowersBtn = document.createElement('button');
        showPowersBtn.innerText = 'Show Powers';
        showPowersBtn.onclick = () => alert(`${character.name}'s powers are: ${character.powers.join(', ')}`);

        buttonGroup.appendChild(revealIdentityBtn);
        buttonGroup.appendChild(showPowersBtn);

        // Append elements to card
        card.appendChild(name);
        card.appendChild(identity);
        card.appendChild(powers);
        card.appendChild(buttonGroup);

        // Append card to character list
        characterListDiv.appendChild(card);
    });
}

// Display all characters by default when the page loads
displayAll();
