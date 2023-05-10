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

// Get cocktail -> don't get cocktail if it doesn't match the strDrink name. Autocomplete will make sure that drinks are exact match.

function getCocktail() {
    let drink = document.querySelector('.drink-input').value;
    console.log(drink)

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
	
	if(drink == '') {
		return [];
	}
	
	document.querySelector(".popup-list").innerHTML = '';

	for(let key in data.drinks) {
		if(data.drinks[key].strDrink.toLowerCase() === `${drink.toLowerCase()}`) {
			console.log(data.drinks[key])
			drinkArray.push(data.drinks[key])

			document.querySelector('.popup-container').style.display = 'block';
			document.querySelector('.popup-name').innerHTML = data.drinks[0].strDrink;
			document.querySelector('.popup-image').src = data.drinks[0].strDrinkThumb
			document.querySelector('.popup-image').style.width = '20rem'
			document.querySelector('.popup-instructions').innerHTML = data.drinks[0].strInstructions;

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
				document.querySelector('.popup-list').insertAdjacentHTML('beforeend', instruct);
			  })
		
			  document.querySelector('.popup-list').style.display = 'inline-block'
			  document.querySelector('.popup-list').style.listStyle = 'none'
			  
			  ingredientsArr = [];
			  
			  
			}
		}
		
		console.log(drinkArray)
		ingredientsArr = [];
    })
    .catch(err => {
		console.log(`error ${err}`)
    });
	return ingredientsArr
}


// Close popup when you click outside of it
const popup = document.querySelector('.popup-container'); 

window.addEventListener('click', function(e){   
	if (document.getElementById('clickbox').contains(e.target)){
	  popup.style.display = 'block'
	} else{
	  popup.style.display = 'none'
	}
  });


  
  // List cocktails
let ingredientName = [];

function listCocktails() {
    let drink = document.querySelector('.drink-input').value;
    console.log(drink)

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

		drinkName = []
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
		
		autocomplete(document.getElementById("myInput"), drinkName);


    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}




// Autocomplete function
function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		  /*check if the item starts with the same letters as the text field value:*/
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		  }
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
		  /*If the arrow DOWN key is pressed,
		  increase the currentFocus variable:*/
		  currentFocus++;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  /*If the arrow UP key is pressed,
		  decrease the currentFocus variable:*/
		  currentFocus--;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 13) {
		  if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			if (x) x[currentFocus].click();
		  }
		}
	});
	function addActive(x) {
	  /*a function to classify an item as "active":*/
	  if (!x) return false;
	  /*start by removing the "active" class on all items:*/
	  removeActive(x);
	  if (currentFocus >= x.length) currentFocus = 0;
	  if (currentFocus < 0) currentFocus = (x.length - 1);
	  /*add class "autocomplete-active":*/
	  x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	  /*a function to remove the "active" class from all autocomplete items:*/
	  for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	  /*close all autocomplete lists in the document,
	  except the one passed as an argument:*/
	  var x = document.getElementsByClassName("autocomplete-items");
	  for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
		x[i].parentNode.removeChild(x[i]);
	  }
	}
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
	  closeAllLists(e.target);
  });
  }
  


// Fetch Random Drink
document.querySelector('.random-cocktail').addEventListener('click', getRandom)

let ingredientsArr = [];
let measurementsArr = [];

function getRandom() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks);
      drinkName = []
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

	  fadeIn()

	  ingredientsArr = [];
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
	return ingredientsArr;
}

// Fade In
function fadeIn() {
	document.querySelector('.fade-in').style.opacity = '1'
	document.querySelector('.fade-in').style.transition = 'opacity 2s'
}

// Maybe mess around with current and new drink name or something to do fade out on current image and fade in on new one

// Show features on page load
window.addEventListener("load", feature1)
window.addEventListener("load", feature2)
window.addEventListener("load", feature3)



// Featured 1
let f1IngredientsArr = [];
let f1MeasurementsArr = [];


function feature1() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks);

      drinkArray = data.drinks

	  for(let key in data.drinks[0]) {
		if(key.includes('strIngredient') && data.drinks[0][key] !== null) {
			f1IngredientsArr.push(data.drinks[0][key])
		}
	  }

	  for(let key in data.drinks[0]) {
		if(key.includes('strMeasure') && data.drinks[0][key] !== null) {
			f1MeasurementsArr.push(data.drinks[0][key])
		}
	  }

	  for(let i = 0; i < f1MeasurementsArr.length; i++) {
		for(let j = 0; j < f1IngredientsArr.length; j++) {
			if(i == j) {
				f1IngredientsArr[j] += ': ' + f1MeasurementsArr[i]
			}
		}
	  }
	  
	  console.log(f1IngredientsArr)

	  f1IngredientsArr.forEach(step => {
		const instruct = `<li>${step}<li>`;
		document.querySelector('.feature1-list').insertAdjacentHTML('beforeend', instruct);
	  })


      document.querySelector('.feature1-name').innerHTML = data.drinks[0].strDrink;
      document.querySelector('.feature1-image').src = data.drinks[0].strDrinkThumb
	  document.querySelector('.feature1-image').style.minWidth = '20rem'
      document.querySelector('.feature1-instructions').innerHTML = data.drinks[0].strInstructions;
	  

	  f1IngredientsArr = [];
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
	return ingredientsArr;
}

