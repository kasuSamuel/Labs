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
    console.log(reverse('aasusamulus'));

    // c. isPalindrome(str)

    const isPalindrome = (str) => {
        if (typeof str !== 'string') return false; 
        const cleanedStr = str.replace(/\W/g, '').toLowerCase();
        return cleanedStr === cleanedStr.split('').reverse().join('');
      };
      console.log(
        'palindrome', isPalindrome('racecar'));

        

    //   d. wordCount(str)

    const wordCount = (str) => {
        if (typeof str !== 'string') return 0; 
        return str.trim().split(/\s+/).length;
      };
      console.log(wordCount('aasusamulus'));

