
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
	cachecontrol: {
		name: "Cache-Control",
		value: "max-age=0"
	}
};

// sites that we want to access
var sites = {
	wsj: {
		url: "*://*.wsj.com/*",
		js: "*://*/*cxense-candy.js" // this one causing a pop up advertisement for every article
	},
	ft: {
		url: "*://*.ft.com/*",
	},
	nyt: {
		js: "*://*.com/*mtr.js" // this one causing a pop up asking for subscription
	}
};

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		console.log( "we are going to block some low energy javascripts" );
		
		return { cancel: true };
	}, {
		urls: [ sites.nyt.js, sites.wsj.js ],
		// target is script
		types: [ "script" ]
	},
	[ "blocking" ]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function( details ) {
		console.log( "we are going to override some request headers" );

		// remove existing referer and cookie
		for ( var i = 0; i < details.requestHeaders.length; i++) {
			if ( details.requestHeaders[i].name === newHeader.referer.name || details.requestHeaders[i].name === newHeader.cookie.name ) {
				details.requestHeaders.splice(i, 1);
				i--;
			}
		}

		// add new referer
		details.requestHeaders.push( newHeader.referer );
		// remove cache
		details.requestHeaders.push( newHeader.cachecontrol );

		return { requestHeaders: details.requestHeaders };
	}, {
		urls: [ sites.wsj.url, sites.ft.url ],
		// target is the document that is loaded for a top-level frame
		types: [ "main_frame" ]
	},
	[ "blocking", "requestHeaders" ]
);
