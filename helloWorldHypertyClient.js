/*
 * This file loads the Hyperty deployed on the catalogue
 *
 *
 */


let RUNTIME;

let domain = 'hybroker.rethink.ptinovacao.pt';
let hypertyObserver = null;
let hypertyReporter = null;
let runtimeURL = `hyperty-catalogue://catalogue.${domain}/.well-known/runtime/Runtime`;
const hypertyURI = (domain, hyperty) => `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/${hyperty}`;
let toHyperty = null;
/**
 * Loads Hyperty Runtime
 */
let status = 0;
let sent = false;
let reporterLoaded = false;
let firstContactRemote = true;
function loadRuntime()
{
  var start = new Date().getTime();
  //Rethink runtime is included in index.html
  rethink.default.install({
    domain: domain,
    development: false,
    runtimeURL: runtimeURL
    }).then((runtime) => {
      RUNTIME = runtime
      var time = (new Date().getTime()) - start;
      $('.runtime-panel').append('<p>Runtime has been successfully launched in ' + time/1000 +' seconds</p>');
      let collection = $('.collection');
      collection.append('<a onclick="loadHypertyObs();" class="collection-item">How to load an Observer hyperty (Authentication mandatory)</li>') ;
      collection.append('<a onclick="loadHypertyRep();" class="collection-item">How to load a Reporter hyperty (Authentication mandatory)</li>') ;
    });
}

function loadHypertyObs()
{
  RUNTIME.requireHyperty(hypertyURI(domain, 'HelloWorldObserver')).then((hyperty) => {
    console.log('hyperty', hyperty);
    hypertyObserver = hyperty;
    $('.runtime-panel').append('<p><b>'
    +' Event: Hyperty '+hyperty.name+' Deployed<br>'+
    '<hr style="border:1px solid;"/></b></p>');
    hypertyDeployed(hypertyObserver);
    status++;
    enableSayHelloToLocal();
  });
}

function loadHypertyRep(){
  RUNTIME.requireHyperty(hypertyURI(domain, 'HelloWorldReporter')).then((hyperty) => {
    hypertyReporter = hyperty;
    console.log(hyperty);
    $('.runtime-panel').append('<p><b>'
    +' Event: Hyperty '+hyperty.name+' Deployed<br>'+
    '<hr style="border:1px solid;"/></b></p>');
    status++;
    if (! reporterLoaded) {
      let collection = $('.collection');
      collection.append('<a  onclick="fillSayHelloToRemoteHyperty();"  class="collection-item">How to say Hello to a remote Hyperty</li>') ;
      reporterLoaded = true;
    }
  enableSayHelloToLocal();

  });
}

function sayHelloToLocalHyperty()
{
  console.log('Saying Hello');
  hypertyReporter.instance.hello(hypertyObserver.runtimeHypertyURL).then(function(helloObject) {
  toHyperty = hypertyObserver.runtimeHypertyURL;
  $('.runtime-panel').append('<p><b>'
  +' Event: Hello sent to Local Hypperty <br>'+
  '<hr style="border:1px solid;"/></b></p>');
  $('.runtime-panel').append('<p>Observer Url to send Hello: '+ toHyperty+'</p>');
    if (!sent) {
      let collection = $('.collection');
      collection.append('<a  onclick="sayByeToHyperty();"  class="collection-item">How to say bye to Observer Hyperty</li>') ;
      sent = true;
    }
  }).catch(function(reason) {
    console.error(reason);
  });
}

function fillSayHelloToRemoteHyperty()
{
  let hello = $('.hello-panel');

  if(firstContactRemote) {
    let sayHelloTo = '<form class="say-hello"> Hyperty URL: <input class="to-hyperty-input" type="text" name="toHyperty"><br><input type="submit" value="Say Hello"></form>'

    hello.append(sayHelloTo);

    $('.say-hello').on('submit', sayHelloToRemoteHyperty);
    firstContactRemote = false;
  }
  else {
    hello.removeClass('hide');
  }

}

function enableSayHelloToLocal()
{
  console.log('status', status);
  if (status === 2) {
    let collection = $('.collection');
    console.log('INNNNNNNNNNNNN');
    collection.append('<a  onclick="sayHelloToLocalHyperty();"  class="collection-item">How to say hello to a local Hyperty</li>') ;
  }
}
function sayHelloToRemoteHyperty(event) {
  event.preventDefault();
  console.log('event->',event);

  let toHypertyForm = $(event.currentTarget);

  toHyperty = toHypertyForm.find('.to-hyperty-input').val();

  console.log(toHyperty);

  hypertyReporter.instance.hello(toHyperty).then(function(helloObject) {
    $('.runtime-panel').append('<p><b>'
    +' Event: Hello sent to Remote Hyperty <br>'+
    '<hr style="border:1px solid;"/></b></p>');
    $('.runtime-panel').append('<p>Observer Url: '+ toHyperty+'</p>');
    let collection = $('.collection');
    let hello = $('.hello-panel');
    hello.addClass('hide');
    if (!sent) {
      collection.append('<a  onclick="sayByeToHyperty();"  class="collection-item">How to say Bye to a Hyperty.</li>') ;
      sent = true;
    }
  }).catch(function(reason) {
    console.error(reason);
  });
}
function sayByeToHyperty() {

  hypertyReporter.instance.bye();
  $('.runtime-panel').append('<p><b>'
  +' Event: Bye sent to Hypperty <br>'+
  '<hr style="border:1px solid;"/></b></p>');
  $('.runtime-panel').append('<p>HypertyUrl to receive Bye: '+toHyperty+'</p>');
}

/**
  * Call back after hyperty is loaded
  */
function hypertyDeployed(result) {
  let hypertyObserver;

  hypertyObserver = result.instance;

  console.log(hypertyObserver);

  $('.selection-panel').hide();

  $('.runtime-panel').append('<p>Hyperty Observer URL: ' + result.runtimeHypertyURL + '</p>');

  // Add an invitation Callback
  hypertyObserver.addEventListener('invitation', function(identity) {

    JSON.stringify(identity);

    console.log('Hello event received from:', identity);

    $('.runtime-panel').append('<p><b>'
    +' Event: Observer Hyperty - Invitation Received <br>'+
    '<hr style="border:1px solid;"/></b></p>');
    $('.runtime-panel').append('<p> Invitation received from:' + identity.userProfile.username + '</p>');


  });


  hypertyObserver.addEventListener('hello', function(event) {

    $('.runtime-panel').append('<p><b>'
    +' Event: Observer Hyperty - Hello Event Received <br>'+
    '<hr style="border:1px solid;"/></b></p>');
    console.log('Hello event received:', event);

    $('.runtime-panel').append('<p> Message:' + event.hello + '</p>');

  });

  console.log('Observer Waiting for Hello!!');

}
