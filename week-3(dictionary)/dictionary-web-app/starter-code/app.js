const modeToggle = document.getElementById('mode-toggle');
const fontSelector = document.getElementById('font-selector');
const searchBar = document.querySelector('.search-bar');
const imgElement = document.querySelector('.toggle-wrapper img');
const searchInput = document.querySelector('.search-input');
const options = document.querySelectorAll(' option');

modeToggle.addEventListener('change', () => {
  document.documentElement.setAttribute('data-theme', modeToggle.checked ? 'dark' : 'light');
  searchBar.style.backgroundColor = modeToggle.checked? '#757575' : '#f4f4f4';
  imgElement.src = modeToggle.checked ? './assets/images/icon-dark-moon.svg' : './assets/images/icon-moon.svg';
  fontSelector.classList.toggle('white-text');
  options.forEach(option => {
    option.style.backgroundColor = modeToggle.checked ? '#121212' : '#ffffff';
    option.style.color = modeToggle.checked ? 'white' : 'black'; 
  }); 

  
});
  searchInput.addEventListener('click', function() {
    searchBar.style.borderColor = '#A445ED';  
    searchBar.style.borderStyle = 'solid';   
    searchBar.style.borderWidth = '1px';
  });
  

  document.addEventListener('click', function(event) {
    // Check if the click was not inside the searchBar or searchInput
    if (!searchBar.contains(event.target) && !searchInput.contains(event.target)) {
        searchBar.style.borderColor = 'none';  
        searchBar.style.borderStyle = 'none';  
        searchBar.style.borderWidth = '0';     
    }
});

fontSelector.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value === 'serif'? 'Georgia, serif'
: (e.target.value === 'mono' ? 'Mono, monospace' : 'Arial, sans-serif');
  });
  
