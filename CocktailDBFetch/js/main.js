//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getCocktail)

// document.querySelector('.next').addEventListener('click', nextCocktail)

let drinkArray = []
let counter = 0;

let ingredientsArr = [];
let measurementsArr = [];

function getCocktail() {
    let drink = document.querySelector('input').value;
    console.log(drink)

    

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks);
      
      drinkArray = data.drinks




for(let key in data.drinks[0]) {
		if(key.includes('strIngredient') && data.drinks[0][key] !== null) {
			ingredientsArr.push(data.drinks[0][key])
		}
	  }

	  for(let key in data.drinks[0]) {
		if(key.includes('strMeasure') && data.drinks[0][key] !== null) {
			measurementsArr.push(data.drinks[0][key])
		}
	  }

	  for(let i = 0; i < measurementsArr.length; i++) {
		for(let j = 0; j < ingredientsArr.length; j++) {
			if(i == j) {
				ingredientsArr[j] += ': ' + measurementsArr[i]
			}
		}
	  }

	  console.log(ingredientsArr)

    ingredientsArr.forEach(step => {
      const instruct = `<li>${step}<li>`;
      document.querySelector('ul').insertAdjacentHTML('beforeend', instruct);
    })

      document.querySelector('ul').style.listStyle = 'none'
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



// function nextCocktail() {
//     counter++;
//     if(counter >= drinkArray.length) {
//       counter = 0;
//     }

//     document.querySelector('h2').innerHTML = drinkArray[counter].strDrink;
//     document.querySelector('img').src = drinkArray[counter].strDrinkThumb
//     document.querySelector('h3').innerHTML = drinkArray[counter].strInstructions;
// }


// If the array contains the ingredient 'rum', 'whiskey, 'bourbon', vodka, tequila

// Autocomplete feature https://www.w3schools.com/howto/howto_js_autocomplete.asp

// Form submit on enter https://stackoverflow.com/questions/7218143/submit-search-on-enter-key

// Random cocktail www.thecocktaildb.com/api/json/v1/1/random.php

//Search by ingredient
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka

/**
 * Generate HTML List From JavaScript Array
 *
 * @source https://getbutterfly.com/generate-html-list-from-javascript-array/
 */
// function makeList() {
//   // Establish the array which acts as a data source for the list
//   let listData = [
//       'Blue',
//       'Red',
//       'White',
//       'Green',
//       'Black',
//       'Orange'
//   ];

//   // Make a container element for the list
//   let listContainer = document.createElement('div');

//   // Make the list
//   let listElement = document.createElement('ul');

//   // Make the list item
//   let listItem = document.createElement('li');

//   // Add it to the page
//   document.body.appendChild(listContainer);
//   listContainer.appendChild(listElement);

//   // Set up a loop that goes through the items in listItems one at a time
//   let numberOfListItems = listData.length;

//   for (let i = 0; i < numberOfListItems; ++i) {
//       // Add the item text

// // Use this if the array elements contain HTML
//       // listItem.innerHTML = listData[i];
//       // If not, use the line below

// // Use this if the array elements are text only
//       listItem.textContent = listData[i];

//       // Add listItem to the listElement
//       listElement.appendChild(listItem);

//       // Reset the list item
//       listItem = document.createElement('li');
//   }
// }

// // Usage
// makeList();

// // From
// // https://getbutterfly.com/generate-html-list-from-javascript-array/#solution-1