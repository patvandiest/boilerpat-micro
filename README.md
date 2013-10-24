# Boilerpat Micro

Boilerpat Micro is a boilerplate files to bootstrap static HTML creations, mostly focusing on static one to a couple of pages of microsites need. This is the workflow that I regularly use to make simple microsites, hope it would be useful to you too.

Boilerpat Micro contains:

* [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
* Bourbon
* Neat
* [Assemble](https://github.com/assemble/assemble/)

## Prerequisites
You'll need the following tools to get the full advantages of this workflow:

### Ruby
On OS X, you'll already have Ruby installed. On Windows, see http://rubyinstaller.org/downloads/.

### Sass and Compass

Make sure you have Ruby installed before this step.

Install Sass: http://sass-lang.com/tutorial.html.

Install Compass: http://compass-style.org/install/.

### Node.js
Install Node.js with npm (package manager for Node): http://nodejs.org/.

### Grunt
See http://gruntjs.com/getting-started.

    npm uninstall -g grunt
    npm install -g grunt-cli

After installing grunt-cli (Grunt's command line interface) globally, go to the
project folder and install all the dependencies listed in package.json. This will
install a local version of Grunt as well.

    npm install

## Quick start

Clone the git repo — 
	`git clone https://github.com/patvandiest/boilerpat-micro`

## Features

* HTML5 ready.
* Includes [Normalize.css](http://necolas.github.com/normalize.css/) for CSS normalizations and common bug fixes. (Included as an import).
* [jQuery](http://jquery.com/) via CDN, with a local fallback.
* [Modernizr](http://modernizr.com/) for feature detection.
* IE-specific classes for easier cross-browser control.
* Google Analytics template
* Includes [Bourbon](http://bourbon.io/) and [Neat](http://neat.bourbon.io/)
* [Assemble](https://github.com/assemble/assemble/) to build static files using handlebars and frontmatter 
* Includes a Grunt build system.


## Documentation

### Grunt

A grunt build system has been added to this project. There are two build systems.

* Development Server (grunt server) 
    - Build static HTML pages using Assemble
    - Compiles **SASS** for files in css/sass in to single expanded **main.css**
    - Runs JSHint on all JS files
* Final build (grunt)
    - Build static HTML pages using Assemble
    - Compiles SASS for files in css/sass in to single minified MAIN.CSS file.
    - Runs JSHint on all JS files, excluding files in the "vendor" directory.
    - Concatinates all JS files.
    - Uglifies concatinated js file.
    - Compresses JPG and PNG images.

For details about all the tasks and processes, see documentation in Gruntfile:
https://github.com/patvandiest/boilerpat-micro/blob/master/Gruntfile.js, and
other files.


