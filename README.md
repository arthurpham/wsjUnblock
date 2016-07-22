
## Make WSJ & NYTimes Great Again:
#### Get around the paywall for many Wall Street Journal and New York Times content


### How The Logic Works as in July 2016:

#### For Wall Street Journal:
*  **Fact**: WSJ full content can be accessed if the content link is clicked from google search result page.

*  **Idea**: Set the following headers for the link you click:
	* `Referer: https://www.google.com`
	* `Cookie: <NONE>`

#### For New York Times:
*  **Fact**: NYTimes pops up subscription window and blocks content view after you read 10 pieces/month, clearly they use Javascript to do the trick.

*  **Idea**:  Block those Javascript files from downloading :)

*  **Sugggestion For NYTimes Developers**: concatenate and minify your Javascript files, and maybe attach a random string in your concatenated Javascript filename?

### Instructions
[How to install a unpacked chrome extension](http://lifehacker.com/5919997/how-to-install-extensions-that-arent-from-the-official-chrome-web-store)

### License
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

For more information, please refer to <http://unlicense.org/>
