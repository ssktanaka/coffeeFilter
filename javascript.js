function main() {
	buildProducts(coffeeProductsArray);
	showProducts();
}

function buildProducts(coffeeProductsArray){
	//get section coffee div
	var section = document.getElementById("coffee_products");
	var allCoffeeDivs = "";
	//set up divs for individual coffee products
	for (var i = 0; i < coffeeProductsArray.length; i++) {
		var newDiv = "<div id='"+ coffeeProductsArray[i].Id + "' class='gal4'></div>";
		allCoffeeDivs = allCoffeeDivs.concat(newDiv);
	}
	section.innerHTML = allCoffeeDivs;	
	//iterate over coffee array, and fill in each div tag with coffee information
	for (var i = 0; i < coffeeProductsArray.length; i++) {
		var myCurrentTag = document.getElementById(coffeeProductsArray[i].Id);
		var productInfo;
		//add all relevant info for each coffee product
		productInfo = "<img src='CoffeePhotos/CoffeeProducts/" + coffeeProductsArray[i].Id + ".jpg' alt='Coffee Beans Product'>";
		productInfo = productInfo.concat("<div id = 'CoffeeName'><h4>" + coffeeProductsArray[i].Name + "</h4></div>");
		productInfo = productInfo.concat("<div id = 'CoffeeVariety'>Variety: " + coffeeProductsArray[i].Variety + "</div>");	
		productInfo = productInfo.concat("<div id = 'CoffeeRegion'>Region: " + coffeeProductsArray[i].Region + "</div>");	
		productInfo = productInfo.concat("<div id = 'CoffeeType'>" + coffeeProductsArray[i].Type + "</div>");	
		productInfo = productInfo.concat("<div id = 'CoffeePrice'><p>Price: €" + coffeeProductsArray[i].Price + "</p></div>");	
		productInfo = productInfo.concat("<button type='button' class = 'btn btn-primary'>Add to Cart</button>");
		myCurrentTag.innerHTML = productInfo;
		//add region class
		if (coffeeProductsArray[i].Region == "Asia") {
			myCurrentTag.className = myCurrentTag.className + " asia";
		} else if (coffeeProductsArray[i].Region == "Africa") {
			myCurrentTag.className = myCurrentTag.className + " africa";
		} else if (coffeeProductsArray[i].Region == "Oceania") {
			myCurrentTag.className = myCurrentTag.className + " oceania";
		} else if (coffeeProductsArray[i].Region == "Latin America") {
			myCurrentTag.className = myCurrentTag.className + " latinamerica";
		} else {
			break;
		}
		//add decaf or regular class
		if (coffeeProductsArray[i].Type == "Regular") {
			myCurrentTag.className = myCurrentTag.className + " regular";
		} else if (coffeeProductsArray[i].Type == "Decaf") {
			myCurrentTag.className = myCurrentTag.className + " decaf";
		} else {
			break;
		}
	}
}

function showProducts() {
	var products = document.getElementsByClassName("gal4");
	//iterate over each product div, and display product inline
	for(var i = 0; i < products.length; i++) {
    	products[i].style.display = "inline";
	}	
}

function filter() {
	var updatedCoffeeProductsArray = [];
	//check first if price radio button is checked, because then list must be reordered
    var priceChecked = checkPriceStatus();
    //if price radio button is checked, create new sorted coffee products array and build a new display
	if (priceChecked) {
		updatedCoffeeProductsArray = sortByPrice(coffeeProductsArray);
		buildProducts(updatedCoffeeProductsArray);
		showProducts();
	}
	//Get product elements with the gal4 class
	var elems = document.getElementsByClassName("gal4");
	//iterate over each coffee product
	for(var i = 0; i < elems.length; i++) {
	 	//Set every product equal to display = none
    	elems[i].style.display = "none";
		var regionStatus = checkRegion(elems[i]);
		var coffeeTypeStatus = filterByCoffeeType(elems[i]);
		displayFilteredProducts(regionStatus, coffeeTypeStatus, elems[i]);
	}
}
 
function checkRegion(elems) {
	var region = document.getElementById("regionDropdown");
	var regionValue = region.options[region.selectedIndex].value;
	//If element contains selected region, return true for that region
	if (regionValue == "") {
		return true;
	} else if(elems.classList.contains(regionValue)) {
		return true;
	} else {
		return false;
	}
}

function filterByCoffeeType(elems){
	var decaf = document.getElementById("decafCheckbox");
	var regular = document.getElementById("regularCheckbox");
	// Return true if element matches checkbox status
	if (regular.checked && decaf.checked) {
		return true;
	} else if (regular.checked && elems.classList.contains(regular.value)) {
 		return true;
 	} else if (decaf.checked && elems.classList.contains(decaf.value)){
		return true;
 	} else if (!regular.checked && !decaf.checked){
 		return true;
 	} else {
 		return false;
 	}
}

function checkPriceStatus() {
	var priceAscend = document.getElementById("priceAscend");
	var priceDescend = document.getElementById("priceDescend");
	//check if price checkbox is checked. return state of checkbox.
	if (priceAscend.checked) {
		return true;
	} else if (priceDescend.checked){
 		return true;
 	} else {
 		return false;
 	}
}

function displayFilteredProducts(regionStatus, coffeeTypeStatus, elems) {
	//if regionStatus and coffeeTypeStatus are both true, show element
	if (regionStatus && coffeeTypeStatus){
		elems.style.display = "inline";
	} else {
		elems.style.display = "none";
	}
}

function sortByPrice(coffeeProductsArray) {
	var priceAscend = document.getElementById("priceAscend");
	var priceDescend = document.getElementById("priceDescend");
	//depending on which box is checked, sort coffeeProductsArray in ascending or descending order
	if (priceAscend.checked) {
		coffeeProductsArray.sort(function(a, b){
 			return a.Price-b.Price;
		})
 	} else if (priceDescend.checked) {
		coffeeProductsArray.sort(function(a, b){
			return b.Price-a.Price;
		})
 	}
 	return coffeeProductsArray;
}


function clearFilters() {
	//Get product elements with the gal4 class
	var elems = document.getElementsByClassName("gal4");
	//iterate over all gal4 elements and switch all displays to inline
	for(var i = 0; i < elems.length; i++) {
		elems[i].style.display = "inline";
	}
	//Uncheck decaf and regular boxes, clear region dropdown, uncheck price boxes
	document.getElementById("decafCheckbox").checked = false;
	document.getElementById("regularCheckbox").checked = false;
	document.getElementById("regionDropdown").selectedIndex = "0";
	document.getElementById("regionDropdown").selectedIndex = "0";
	document.getElementById("priceAscend").checked = false;
	document.getElementById("priceDescend").checked = false;
}

