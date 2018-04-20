# Hybrid Publishing Research

[![Join the chat at https://gitter.im/consortium/hybrid-publishing-research](https://badges.gitter.im/consortium/hybrid-publishing-research.svg)](https://gitter.im/consortium/hybrid-publishing-research?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/consortium/hybrid-publishing-research.svg?branch=master)](https://travis-ci.org/consortium/hybrid-publishing-research)
[![Dependency Status](https://david-dm.org/consortium/hybrid-publishing-research.svg)](https://david-dm.org/consortium/hybrid-publishing-research)[![DOI](https://zenodo.org/badge/doi/10.5281/zenodo.19048.svg)](https://doi.org/10.5281/zenodo.19048)
[![Coverage Status](https://coveralls.io/repos/github/consortium/hybrid-publishing-research/badge.svg?branch=master)](https://coveralls.io/github/consortium/hybrid-publishing-research?branch=master)

This repository is the document collection of the consortium.io. It’s compiled in a redistributable way.
We’re hosting this on [https://research.consortium.io](https://research.consortium.io). If you just wish to download the documents, then find the files in the folder [dist/docs](https://github.com/consortium/hybrid-publishing-research/tree/master/dist/docs).

This is an experimental publishing system developed by the hybrid publishing consortium. Please keep in mind that this is a work in progress and that we are continuously adding new features. Check our [roadmap](#roadmap) and our [github issue tracker](https://github.com/consortium/hybrid-publishing-research/issues). If you reuse this code, then please commit and file a pull request so we can all benefit from your development.

For further information on our efforts to create open source software for public infrastructures within publishing, visit the consortium website [https://consortium.io/about](http://www.consortium.io/about).

## Features

The Hybrid Publishing Research system features:

    - a dynamic webService for viewing documents
    - a dynamic validation for
        - html5
        - javascript
        - css
        - dublin core 
    - a dynamic index generation

## Requirements for local development or local viewing

    - tested with Ubuntu, Mac OS
    - git
    - GitHub knowhow
    - commandline knowhow
    - a text editor (i.e. sublimetext)
    - a browser
    - node.js (tested with node.js 0.10.37)
    - grunt (tested with grunt 0.4.5)
    - bower 

## Installation

This repository is equipped with a node.js setup, so that you can **work with the documents locally on your computer**. If you want to use this system, change, add documents or develop the display code, you need to apply the following installation instruction:

**Install [npm](https://www.npmjs.com/)** for your operating system. We suggest that you *not* use the (outdated) node version from your default apt repository on Debian/Ubuntu. We use [nodesource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) to install the latest version of npm and node.js. If you're using Mac OS, then download and install the NPM Install Package from [nodejs.org](https://nodejs.org/download/).

To clone the documents on your computer, if you don’t have git yet, you need to **install git**. 

If you’re using Ubuntu/Debian then type the following command:

    sudo apt-get install git

If you’re using Mac OS then follow the installation instruction provided [here](https://git-scm.com/downloads).

After completing git installation, you need to **clone the repository**. We use the following command line but you can use a graphical git front-end as well ( [mac](https://help.github.com/categories/github-for-mac/) / [window](https://help.github.com/categories/github-for-windows/) application ):
    
    git clone https://github.com/consortium/hybrid-publishing-research.git

At that point, you have installed the app that contains the documents and the viewing- and validation code.
You now need to install all required dependencies in order for the system to work. This is quite easy: all you need is to copy&paste the following commands in your terminal.

Open your terminal and change directory to hybrid-publishing-research, running the command `cd` and the directory path:

    cd hybrid-publishing-research/

Now it’s time to **install grunt** globally ( = for all users on the system).
Copy&paste the following command in your terminal:

    sudo npm install -g grunt-cli

You need administrative access to install npm packages globally, so it will ask you your password: put your computer login password. (don’t worry if it doesn’t show what you type, it is normal, type it and press enter)

**Install all other node dependencies** (non-globally) via npm, with this command:

    npm install

(if you have error messages, saying you don’t have the right to access, go to the [troubleshouting](#troubleshouting) section)

All packages will automatically be installed in the folder `/node_modules`. With all the node packages installed, all you need now is to install all the front-end libraries that are used in the browser. In order to do this, **use grunt to load all libraries and generate all needed files**. 
Grunt will do three things:
* Grunt upadtes the packages, prepares and installs the front-end libraries (makes one small file out of the different stylesheets and javascripts files).
* Grunt validates the files
* Grunt runs the metaparser to get all the metadata and the datas into one file, it generates the index.html.
Type the following command:

      grunt 

Now you have all the files up-to-date and ready for editing (the modifications will be saved on your local version, until you push them in GitHub).
You can now **use grunt to visualise the local files in your browser** (not yet published online). To visualise the files, type the following command in the terminal:

      grunt serve

A browser window will now open automatically, in which you will be able to visualise the documents:  [http://localhost:8080](http://localhost:8080)

To exit the webserver type `ctrl-c` in the terminal.

If you have any problem, don’t hesitate to report an issue on github or send us an email.

### Troubleshouting

If you run `npm install` in the terminal (in the repository folder) and it doesn’t work, no panic: 

make sure you are in the repository folder, and if you are, run:

    rm -rf node_modules/

and then start back where you where.

## Edit or add content

Have a look at the content of your git repository (in your operating files, like Finder in Mac). Amongst the folders, you can see a folder `dist`, and in this folder another one called `docs`. In the folder `docs` is a folder called `_template`, that you can copy, rename and edit to create a new document.
Note: never use spaces in the folders and files names

This repository is equipped with a node.js setup, so that you can serve the documents in your local network. Integrated in node.js is a code validator, which checks your edited or newly added html documents for errors and inconsistencies. We are using [grunt](http://gruntjs.com/) and several plugins to trigger building, validation and delivering tasks.

> THIS STEP IS OPTIONAL: (if you want to share your modifications with others, you can publish it on a branch, which will not be published on the site by the whole system)

> You need to install this setup described above in the installation section. Once you have done this, create a new git branch with the following command:

>     git checkout -b mybranch

Edit the files with your favourite text editor. You can copy the template folder as a starting point for your new document. Use:

    cp -r dist/docs/_template dist/docs/mynewdoc

Remember only one html document is allowed per folder. All other assets should be placed in sub folders of assets (for instance in a new folder `fonts` for fonts, or `video` for videos). Once you have written your new document (or edited an old one), then start a validation round to check if your new added content is valid. 
If you only worked on the html files, type:

    grunt index

It will validate your new files in the terminal, and if everything is ok it will generate the visualisation of the new files in the browser.

Every html document that is in the dist/docs folder (ommitting _template), will be checked by the validator in two steps.

Step one checks the html5 validity described by the [w3c](http://validator.w3.org/). This step will show you if your document has unvalid code according to the html5 standard. This will be signalled to you in red in the command line output. See following example:
    
    Validation started for.. dist/docs/mynewdoc/x-html-example.html
    Running "validation:files" (validation) task

    1=> "& did not start a character reference. (& probably should have been escaped as &amp;.)" Line no: 33
    2=> "Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools)." Line no: 47
    3=> "Saw < when expecting an attribute name. Probable cause: Missing > immediately before." Line no: 65
    4=> "A slash was not immediately followed by >." Line no: 65
    5=> "End tag had attributes." Line no: 65

For advanced users, if it really fails, you can override validation directives globally. Read the manual (relaxerror) for [grunt-html-validation](https://www.npmjs.com/package/grunt-html-validation) and edit the Gruntfile accordingly. We are using this to override errors on Dublin Core metadata.

The second step validates the content according to the [Dublin Core meta data standard](http://dublincore.org/metadata-basics/). The output in the terminal could look like this:

    Checking x-html-example.html for required meta data: 
    >> title
    >> creator
    >> subject
    >> abstract
    >> missing entry: date
    >> type
    >> format
    >> language
    >> uRL
    >> rights
    >> No of errors: 1

If the command `grunt` or `grunt index` shows errors in the terminal (in red), fix the errors in your files at the indicated lines (via your text editor) and run the validation process again with `grunt` or `grunt index`.

When everything is valid, the terminal should say, in green: done without errors!

After you have successfully debugged your newly added content, they are ready to be published online.
If you are working on a branch, commit your branch to the repository and file a pull request. If you are working in the main ("master") repository, push or file a pull request if you are not yet a collaborator of the project. This way the new document can be added to the master branch and the consortium website. Please make sure to add descriptive commit notes to explain what you changed. 

If you are working with GitHub’s application, select, commit and sync through the interface.
You can also do it with the Terminal with the following commands (replace the name “mynewdoc” with the name of your folder):
    
    git add dist/docs/mynewdoc*

    git commit -m 'Added a cool index on microbreweries - This is still a draft - looking 
    for people who want to help me collect'

    git push origin mybranch

and then go to [https://github.com/consortium/hybrid-publishing-research](https://github.com/consortium/hybrid-publishing-research) and file a pull request.
(if you need help using git commands see the git reference on [https://git-scm.herokuapp.com/](https://git-scm.herokuapp.com/) or contact us)

Your files are now online, on GitHub and on the website (refreshed every five minutes)!

## Testing

We're testing html validity on all documents as a part of the publishing pipeline. Right now we are checking rather simply for meta data described by the [dublin core standard](http://purl.org/dc/elements/1.1/). Both test are part of the build process. The build process is tested on command line before index is generated and fails hard if the documents are not valid. In future we maybe add a switch. Additionally on every git commit we build the master branch on [travis-ci](https://travis-ci.org/consortium/hybrid-publishing-research).

On the roadmap is unit test on the code as well. This will also be part of the publishing pipeline. See additional documentation in dist/docs/documentation for more information or better help improving existing ones.

## Grunt commands

These are most commonly used commands:

    grunt (default)         -  executes building, validation and indexing
    grunt serve             -  start webservice

Other grunt task which you will normally not need:

    grunt index                 -  meta command build an index out of all resources
    grunt build                 -  meta command do all building tasks
    grunt validation            -  html validation
    grunt bower-install-simple  -  install bower dependencies
    grunt bower                 -  extract all files from bower_components and copy to /lib
    grunt bower_concat          -  concat js and css files
    grunt cssmin                -  css minification
    grunt js                    -  meta command do all "js" related tasks
    grunt jshint                -  hint js files
    grunt uglify                -  minify js
    grunt qunit                 -  do unit testing 
    grunt metaparser            -  create an index based on metadata
    grunt execute               -  executes createindex.js 
    grunt gitfetch              -  does git fetch
    grunt gitreset              -  resets git to latest commit origin/master 
    grunt upgrade               -  meta command upgrade all to latest commit (deleting local changes!)

## File structure

This is a descriptive view of the file structure:

    .
    ├── bower_components                ==> frontend source libraries, managed by bower
    │   ├── angular                         source frontend library
    │   ├── hybridstrap                     source frontend library
    │   └── jquery                          source frontend library
    ├── bower.json                      ==> bower package file describing the dependencies
    ├── cache                           ==> temporary cache
    ├── CONTRIBUTING.md                 ==> who did contribute
    ├── createindex.js                  ==> external script gets executed by grunt - creates an index
    ├── css                             ==> source css folder
    │   └── main.css                        custom css code (edit this!)
    ├── dist                            ==> docroot for webserver
    │   ├── css                         ==> public css folder
    │   │   └── all.min.css                 dynamic main css files with ALL necessary directives 
    │   ├── docs                        ==> document repository 
    │   ├── fonts                       ==> fonts repository
    │   ├── gitinfo.json                    a dynamic json file describing git version will be loaded by index.html
    │   ├── index.html                      the index.html
    │   ├── index.json                      a dynamic json file descibing all available documents
    │   ├── js                              public js folder
    │   │   ├── all.min.js                  a dynamic concatenated js file with ALL code
    │   │   └── all.min.js.map              map file for all.min.js
    │   └── static                      ==> static content
    │       ├── EFRE-logo.png
    │       ├── EuropafoerdertNds_farbig.png
    │       ├── favicon.gif
    │       ├── hpc-logoxx.png
    │       └── logo_leuphana-2.png
    ├── extra                           ==> extra folder to distribute 
    │   ├── researchviewer.service          systemd-script for ubuntu
    │   └── researchviewer.conf             startup-script for ubuntu 
    ├── Gruntfile.js                        Gruntfile with all tasks
    ├── js                              ==> source js folder
    │   └── consortium-viewer.js            custom js code (edit this!)
    ├── lib                             ==> dynamic folder for grunt bower managed by grunt
    ├── LICENSE                             the license
    ├── metadata.json                       dynamic json describing meta data - generated by grunt-metaparser
    ├── node_modules                    ==> node folder managed by npm
    ├── package.json                        npm package file describing npm dependencies
    ├── README.md                           this file
    ├── test                            ==> automatic tests N/a yet
    ├── validation-report.json              dynamic file generated by grunt-validator
    └── validation-status.json              dynamic file generated by grunt-validator

## Metadata

    <!-- Metatags -->
    <meta charset="utf-8" /> <!-- doesn’t need editing -->
    <meta name="generator" content="a-machine" /> <!-- doesn’t need editing -->
    <meta name="keywords" content="a-machine, hybrid publishing consortium, template"/> <!-- edit: each keyword separated by a comma (10 is a good number) -->
    <meta name="description" content="About your document: description"/> <!-- edit: text, sentences -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <!-- doesn’t need editing -->
    <meta name="viewport" content="width=device-width, initial-scale=1"/> <!-- doesn’t need editing -->
    <!-- Dublin Core -->
    <meta name="DC.title" content="My document title"/> <!-- doesn’t need editing -->
    <meta name="DC.contributor" content="the author: a person, an organization, or a service. For each author make a new meta author"/> <!-- edit - one meta tag per author -->
    <meta name="DC.creator" content="creator of this HTML document (not the author, just the person who generated the file)" /> <!-- edit -->
    <meta name="DC.subject" content="keywords, key phrases, or classification codes, best using controlled vocabularies"> <!-- edit: comma separated (can be more than the keywords) -->
    <meta name="DC.description.abstract" content="About the document: description abstract"/> <!-- edit: copy of the desciption -->
    <meta name="DC.date" content=""/> <!-- edit: yyyy-mm-dd -->
    <meta name="DC.type" content="The nature or genre of the report, research paper, article, essay, etc."/> <!-- edit: choose one -->
    <meta name="DC.format" content="text/html"/> <!-- doesn’t need editing -->
    <meta name="DC.language" content="eng"/> <!-- if edit ISO 639-3 standard: http://en.wikipedia.org/wiki/ISO_639:a -->
    <meta name="DC.identifier.URL" content="http://consortium.io"/> <!-- if edit: put a url -->
    <meta name="DC.rights" content="http://www.consortium.io/copyright"/> <!-- if edit: put a url -->
    <meta name="DC.identifier" content="ISBN, ISSN etc"/> <!-- edit, and if no identifier it will be generated -->
    <meta name="DC.publisher" content="Hybrid Publishing Consortium. Entity responsible for making the document available"/> <!-- edit: for each publisher a new meta tag -->
    <meta name="DC.bibliographicCitation" content="use a Chicago Manual of Style citation"/> <!-- doesn’t need editing -->
    <link rel="SCHEMA.DC" href="http://purl.org/dc/elements/1.1/"/> <!-- doesn’t need editing -->
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="../../css/all.min.css"/>
    <link rel="stylesheet" type="text/css" href="../../fonts.css"/>
    <!-- Title -->
    <title>My document title</title>
    <!-- Favicons -->
    <link rel="shortcut icon" href="../../favicon.ico" />

## Roadmap
    
    0.0.1 DATA GLOVE: Getting Initial version stable
    0.0.2 FREE ADVISE: Redo validation, make URLs, data structure and folder layout not as stupid as they are now and more 
    0.0.3 Completely change viewing logic with new data structure and api delivery
    0.0.4 Create http-api-grunt-trigger for upgrade and other things

## To do
    see github issues

## Coding style

    Indentation: 4 characters, no tabs use spaces.

Recommended style guides: [https://code.google.com/p/google-styleguide/](https://code.google.com/p/google-styleguide/)

## License

    Dossiers:

        If not mentioned otherwise in the document the text is licensed
        under the Creative Commons CC-BY-DE 3.0 License.

        Copyright holder of text and images are by their authors and owners

    Viewer Logic:

        The MIT License (MIT)
        
        Copyright (c) 2015 Hybrid Publishing Consortium
            Johannes Amorosa <amorosa@posteo.de>
            Christina Kral
            Loraine Furter
            Simon Worthington
            

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in
        all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        THE SOFTWARE.

    Fonts: (SIL Open Font License, 1.1)
        Bagnard, Cotham, Reglo by Sebastien Sanfilippo
        NotCourierSans by OSP Foundry
        Charter by Matthew Carter
        Lato by Łukasz Dziedzic
        Montserrat by Julieta Ulanovsky

    Software used:
    
        Copyright (c) the copyright owners

        angularjs bootstrap jquery bower grunt node underscore express mustache
        socket.io assemble grunt grunt-autoprefixer grunt-contrib-connect 
        grunt-contrib-cssmin grunt-contrib-jshint grunt-contrib-qunit grunt-contrib-uglify 
        grunt-contrib-watch grunt-fileindex grunt-html-sitemap grunt-bower-concat 
        grunt-html-validation grunt-bower grunt-sass grunt-zip node-sass
