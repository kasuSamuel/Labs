// Lab 1
// a. capitalize(str)

const capitalize = (str) => {
    if (typeof str !== 'string') return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  console.log(capitalize('samuel'));

//   b. reverse(str)

  const reverse = (str) => {
    if (typeof str !== 'string') return ''; 
    return str.split('').reverse().join('');
  };
    console.log(reverse('samuel'));

// c. isPalindrome(str)
  const isPalindrome = (str) => {
    if (typeof str !== 'string') return false; 
    return str.toLowerCase() === reverse(str.toLowerCase());
  };
  console.log(isPalindrome('who'));