

function doStuff(terms, near) {

var auth = {
				//
				// Update with your auth tokens.
				//
				consumerKey : "6bYY1U8dhgFt17noBW5NXQ",
				consumerSecret : "LXEV5iVj-Azb12ub7G8kaFWpK5Q",
				accessToken : "tX6UzxaDaewFyriSB902mFFs4EDUF6Lx",
				// This example is a proof of concept, for how to use the Yelp v2 API with javascript.
				// You wouldn't actually want to expose your access token secret like this in a real application.
				accessTokenSecret : "YpjvnyGiU5JRb6RaPrl0LmmVTjg",
				serviceProvider : {
					signatureMethod : "HMAC-SHA1"
				}
			};

	var accessor = {
		consumerSecret : auth.consumerSecret,
		tokenSecret : auth.accessTokenSecret
	};

	parameters = [];
	parameters.push(['term', terms]);
	parameters.push(['location', near]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	var message = {
		'action' : 'http://api.yelp.com/v2/search',
		'method' : 'GET',
		'parameters' : parameters
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);

	var parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
	console.log(parameterMap);

	$.ajax({
		'url' : message.action,
		'data' : parameterMap,
		'cache' : true,
		'dataType' : 'jsonp',
		'jsonpCallback' : 'cb',
		'success' : function(data, textStats, XMLHttpRequest) {
			console.log(data);

			//$("body").append(output);
			getImage(data.businesses);
		}
	});
};

$( "#target" ).submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});

function getImage(businesses) {
	console.log(Math.floor((Math.random()*100)% businesses.length));
	var elem = businesses[Math.floor((Math.random()*100)% businesses.length)];
        $('body').append('<img class="theImg" height="120" width="120" src="' + elem.image_url + '"/>')
        $('body').append('<br>')
        $('body').append('<span>' + elem.name + '<span/>')
        $('body').append('<br>')
        $('body').append('<span>' + elem.location.display_address + '<span/>')
        $('body').append('<br>')
        $('body').append('<span>' + elem.display_phone + '<span/>')
        $('body').append('<br>')
		$('body').append('<img class="theImg" src="' + elem.rating_img_url + '"/>')
		$('body').append('<br>')
        $('body').append('<span>"' + elem.snippet_text + '"<span/>')
        $('body').append('<br>')
		$('body').append('<br>');
}

$('#editingForm').submit(function(event)
{
  alert("abc");
event.preventDefault(); // if you want to disable the action
  return false;

});

doStuff("food", "san+francisco");

doStuff("active+life", "san+francisco");