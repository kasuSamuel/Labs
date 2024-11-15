// Task 1: Object Methods and `this`

const person = {
    name: 'samuel',
    age: 40,
    greet: function() {
      console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
  };
  person.greet(); 
  

  // Using call(), apply(), and bind() to change 'this'
  const anotherPerson = {
     name: 'Kasu', 
     age: 45, 
    };
  
  person.greet.call(anotherPerson); 
  person.greet.apply(anotherPerson);
  const boundGreet = person.greet.bind(anotherPerson);
  boundGreet(); 
  

  // Task 2: Event Handlers and `this`
  
  const button = document.getElementById('myButton');
  

  function handleClick() {
    console.log(this.id); 
    console.log(this.textContent); 
  }
  button.addEventListener('click', handleClick);
  
  button.addEventListener('click', () => {
    console.log(this.id);
    console.log(this.textContent);
  });


  
  // Task 3: Private Data with Closures and `this`
  
  function createCounter() {
    let count = 0; 
    return {
      increment: function() {
        count++;
        console.log(count); 
      },
      getCount: function() {
        return count;
      }
    };
  }
  
  const counter = createCounter();
  counter.increment(); 
  counter.increment(); 
  console.log(counter.getCount()); 
  
  // Task 4: Reusable Component with Closure and `this` (Timer)
  
  function createTimer(duration, elementId) {
    let timeRemaining = duration;
    const element = document.getElementById(elementId);
    
    function updateTimer() {
      if (timeRemaining > 0) {
        element.textContent = `Time remaining: ${timeRemaining}s`;
        timeRemaining--;
      } else {
        clearInterval(timerInterval);
        console.log("Timer finished!");
      }
    }
  
    const timerInterval = setInterval(updateTimer, 1000);
  }
  
  // Initialize the timer with a duration of 10 seconds
  createTimer(10, 'timer');