// Feature 1 Popup
function feature1Recipe() {
	document.querySelector('.feature1-list').style.display = 'inline-block'
	document.querySelector('.feature1-list').style.listStyle = 'none'
	document.querySelector('.feature1-instructions').style.display = 'block'

}

document.querySelector('.feature1-button').addEventListener('click', feature1Recipe)



// Featured 2
let f2IngredientsArr = [];
let f2MeasurementsArr = [];


function feature2() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks);

      drinkArray = data.drinks

	  for(let key in data.drinks[0]) {
		if(key.includes('strIngredient') && data.drinks[0][key] !== null) {
			f2IngredientsArr.push(data.drinks[0][key])
		}
	  }

	  for(let key in data.drinks[0]) {
		if(key.includes('strMeasure') && data.drinks[0][key] !== null) {
			f2MeasurementsArr.push(data.drinks[0][key])
		}
	  }

	  for(let i = 0; i < f2MeasurementsArr.length; i++) {
		for(let j = 0; j < f2IngredientsArr.length; j++) {
			if(i == j) {
				f2IngredientsArr[j] += ': ' + f2MeasurementsArr[i]
			}
		}
	  }
	  
	  console.log(f2IngredientsArr)

	  f2IngredientsArr.forEach(step => {
		const instruct = `<li>${step}<li>`;
		document.querySelector('.feature2-list').insertAdjacentHTML('beforeend', instruct);
	  })


      document.querySelector('.feature2-name').innerHTML = data.drinks[0].strDrink;
      document.querySelector('.feature2-image').src = data.drinks[0].strDrinkThumb
	  document.querySelector('.feature2-image').style.minWidth = '20rem'
      document.querySelector('.feature2-instructions').innerHTML = data.drinks[0].strInstructions;

	  f2IngredientsArr = [];
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
	return ingredientsArr;
}

// Feature 2 Popup
function feature2Recipe() {
	document.querySelector('.feature2-list').style.display = 'inline-block'
	document.querySelector('.feature2-list').style.listStyle = 'none'
	document.querySelector('.feature2-instructions').style.display = 'block'

}

document.querySelector('.feature2-button').addEventListener('click', feature2Recipe)

// Featured 3
let f3IngredientsArr = [];
let f3MeasurementsArr = [];


function feature3() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks);

      drinkArray = data.drinks

	  for(let key in data.drinks[0]) {
		if(key.includes('strIngredient') && data.drinks[0][key] !== null) {
			f3IngredientsArr.push(data.drinks[0][key])
		}
	  }

	  for(let key in data.drinks[0]) {
		if(key.includes('strMeasure') && data.drinks[0][key] !== null) {
			f3MeasurementsArr.push(data.drinks[0][key])
		}
	  }

	  for(let i = 0; i < f3MeasurementsArr.length; i++) {
		for(let j = 0; j < f3IngredientsArr.length; j++) {
			if(i == j) {
				f3IngredientsArr[j] += ': ' + f3MeasurementsArr[i]
			}
		}
	  }
	  
	  console.log(f3IngredientsArr)

	  f3IngredientsArr.forEach(step => {
		const instruct = `<li>${step}<li>`;
		document.querySelector('.feature3-list').insertAdjacentHTML('beforeend', instruct);
	  })


      document.querySelector('.feature3-name').innerHTML = data.drinks[0].strDrink;
      document.querySelector('.feature3-image').src = data.drinks[0].strDrinkThumb
	  document.querySelector('.feature3-image').style.minWidth = '20rem'
      document.querySelector('.feature3-instructions').innerHTML = data.drinks[0].strInstructions;

	  f3IngredientsArr = [];
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
	return ingredientsArr;
}

// Feature 3 Popup
function feature3Recipe() {
	document.querySelector('.feature3-list').style.display = 'inline-block'
	document.querySelector('.feature3-list').style.listStyle = 'none'
	document.querySelector('.feature3-instructions').style.display = 'block'

}

document.querySelector('.feature3-button').addEventListener('click', feature3Recipe)

// Popup transition
// Popup responsive to smaller screens

// Featured popup -> Take inner html of each respective feature name, ingredients, arr, and instructions and make them the inner html of the popup elements

// popup x out function

// popup styling

function xOut() {
	document.querySelector('.popup-container').style.display = 'none'
	document.querySelector('.popup-container').style.opacity = 0

}

document.querySelector('.x-button').addEventListener('click', xOut)

// fix x out reappearing T_____T