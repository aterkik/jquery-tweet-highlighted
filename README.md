jquery-tweet-highlighted
========================

A jQuery plugin that allows tweeting a user selected/highlighted text.

## Installation

Include script after the jQuery library.

```html
<script src="/path/to/jquery.tweetHighlighted.js"></script>
```

## Usage

### Simple usage:
```javascript
$('body').tweetHighlighted();
```

### Advanced usage:
Use any subset of the options below (all of the options are optional).

```javascript
$('body').tweetHighlighted({
                             // html node to use as the 'Tweet' button
                             node: '<a href="#"><img src="tweet.png" width="90px" height="30px" alt="tweet icon"></a>',
                             // class attribute to attach to the node
                             cssClass: 'btn btn-primary',
                             // minimum length of selected text needed to show the 'Tweet' button
                             minLength: 6,
                             // maximum length of selected text after which the 'Tweet' button is not shown
                             maxLength: 144 * 2,
                             // any extra string to attach to every tweet (mostly used to attach urls)
                             extra: '-- http://gitub.com/aterkik/jquery-tweet-highlighted',
                             // twitter 'via' handle (basically appends 'via @twitterhandle' to the tweet)
                             via: 'twitterhandle',
                             // arguments to pass to the window.open() function
                             popupArgs: 'width=600,height=600,toolbar=0,location=0'
                          });
```

## Contributing
Pull requests welcome!



                             
                             
