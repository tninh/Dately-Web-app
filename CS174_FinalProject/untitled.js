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
var parameters = [];
var message = {
	'action' : 'http://api.yelp.com/v2/search',
	'method' : 'GET',
	'parameters' : parameters
};

var parameterMap;


function initYelpReq(tems, near) {
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


	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);

	parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

	//console.log(parameterMap);
	};

function getMoreStuff(tems, near) {
	initYelpReq(tems,near);

	$.ajax({
		'url' : message.action,
		'data' : parameterMap,
		'cache' : true,
		'dataType' : 'jsonp',
		'jsonpCallback' : 'cb',
		'success' : function(data, textStats, XMLHttpRequest) {
			console.log('Yep query successful');		
			console.log(data);
			//var output = JSON.stringify(data);
			//$("body").append(output);
			getImage(data.businesses);
		}
	});
	parameters = [];
}

$( "#asd" ).click(function( event ) {
	  event.preventDefault();
  alert( "Handler for .submit() called." );
});

/*
$("#target" ).submit(function( event ) {
	  alert( "Handler for .submit() called." );	
	var keyTerms = $( "#keyTerms" ).val();
	var location = $( "#loc" ).val();
	console.log('ho');
  getMoreStuff(keyTerms,location);
});*/

function getImage(businesses) {
	businesses.forEach(function(elem) {
        $('body').append('<img id="theImg" src="' + elem.image_url + '"/>')
      });
}


