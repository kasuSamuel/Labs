// Lab 1
// a. capitalize(str)

const capitalize = (str) => {
  if (typeof str !== 'string') return ''; 
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
console.log(capitalize('amalitech ghana'));

