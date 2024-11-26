const superheroesList = [
    {
      name: "Superman",
      identity: "Clark Kent",
      powers: ["super strength", "flight", "x-ray vision"],
      isHero: true,
      picture: "super-removebg-preview 1.png",
      usePower(powerName) {
        if (this.powers.includes(powerName)) {
          console.log(`${this.name} uses their power of ${powerName}!`);
        } else {
          console.log(`${this.name} doesn't have the power of ${powerName}.`);
        }
      },
      revealIdentity() {
        console.log(`${this.name}'s secret identity is ${this.identity}.`);
      },
    },
    {
      name: "Joker",
      identity: "Unknown",
      powers: ["insanity", "gadgets"],
      isHero: false,
      picture: "joker-removebg-preview 1.png",
      usePower: function (powerName) {
        if (this.powers.includes(powerName)) {
          console.log(`${this.name} uses their power of ${powerName}!`);
        } else {
          console.log(`${this.name} doesn't have the power of ${powerName}.`);
        }
      },
      revealIdentity: function () {
        console.log(`${this.name}'s secret identity is ${this.identity}.`);
      },
    },
    {
      name: "supzero",
      identity: "Lex Luthor",
      powers: ["intelligence", "wealth", "power armor"],
      isHero: false,
      picture: "sub-removebg-preview 1.png",
      usePower: function (powerName) {
        if (this.powers.includes(powerName)) {
          console.log(`${this.name} uses their power of ${powerName}!`);
        } else {
          console.log(`${this.name} doesn't have the power of ${powerName}.`);
        }
      },
      revealIdentity: function () {
        console.log(`${this.name}'s secret identity is ${this.identity}.`);
      },
    },
    {
      name: "god of war",
      identity: "Arthur Curry",
      powers: ["super strength", "aquatic abilities", "trident mastery"],
      isHero: true,
      picture: "gow-removebg-preview 1 (1).png",
      usePower: function (powerName) {
        if (this.powers.includes(powerName)) {
          console.log(`${this.name} uses their power of ${powerName}!`);
        } else {
          console.log(`${this.name} doesn't have the power of ${powerName}.`);
        }
      },
      revealIdentity: function () {
        console.log(`${this.name}'s secret identity is ${this.identity}.`);
      },
    },
  ];
  
  superheroesList.forEach((hero) => {
    hero.usePower("super strength");
    hero.revealIdentity();
  });
  
  // Dynamically update superhero images based on selection
  function updateImage(selectId, imgId) {
    const selectedName = document.getElementById(selectId).value;
    const imgElement = document.getElementById(imgId);
  
    // Find the superhero object based on the selected name
    const superhero = superheroesList.find((hero) => hero.name === selectedName);
  
    imgElement.src =
      superhero && superhero.picture
        ? superhero.picture
        : "joker-removebg-preview 1.png";
  }
  
  // Event listeners for both selects
  document.getElementById("mySelect1").addEventListener("change", function () {
    updateImage("mySelect1", "characterImage1");
  });
  
  document.getElementById("mySelect2").addEventListener("change", function () {
    updateImage("mySelect2", "characterImage2");
  });
  


  console.log("----------------------------------------------------");
  console.log("----------------------------------------------------");
  console.log("----------------------------------------------------");
  console.log("----------------------------------------------------");
  console.log("----------------------------------------------------");
  console.log("----------------------------------------------------");
  console.log("----------------------------------------------------");
  // Define the Superhero class
  class Superhero {
    constructor(name, identity, powers) {
      this.name = name;
      this.identity = identity;
      this.powers = powers;
    }
  
    // Method to simulate the superhero fighting
    fight() {
      console.log(`${this.name} is fighting with powers: ${this.powers.join(", ")}!`);
    }
  }
  
  // Create new superheroes using the class
  let superhero1 = new Superhero("Batman", "Bruce Wayne", ["Super strength"]);
  let superhero2 = new Superhero("Arrowman", "Oliver Queen", ["Intelligence"]);
  let superhero3 = new Superhero("Wonder Woman", "Diana Prism", ["Wall climbing"]);
  
  // Call fight method for each superhero
  superhero1.fight();
  superhero2.fight();
  superhero3.fight();
  

  const Superman = Object.create(Superhero);
Superman.name = 'Killer';
Superman.power = 'Super Strength and Flying';
Superman.identity = "Killer Gimmi";

Superman.fly = function() {
  console.log(`${this.name} is flying through the sky!`);
};

Superman.fly();   

console.log("``````````````````````````````````````````````````````````");
console.log("``````````````````````````````````````````````````````````");
console.log("``````````````````````````````````````````````````````````");
console.log("``````````````````````````````````````````````````````````");