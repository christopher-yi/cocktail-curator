/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);


// NEW STUFF
document.querySelector('.search-cocktail').addEventListener('click', getCocktail)

document.querySelector('.drink-input').addEventListener('input', listCocktails)

// Search on enter
document.querySelector('.drink-input').addEventListener('keypress', handle)
function handle(e){
	if(e.key === "Enter"){
		getCocktail();
	}
	return false;
}

// Array to return the correct drink object
let drinkArray = [];

// Array for search input drinks to be listed in
let drinkName = [];

// Get cocktail -> don't get cocktail if it doesn't match the strDrink name. Use autofill to make sure the drink isn't spelled incorrectly. if it doesn't match show 'no results named `${drink}`

function getCocktail() {
    let drink = document.querySelector('.drink-input').value;
    console.log(drink)

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
	
	if(drink == '') {
		return [];
	}

	//*******/ If input is not an exact match it will not return the drink, if the input does not match strDrink, defer to select autocomplete focus drink instead********

	for(let key in data.drinks) {
		if(data.drinks[key].strDrink.toLowerCase() === `${drink.toLowerCase()}`) {
			console.log(data.drinks[key])
			drinkArray.push(data.drinks[key])
			document.querySelector('.popup-container').style.display = 'block';
			document.querySelector('.popup-name').innerHTML = data.drinks[0].strDrink;
			document.querySelector('.popup-image').src = data.drinks[0].strDrinkThumb
			document.querySelector('.popup-image').style.width = '20rem'
			document.querySelector('.popup-instructions').innerHTML = data.drinks[0].strInstructions;
		} else {
			// Make a autocomplete div that says 'no results named `${drink}` found
		}
	}

		console.log(drinkArray)

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

let ingredientName = [];

// List cocktails
function listCocktails() {
    let drink = document.querySelector('.drink-input').value;
    console.log(drink)

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

		console.log(data.drinks)

		for(let key in data.drinks) {
			if(data.drinks[key].strDrink.toLowerCase().startsWith(`${drink.toLowerCase()}`)) {
				drinkName.push(data.drinks[key].strDrink)
			}
		}

		for(let i = 0; i < data.drinks.length; i++) {
			if(Object.values(data.drinks[i]).map(x => {
				if(x != null) {
					return x.toLowerCase()
				}
			}).includes(`${drink.toLowerCase()}`)) {
				ingredientName.push(data.drinks[i].strDrink)
			}
		}

		drinkName = drinkName.filter(x => x.toLowerCase().startsWith(`${drink}`));

		

		if(drink == '') {
			drinkName = [];
		}

		console.log([...new Set(drinkName.concat(ingredientName))])

		// Add autocomplete here -.- using drinkName array

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


// Close popup when you click outside of it
let popup = document.querySelector('.popup-container'); 

window.addEventListener('click', function(e){   
	if (document.getElementById('clickbox').contains(e.target)){
	  popup.style.display = 'block'
	} else{
	  popup.style.display = 'none'
	}
  });


// Fetch Random Drink
document.querySelector('.random-cocktail').addEventListener('click', getRandom)

let ingredientsArr = [];
let measurementsArr = [];

function getRandom() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks);
      
	  document.querySelector('.lucky').style.display = 'none'
	  document.querySelector('.lucky2').style.display = 'none'
	  
	  document.querySelector(".list-container").innerHTML = '';
	

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
		document.querySelector('.list-container').insertAdjacentHTML('beforeend', instruct);
	  })

	  document.querySelector('.list-container').style.display = 'inline-block'
	  document.querySelector('.list-container').style.listStyle = 'none'
      document.querySelector('.random-name').innerHTML = data.drinks[0].strDrink;
      document.querySelector('.random-image').src = data.drinks[0].strDrinkThumb
	  document.querySelector('.random-image').style.width = '20rem'
      document.querySelector('.random-instructions').innerHTML = data.drinks[0].strInstructions;

	  ingredientsArr = [];
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
	return ingredientsArr;
}


// Autocomplete

// If the array contains the ingredient 'rum', 'whiskey, 'bourbon', vodka, tequila

// Autocomplete feature https://www.w3schools.com/howto/howto_js_autocomplete.asp

// ->>> While the search bar contains the characters the user puts in, create an alphabetically sorted array of the drinks that start with those characters and then create a list and make them appear on drop down list

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Separate the listCocktail and getCocktail functions

// listCocktails will fire when the 'input' event listener on the text input fires
// it will also create an autocomplete list on each input change
// need to also implement focus, and keyup, keydown on list

// getCocktail will fire only when enter is pressed on text input or when submit button is pressed, get cocktail will change the popup container and add drink data onto it.