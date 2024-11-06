// Lab 1
// a. capitalize(str)

const capitalize = (str) => {
    if (typeof str !== 'string') return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  console.log(capitalize('aasusamulus'));

//   b. reverse(str)

  const reverse = (str) => {
    if (typeof str !== 'string') return ''; 
    return str.split('').reverse().join('');
  };
    console.log(reverse('aasusamulus'));

    // c. isPalindrome(str)

    const isPalindrome = (str) => {
        if (typeof str !== 'string') return false; 
        const cleanedStr = str.replace(/\W/g, '').toLowerCase();
        return cleanedStr === cleanedStr.split('').reverse().join('');
      };
      console.log(isPalindrome('aasusamulus'));
    //   d. wordCount(str)

    const wordCount = (str) => {
        if (typeof str !== 'string') return 0; 
        return str.trim().split(/\s+/).length;
      };
      console.log(wordCount('aasusamulus'));


    //   2. Array Transformations
    // a. double(arr)

    const double = (arr) => {
        if (!Array.isArray(arr)) return []; 
        return arr.map(num => (typeof num === 'number' ? num * 2 : num));
      };
      console.log(double('aasusamulus'));
    //   b. filterEven(arr)
    const filterEven = (arr) => {
        if (!Array.isArray(arr)) return []; 
        return arr.filter(num => num % 2 !== 0);
      };
      
    //   c. sum(arr)
    const sum = (arr) => {
        if (!Array.isArray(arr)) return 0; 
        return arr.reduce((acc, num) => (typeof num === 'number' ? acc + num : acc), 0);
      };
      
    //   d. average(arr)
    const average = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) return 0;  and empty array
        const total = sum(arr); // reuse sum function
        return total / arr.length;
      };
      

    //   3. Object Transformations
    // a. fullName(person)

    const fullName = (person) => {
        if (typeof person !== 'object' || !person.firstName || !person.lastName) return ''; 
        return `${person.firstName} ${person.lastName}`;
      };
      

    //   b. isAdult(person)
    const isAdult = (person) => {
        if (typeof person !== 'object' || typeof person.age !== 'number') return false; 
        return person.age >= 18;
      };
      
    //   c. filterByAge(people, minAge)
    const filterByAge = (people, minAge) => {
        if (!Array.isArray(people) || typeof minAge !== 'number') return []; // handle invalid input
        return people.filter(person => person.age >= minAge);
      };
      

    //   4. Function Composition
    
// Higher-order function for composing multiple functions
const compose = (...fns) => {
    return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
  };
  
  // Example usage:
  
  // Compose reverse and capitalize functions
  const reverseAndCapitalize = compose(capitalize, reverse);
  
  // Compose double and filterEven to double only even numbers
  const doubleEvenNumbers = compose(double, filterEven);
  