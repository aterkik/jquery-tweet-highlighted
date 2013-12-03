/*
 * TweetHighlighted - jQuery plugin that brings a 'tweet' button
 *                    when a text is selected.
 *
 */
(function ($) {
    $.fn.tweetHighlighted = function(options) {
        var settings = {}, classes;
        options = options || {};

        // html DOM element to use as a button
        settings.node = options.node || '<button type="button">Tweet</button>';
        // css class to add to the html node
        settings.cssClass = options.cssClass || 'tweet-me';
        // minimum length of the selected text for the tweet button to appear
        settings.minLength = options.minLength || 1;
        // maximum length of the selected text for the tweet button to appear
        settings.maxLength = options.maxLength || 144 * 4;
        // extra content to attach (mostly used to add URLs)
        settings.extra = options.extra || '';
        // twitter 'via' handle
        // (basically appends 'via @twitterhandle' to the tweet)
        settings.via = options.via || null;
        // arguments to pass to the window.open() function
        settings.popupArgs = options.popArgs || 'width=400,height=400,toolbar=0,location=0';

        // get an array of classes filtering out empty whitespaces
        classes = settings.cssClass.split(' ').filter(function(item) {
                                                        return item.length;
                                                      });
        settings._selector = '.' + classes.join('.');

        // event that fires when any non-empty text is selected
        var onTextSelect = function(selector, callback) {
            function getSelectedText() {
              if (window.getSelection) {
                    return window.getSelection().toString();
              } else if (document.selection) {
                return document.selection.createRange().text;
              } 
              return '';
            };

            // fires the callback when text is selected
            $(selector).mouseup(function(e) {
              var text = getSelectedText();
              if (text !== '') {
                callback(e, text);
              }
            });

            // removes the button when the selected text loses focus
            $(document).click(function(e) {
              var text = getSelectedText();
              if (text !== '') {
                e.stopPropagation();
              }
              else
                $(settings._selector).fadeOut(500).remove();
            });
        };

        var getTweetURL = function(text, extra, via) {
            var url = 'https://twitter.com/intent/tweet?text=';
            url += encodeURIComponent(text);

           if (extra)
                url += encodeURIComponent(' ' + extra);

            if (via)
                url += '&via=' + via;

            return url;
        };

        onTextSelect(this, function(e, text) {
            var btnExists = $(settings._selector).length, url;

            if (btnExists || text.length > settings.maxLength
                || text.length < settings.minLength)
                return;

            url = getTweetURL(text, settings.extra, settings.via);
            $(settings.node).addClass(settings.cssClass
             ).offset({top: e.pageY,
                       left: e.pageX}
             ).css({position: 'absolute',
                    cursor: 'pointer'}
             ).appendTo('body'
             ).fadeIn(500
             ).click(function(e) {
                 $(settings._selector).fadeOut(500).remove();
                 window.open(url, '_blank', settings.popupArgs);
             });
        });      
    };
})(jQuery);
