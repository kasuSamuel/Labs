const modeToggle = document.getElementById('mode-toggle');
const fontSelector = document.getElementById('font-selector');
const searchBar = document.querySelector('.search-bar');
const imgElement = document.querySelector('.toggle-wrapper img');
const searchInput = document.querySelector('.search-input');

modeToggle.addEventListener('change', () => {
  document.documentElement.setAttribute('data-theme', modeToggle.checked ? 'dark' : 'light');
  searchBar.style.backgroundColor = modeToggle.checked? '#757575' : '#f4f4f4';
  imgElement.src = modeToggle.checked ? './assets/images/icon-dark-moon.svg' : './assets/images/icon-moon.svg';
    // document.body.style.color = modeToggle.checked ? '#fff' : '#000';
});
  searchInput.addEventListener('click', function() {
    searchBar.style.borderColor = '#A445ED';  // Just changes the border color
    searchBar.style.borderStyle = 'solid';   // Ensures the border is solid
    searchBar.style.borderWidth = '1px';
  });
  

fontSelector.addEventListener('change', (e) => {
  document.body.style.fontFamily = e.target.value === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif';
});
