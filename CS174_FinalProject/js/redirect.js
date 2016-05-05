function goYelp()
{
	var restaurant = document.getElementById('inputRestaurant').value;
	var location = document.getElementById('inputLocation').value;
	var url = "http://www.yelp.com/search?find_desc=" + restaurant + "&find_loc="  + location + "%2C+CA%2C+US";
	window.open(url);
}

