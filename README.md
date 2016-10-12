


# Hello World: first reThink application
This example is a standalone application that aims to illustrate the basics of Hyperty concept and the way it works.


## Prerequisite

This application is based on the Hello World hyperties, that have to be already deployed in a catalogue. In this case we are using the catalogue of hybroker.rethink.ptinovacao.pt domain, and the Hyperties we use in this App are HelloWorldReporter and HelloWorldObserver. Thus the Catalogue URLs for these Hyperties are:

https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/HelloWorldReporter  
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/HelloWorldObserver  

For the Web application HelloWorld you just need a web server.  

This example is written in ECMA5 and does not need any transformation to run on a browser.

## Functions
This Example will show you:  
 * How to load a runtime (proviously deployed on a catalogue server)  
 * How to load an hyperty (Authentication mandatory)  
 * How to contact another Hyperty to send "HelloWorld" thanks to its Hyperty URL .   

Files included:
index.html :main page  
helloWorldHypertyClient.js : javascript that manage the Hyperties in the application  
system.config.json : configuration file that has to be modified to make the service run. It includes the domain name for catalogue and runtime.

# Available Hyperties to be used by Apps

## Connector Hyperty

Hyperty to Handle WebRTC sessions.

Catalogue URL:
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/Connector

Documentation:
https://github.com/reTHINK-project/dev-hyperty/blob/master/docs/connector/readme.md

## Group Chat Manager Hyperty

Hyperty to handle Group Chats.

Catalogue URL:
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/GroupChatManager

Documentation:
https://github.com/reTHINK-project/dev-hyperty/blob/master/docs/group-chat-manager/readme.md

## Group Chat Hyperty

Another Hyperty to handle Group Chats.

Catalogue URL:
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/GroupChat

Documentation:
https://github.com/reTHINK-project/dev-hyperty/blob/master/docs/group-chat/readme.md

## Bracelet Hyperty

IoT (Internet of Things) related Hyperty that receives data from a BraceletSensorReporter running in a Smartphone connected to the Bracelet.

Catalogue URL:
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/BraceletSensorObserver

Documentation:
https://github.com/reTHINK-project/dev-hyperty/blob/master/docs/bracelet/readme.md

## Location Hyperty

Provides the Location of a user.

Catalogue URL:
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/Location

Documentation:
https://github.com/reTHINK-project/dev-hyperty/blob/master/docs/location/readme.md

## User Status (Presence) Hyperty

Provides the Prseence Status of a user.

Catalogue URL:
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/UserStatus

Documentation:
https://github.com/reTHINK-project/dev-hyperty/blob/master/docs/user-status/readme.md

## DT WebRTC Hyperty

Another Hyperty to Handle WebRTC sessions.

Catalogue URL:
https://catalogue.hybroker.rethink.ptinovacao.pt/.well-known/hyperty/dtwebrtc

Documentation:
*to be provided*
