/*
 * This is the Hello World App demo that uses the Hello World Reporter and Observer Hyperties
 *
 */

/**
  *Some variables for flux control
  */
let RUNTIME;
let hypertyObserver = null;
let hypertyReporter = null;
const hypertyURI = (hyperty_domain, hyperty) => `hyperty-catalogue://catalogue.${hyperty_domain}/.well-known/hyperty/${hyperty}`;
let toHyperty = null;
let status = 0;
let sent = false;
let reporterLoaded = false;
let firstContactRemote = true;
let runtime_domain = 'hybroker.rethink.ptinovacao.pt';
let hyperty_domain = 'hybroker.rethink.ptinovacao.pt';

let config = {
  domain: hyperty_domain,
  development: false,
  runtimeURL: `hyperty-catalogue://catalogue.${runtime_domain}/.well-known/runtime/Runtime`
};

console.log('runtime config: ', config);

$(document).ready(function(){
    console.log( "ready!" );
    loadRuntime();
  });

/**
* Function to load the Runtime
*/

function loadRuntime()
{
  var start = new Date().getTime();
  //Rethink runtime is included in index.html
  rethink.default.install(config).then((runtime) => {
      RUNTIME = runtime
      var time = (new Date().getTime()) - start;
      $('.runtime-panel').append('<p>Runtime has been successfully launched in ' + time/1000 +' seconds</p>');
/*      let observerLoad = $('.observer-panel.load');
      let reporterLoad = $('.reporter-panel.load');

      let loadHyperties = '<a onclick="loadHypertyObs();" class="waves-effect waves-light btn center-align">Load Hello World Observer Hyperty</a>'+
      '<a onclick="loadHypertyRep();" class="waves-effect waves-light btn center-align">Load Hello World Reporter Hyperty</a>';

      collection.append(loadHyperties);

      collection.append('<p><a onclick="loadHypertyObs();" class="waves-effect waves-light btn">Load Hello World Observer Hyperty</a>');
      collection.append('<a onclick="loadHypertyRep();" class="waves-effect waves-light btn">Load Hello World Reporter Hyperty</a>');
      */
    });
}

/**
* Function to load the HelloWorldObserver Hyperty
*/

function loadHypertyObs()
{
  RUNTIME.requireHyperty(hypertyURI(hyperty_domain, 'HelloWorldObserver')).then((hyperty) => {
    console.log('[HelloWorldDemo.loadHypertyObs', hyperty);
    hypertyObserver = hyperty;
    $('.observer-info').append('<p>Deployed</p>');
    $('.load-observer').hide();
    hypertyDeployed(hypertyObserver);
    status++;
    enableSayHelloToLocal();
  });
}

/**
* Function to load the HelloWorldReporter Hyperty
*/

function loadHypertyRep(){
  RUNTIME.requireHyperty(hypertyURI(hyperty_domain, 'HelloWorldReporter')).then((hyperty) => {
    hypertyReporter = hyperty;
    console.log(hyperty);
    $('.reporter-info').append('<p>Deployed</p>');
    $('.load-reporter').hide();
    status++;
    if (! reporterLoaded) {
      $('.hello-panel').append('<p><a  onclick="fillSayHelloToRemoteHyperty();"  class="waves-effect waves-light btn center-align">Say Hello to a remote Hyperty</li></p>') ;
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
  console.log('[HelloWorldDemo.sayHelloToLocalHyperty] hello object: ', helloObject);
  $('.reporter-msg-panel').append('<p>'+helloObject.data.hello+'</p>');
  $('.hello-panel').hide();
    if (!sent) {
      let bye = $('.bye-panel');
      bye.append('<a  onclick="fillSayBye();"  class="waves-effect waves-light btn center-align">Say Bye</li>') ;
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
    let hello = $('.hello-panel');
    console.log('INNNNNNNNNNNNN');
    hello.append('<p><a  onclick="sayHelloToLocalHyperty();"  class="waves-effect waves-light btn center-align">Say hello to local Observer</li></p>') ;
  }
}
function sayHelloToRemoteHyperty(event) {
  event.preventDefault();
  console.log('event->',event);

  let toHypertyForm = $(event.currentTarget);

  toHyperty = toHypertyForm.find('.to-hyperty-input').val();

  console.log(toHyperty);

  hypertyReporter.instance.hello(toHyperty).then(function(helloObject) {
    $('.reporter-msg-panel').append('<p>'+ helloObject.data+'</p>');
    let hello = $('.hello-panel');
    hello.addClass('hide');
    let bye = $('.bye-panel');
    if (!sent) {
      bye.append('<a  onclick="fillSayBye();"  class="waves-effect waves-light btn center-align">Send Message to Remote Observer.</li>') ;
      sent = true;
    }
  }).catch(function(reason) {
    console.error(reason);
  });
}

function fillSayBye(){

  let bye = $('.bye-panel');

  let say_bye = $('.say-bye');

//  if (say_bye.length > 0) {
    //  $('btn-bye').hide();
  //} else {
    let sayBye = '<form class="say-bye"> Message to Send: <input class="to-msg-input" type="text" name="toBye"><br><input type="submit" value="Send"></form>'
    bye.append(sayBye);
    $('.say-bye').on('submit', sayByeToHyperty);
//  }
}

function sayByeToHyperty(event) {

  event.preventDefault();

  console.log('event->',event);

  let msgToSend = $(event.currentTarget).find('.to-msg-input').val();

  console.log('dsadasd', msgToSend);
  let bye = $('.bye-panel');
  //bye.addClass('hide');
  hypertyReporter.instance.bye(msgToSend);
  $('.reporter-msg-panel').append('<p>'+msgToSend+'</p>');
  $('.to-msg-input')[0].reset();
}

/**
  * Call back after hyperty is loaded
  */
function hypertyDeployed(result) {
  let hypertyObserver;

  hypertyObserver = result.instance;

  console.log('[HelloWorldDemo.hypertyDeployed] ',hypertyObserver);

  $('.selection-panel').hide();

  $('.observer-info').append('<p>URL: ' + result.runtimeHypertyURL + '</p>');

  // Add an invitation Callback
  hypertyObserver.addEventListener('invitation', function(identity) {

    console.log('[HelloWorldDemo] Invitation received from:', JSON.stringify(identity));

    $('.observer-evt').append('<p>Invitation Received from:' + identity.userProfile.username + '</p>');


  });


  hypertyObserver.addEventListener('hello', function(event) {

    console.log('[HelloWorldDemo] Hello received from:', event.hello);

    $('.observer-msg-panel').append('<p>' + event.hello + '</p>');

  });

  console.log('Observer Waiting for Hello!!');

}
