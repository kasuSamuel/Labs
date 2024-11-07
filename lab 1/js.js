// Lab 1
// a. capitalize(str)

const capitalize = (str) => {
  if (typeof str !== 'string') return ''; 
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
console.log(capitalize('amalitech ghana'));

//   b. reverse(str)

const reverse = (str) => {
  if (typeof str !== 'string') return ''; 
  return str.split('').reverse().join('');
};
  console.log(reverse('amalitech ghana'));

  // c. isPalindrome(str)

  function isPalindrome(word) {
    const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanedWord === cleanedWord.split('').reverse().join('');
  }
  console.log(isPalindrome('racecar'));  

  //   d. wordCount(str)

  const wordCount = (str) => {
    if (typeof str !== 'string') return 0; 
    return str.trim().split(/\s+/).length;
  };
  console.log(wordCount('amalitech ganhan'));


//   2. Array Transformations

const numbers = [1, 2, 3, 4, 5];

// a. Double every number in an array

function double(arr) {
  return arr.map(num => num * 2);
}

console.log(double(numbers));



// b. Filter out even numbers from an array

function filterEven(arr) {
  return arr.filter(num => num % 2 !== 0);
}

console.log(filterEven(numbers));


// c. Calculate the sum of all numbers in an array
function sum(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}

console.log(sum(numbers));


// d. Calculate the average of all numbers in an array
function average(arr) {
  return arr.reduce((acc, num) => acc + num, 0) / arr.length;
}

console.log(average(numbers));


