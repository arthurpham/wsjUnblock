
## Make WSJ & NYTimes Great Again:

#### Get around the paywall for many Wall Street Journal, New York Times and Financial Times content

### Update in Apr 2017:
*	**Fact**: WSJ has an advertisement popping up *every single time* we read an article, too much!
*	**Idea**: After checking their code, I find the pop-up ad is triggered by a javascript file, so let's just block it, using the same logic that we blocked the NYTimes gateway javascript.
*	**Extra**: The pop-up ad will stay disappeared as long as the WSJ developers do not change the javascript names, I am sure they will at some point. So this is a practical but not ideal solution for right now.

### Update in Jan 2017:
*	**Fact**: WSJ has blocked `https://www.google.com` referer randomly on desktop.

*	**Idea**: I changed the referer to facebook or twitter, both are working great again:). The logic is that we can read the full WSJ article if we click through a twitter or facebook link of the article. So far they have not blocked these referers.

*	**Extra**: Add Financial Times `www.ft.com` to our list. FT and WSJ are using the same logic for paywall, so it can be accessed in the same way.

### How It Works as in July 2016:

#### For Wall Street Journal:
*  **Fact**: WSJ full content can be accessed if the content link is clicked from google search result page.

*  **Idea**: Set the following headers for the link you click:
	* `Referer: https://www.google.com`
	* `Cookie: <NONE>`

*  **Reference**: The logic is copied from [wsj-walljumper](https://github.com/hatboysam/wsj-walljumper)

#### For New York Times:
*  **Fact**: NYTimes pops up subscription window and blocks content view after you read 10 pieces/month, clearly they use Javascript to do the trick.

*  **Idea**:  Block those Javascript files from downloading :)

*  **Sugggestion For NYTimes Developers**: concatenate the minified Javascript files, and maybe attach a random string in your concatenated Javascript filename?

#### Interested in development process?
*	I wrote a blog [How to bypass WSJ and NYTimes paywalls?](http://blog.jinsongli.com/) about the details on my website.


### Install Instructions
*	click "clone or download", download zip. The downloaded file is an unpacked chrome extension, unzip it into a directory.
*	Visit `chrome://extensions` (via omnibox or menu -> Tools -> Extensions).
*	Enable Developer mode by ticking the checkbox in the upper-right corner.
*	Click on the "Load unpacked extension..." button.
*	Select the directory containing your *unpacked* extension.
*	Reference: [How to install an unpacked chrome extension](http://stackoverflow.com/questions/24577024/install-chrome-extension-not-in-the-store/24577660#24577660)


### License
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

For more information, please refer to <http://unlicense.org/>
