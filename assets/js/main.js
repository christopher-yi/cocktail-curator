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

//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('.search-cocktail').addEventListener('click', getCocktail)

// document.querySelector('.next').addEventListener('click', nextCocktail)

let drinkArray = [];
let counter = 0;

function getCocktail() {
	drinkArray = [];

    let drink = document.querySelector('.drink-input').value;
    console.log(drink)


    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

		for(let key in data.drinks) {
			if(data.drinks[key].strDrink.toLowerCase().startsWith(`${drink.toLowerCase()}`)) {
			drinkArray.push(data.drinks[key].strDrink)
			}
		}

		console.log(drinkArray)

      document.querySelector('h2').innerHTML = data.drinks[0].strDrink;
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
	  document.querySelector('img').style.width = '20rem'
      document.querySelector('h3').innerHTML = data.drinks[0].strInstructions;

	  // To display ingredients put them into an array if they contain the name 'strIngredient'. Use that array to create a list of <li>s to display above instructions

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


//Search by ingredient
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka

window.onload = function(){
	var popup = document.getElementById('popup');
    var overlay = document.getElementById('backgroundOverlay');
    var openButton = document.getElementById('openOverlay');
    document.onclick = function(e){
        if(e.target.id !== 'popup'){
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
        if(e.target === openButton){
         	popup.style.display = 'block';
            overlay.style.display = 'block';
        }
    };
};


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

// https://stackoverflow.com/questions/55090335/how-to-create-lis-based-on-fetch-result