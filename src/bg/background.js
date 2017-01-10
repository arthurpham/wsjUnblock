
var wsj = {
	url: "*://*.wsj.com/*",
	referer: {
		name: "Referer",
		value: "https://t.co/ZKs3xDMZi8",
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

var nyt = {
	gateway: "*://*.com/*mtr.js"
};

chrome.webRequest.onBeforeRequest.addListener(
	function() {
		console.log( "we are going to block nytimes gateway javascript" );
		
		return { cancel: true };
	}, {
		urls: [ nyt.gateway ],
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
			if ( details.requestHeaders[i].name === wsj.referer.name || details.requestHeaders[i].name === wsj.cookie.name ) {
		        details.requestHeaders.splice(i, 1);
			}
		}

		// add new referer
		details.requestHeaders.push( wsj.referer );
		details.requestHeaders.push( wsj.useragent );
		details.requestHeaders.push( wsj.cachecontrol );

		return { requestHeaders: details.requestHeaders };
	}, {
		urls: [ wsj.url ],
		// target is the document that is loaded for a top-level frame
		types: [ "main_frame" ]
	},
	[ "blocking", "requestHeaders" ]
);
