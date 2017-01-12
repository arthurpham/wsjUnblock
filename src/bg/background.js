
// new http header parameters to override
var newHeader = {
	referer: {
		name: "Referer",
		value: "https://www.twitter.com", // or "https://www.facebook.com"
	},
	cookie: {
		name: "Cookie",
		value: ""
	},
	useragent: {
		name: "User-Agent",
		value: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13D15 Safari/601.1"
	},
	cachecontrol: {
		name: "Cache-Control",
		value: "max-age=0"
	}
};

// sites that we want to access
var urls = {
	wsj: "*://*.wsj.com/*",
	ft: "*://*.ft.com/*",
	nyt: {
		gateway: "*://*.com/*mtr.js"
	}
};

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		console.log( "we are going to block nytimes gateway javascript" );
		
		return { cancel: true };
	}, {
		urls: [ urls.nyt.gateway ],
		// target is script
		types: [ "script" ]
	},
	[ "blocking" ]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function( details ) {
		console.log( "we are going to override request headers" );

		// remove existing referer and cookie
		for ( var i = 0; i < details.requestHeaders.length; i++) {
			if ( details.requestHeaders[i].name === newHeader.referer.name || details.requestHeaders[i].name === newHeader.cookie.name ) {
		        details.requestHeaders.splice(i, 1);
		        i--;
			}
		}

		// add new referer
		details.requestHeaders.push( newHeader.referer );
		// change user agent
		details.requestHeaders.push( newHeader.useragent );
		// remove cache
		details.requestHeaders.push( newHeader.cachecontrol );

		return { requestHeaders: details.requestHeaders };
	}, {
		urls: [ urls.wsj, urls.ft ],
		// target is the document that is loaded for a top-level frame
		types: [ "main_frame" ]
	},
	[ "blocking", "requestHeaders" ]
);
