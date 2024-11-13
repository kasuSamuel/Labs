// Lab 1
// a. capitalize(str)

const capitalize = (str) => {
  if (typeof str !== 'string') return 'Not a string'; 
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
console.log(capitalize('amalitech ghana'));

//   b. reverse(str)

const reverse = (str) => {
  if (typeof str !== 'string') return 'Not a string'; 
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



//   3. Object Transformations

const personUtils = {
  fullName: function(person) {
    return `${person.firstName} ${person.lastName}`;
  },

  isAdult: function(person) {
    return person.age >= 18;
  },

  filterByAge: function(people, minAge) {
    return people.filter(person => person.age >= minAge);
  }
};

const people = [
  { firstName: "Alice", lastName: "Johnson", age: 22 },
  { firstName: "Bob", lastName: "Smith", age: 27 },
  { firstName: "Charlie", lastName: "Brown", age: 30 },
];

// a. Get full name of the first person
console.log(personUtils.fullName(people[0])); 

// b. Check if the  person is an adult
console.log(personUtils.isAdult(people[1]));  

// c. Filter people by age greater than or equal to 18
console.log(personUtils.filterByAge(people, 18));  


// question 4

// Reverse and Capitalize a String

function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)));
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function capitalizeString(str) {
  return str.toUpperCase();
}

const reverseAndCapitalize = compose(capitalizeString, reverseString);

console.log(reverseAndCapitalize('hello world')); 

//  Double Even Numbers in an Array.

function doubleEven(num) {
  return num % 2 === 0 ? num * 2 : num;
}

function mapArray(fn, arr) {
  return arr.map(fn);
}

const doubleEvenNumbers = compose(mapArray.bind(null, doubleEven));

console.log(doubleEvenNumbers([1, 2, 3, 4, 5]));