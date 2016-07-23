var REFERER_KEY = "Referer";
var REFERER_VAL = "https://www.google.com";
var COOKIE_KEY = "Cookie";
// nyt gateway javascript
var GATEWAY_URL = "*://*.com/*mtr.js"

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		console.log( "we are going to block nytimes gateway javascript" );
		
		return { cancel: true };
	}, {
		urls: [ GATEWAY_URL ],
		// target is script
		types: [ "script" ]
	},
	[ "blocking" ]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function( details ) {
		console.log( "we are going to update wsj request headers & remove cookie" );

		// remove existing referer and cookie
		for ( var i = 0; i < details.requestHeaders.length; i++) {
			if ( details.requestHeaders[i].name === REFERER_KEY || details.requestHeaders[i].name === COOKIE_KEY ) {
		        details.requestHeaders.splice(i, 1);
			}
		}

		// add new referer
		details.requestHeaders.push({ name: REFERER_KEY, value: REFERER_VAL });

		return { requestHeaders: details.requestHeaders };
	}, {
		urls: [ "*://*.wsj.com/*" ],
		// target is the document that is loaded for a top-level frame
		types: [ "main_frame" ]
	},
	[ "blocking", "requestHeaders" ]
);
