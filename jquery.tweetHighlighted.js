/*
 * TweetHighlighted - jQuery plugin that brings a 'tweet' button
 *                    when a text is selected.
 *
 */
(function ($) {
    $.fn.tweetHighlighted = function(options) {
        var settings = {};
        options = options || {};
        // minimum length of the selected text for the tweet button to appear
        settings.minLength = options.minLength || 8;
        // maximum length of the selected text for the tweet button to appear
        settings.maxLength = options.maxLength || 144 * 2;
        // twitter via
        settings.via = options.via || '';
        settings.node = options.node || '<button type="button">Tweet</button>';
        // css class
        settings.cssClass = options.cssClass || 'tweet-me';
        // extra content to attach (mostly the current URL)
        settings.extra = options.extra || '';

        var classes = settings.cssClass.split(' ').filter(
                                                  function(item) {
                                                    return item.length;
                                                  });
        settings.selector = '.' + classes.join('.');

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
                $(settings.selector).fadeOut(500).remove();
            });
        };

        onTextSelect(this, function(e, text) {
            var url,
                btnExists = $(settings.selector).length;

            if (btnExists || text.length > settings.maxLength
                || text.length < settings.minLength)
                return;

            url = 'https://twitter.com/intent/tweet?via=' + settings.via;
            url += '&text=' + encodeURIComponent(text) + ' ' + settings.extra;

            $(settings.node).addClass(settings.cssClass
             ).offset({top: e.pageY,
                       left: e.pageX}
             ).css({position: 'absolute',
                    cursor: 'pointer'}
             ).appendTo('body'
             ).fadeIn(500
             ).click(function(e) {
                 $(settings.selector).fadeOut(500).remove();
                 window.open(url, '_blank', 'width=400,height=400,toolbar=0,location=0');
             });
        });      
    };
})(jQuery);
