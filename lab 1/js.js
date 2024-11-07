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

