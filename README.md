# loader-handle

CommonJs Micro library to start and stop page loading spinner with opacity transition

## Installation

    $ npm install loader-handle

## Setting up

You need to set up actual spinner for site. [spin.js](https://github.com/fgnass/spin.js/ ) is  great fit.

In order to get good initial page load exprerience, inline minified spin.js source to index.html and start it pinning right away.

Then make sure you load external CSS and javascript files with non-blocking manner. [LoadCSS](https://github.com/filamentgroup/loadCSSLoadCSS) and [LoadJS](https://github.com/filamentgroup/loadJS) are good choices.

Basic example of index.html

    $ <html>
    $ <head>
    $   .... head stuff ...
    $   do not load css or JS here
    $ </head>
    $ <body>
    $ <div id="app-content"></div>
    $ <div id="loading-spinner"></div>
    $ <script type="text/javascript">
    $   ... inlined spin.min.js
    $   ... then start spinner here
    $   ... and then load css and script files async (including loader-handle)
    $ </script>
    $ </body>

## loader handle usage

After You application is loaded and first view is rendered, you can stop loading spinner:

    $ var loadSpinner = require('loader-handle');
    $ loadSpinner.stop();

To start spinner again:

    $ loadSpinner.start();

callback to start and stop function is optional, it will be called ~ when opacity transformation ends.

## example

Example index.html can be found [here](https://github.com/paharju/loader-handle/tree/master/src/examples/)


