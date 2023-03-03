//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getCocktail)

document.querySelector('.next').addEventListener('click', nextCocktail)

let drinkArray = []
let counter = 0;

function getCocktail() {
    let drink = document.querySelector('input').value;
    console.log(drink)

    

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks);
      
      drinkArray = data.drinks

      document.querySelector('h2').innerHTML = data.drinks[0].strDrink;
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
      document.querySelector('h3').innerHTML = data.drinks[0].strInstructions;

      // function nextDrink() {
      //   for(let i = 0; i < data.drinks.length; i++) {
      //   document.querySelector('h2').innerHTML = data.drinks[i].strDrink;
      //   document.querySelector('img').src = data.drinks[i].strDrinkThumb
      //   document.querySelector('h3').innerHTML = data.drinks[i].strInstructions;
      //  }
      // }

      // nextDrink()

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}



function nextCocktail() {
    counter++;
    if(counter >= drinkArray.length) {
      counter = 0;
    }

    document.querySelector('h2').innerHTML = drinkArray[counter].strDrink;
    document.querySelector('img').src = drinkArray[counter].strDrinkThumb
    document.querySelector('h3').innerHTML = drinkArray[counter].strInstructions;
}


// If the array contains the ingredient 'rum', 'whiskey, 'bourbon', vodka, tequila

// Autocomplete feature https://www.w3schools.com/howto/howto_js_autocomplete.asp

// Form submit on enter https://stackoverflow.com/questions/7218143/submit-search-on-enter-key

// Random cocktail www.thecocktaildb.com/api/json/v1/1/random.php

// Search cocktail by name
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

//Search by ingredient
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka