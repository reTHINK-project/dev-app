


# Hello World : first reThink application
This example is a simple application that aims to illustrate the basics steps on how to use Hyperties.


## Prerequisite

This application uses the Hello World Hyperties, that have to be already deployed in a catalogue. In this case we are using the catalogue of hybroker.rethink.ptinovacao.pt domain, and the Hyperties we use in this App are HelloWorldReporter and HelloWorldObserver. Thus the Catalogue URLs for these Hyperties are:

https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/HelloWorldReporter  
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/HelloWorldObserver  

For the Web application HelloWorld you just need a web server e.g. you can use NodeJS http-server:

Install with npm:

`npm install http-server -g`

execute:

`http-server`

This example is written in ECMA5 and does not need any transformation to run on a browser.

## Functions
This Example will show you:  
 * How the Runtime is loaded (which is also published on `hybroker.rethink.ptinovacao.pt` catalogue server)  
 * How Hyperties are instantiated and associated with an identity selected by the user  
 * How to synchronise a simple `Hello` data object between the HelloWorldReporter Hyperty and the HelloWorldObserver Hyperty.   

Files included:

* index.html :main page  
* helloWorldHypertyClient.js : javascript that manage the Hyperties in the application  
