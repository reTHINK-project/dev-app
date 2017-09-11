/*
 * This is the Hello World App demo that uses the Hello World Reporter and Observer Hyperties
 *
 */

let RUNTIME;
let hypertyObserver = null;
let hypertyReporter = null;
const hypertyURI = (hyperty_domain, hyperty) => `hyperty-catalogue://catalogue.${hyperty_domain}/.well-known/hyperty/${hyperty}`;
let runtime_domain = 'hybroker.rethink.ptinovacao.pt';
let hyperty_domain = 'hybroker.rethink.ptinovacao.pt';

let config = {
  domain: hyperty_domain,
  development: false,
  runtimeURL: `hyperty-catalogue://catalogue.${runtime_domain}/.well-known/runtime/Runtime`
};

console.log('runtime config: ', config);

$(document).ready(function(){
  $('.load-reporter').hide();
  $('.load-observer').hide();
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
      $('.load-reporter').show();

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
    enableSayHelloToLocal();
  });
}

/**
* Function to load the HelloWorldReporter Hyperty
*/

function loadHypertyRep(){
  RUNTIME.requireHyperty(hypertyURI(hyperty_domain, 'HelloWorldReporter')).then((hyperty) => {
    hypertyReporter = hyperty;
    console.log('[HelloWorldDemo.loadHypertyRep] loaded: ',hyperty);
    $('.reporter-info').append('<p>Deployed</p>');
    $('.load-reporter').hide();
    $('.load-observer').show();
    $('.reporter-info').append('<p>URL: ' + hyperty.runtimeHypertyURL + '</p>');

  });
}

function sayHelloToLocalHyperty()
{
  console.log('Saying Hello');
  hypertyReporter.instance.hello(hypertyObserver.runtimeHypertyURL).then(function(helloObject) {
    console.log('[HelloWorldDemo.sayHelloToLocalHyperty] hello object: ', helloObject);
    $('.reporter-msg-panel').append('<p>'+helloObject.data.hello+'</p>');
    $('.hello-panel').hide();
    let bye = $('.bye-panel');
    bye.append('<a  onclick="fillSayBye();"  class="waves-effect waves-light btn center-align">Say Bye</li>') ;
  }).catch(function(reason) {
    console.error(reason);
  });
}


function enableSayHelloToLocal()
{
  console.log('status', status);
  let hello = $('.hello-panel');
  hello.append('<p><a  onclick="sayHelloToLocalHyperty();"  class="waves-effect waves-light btn center-align">Say hello</li></p>') ;
}


function fillSayBye(){

  let bye = $('.bye-panel');

  let say_bye = $('.say-bye');

  if (say_bye.length > 0) {
      $('btn-bye').hide();
  } else {
    let sayBye = '<form class="say-bye"> Message to Send: <input class="to-msg-input" type="text" name="toBye"><br><input type="submit" value="Send"></form>'
    bye.append(sayBye);
    $('.say-bye').on('submit', sayByeToHyperty);
  }
}

function sayByeToHyperty(event) {

  event.preventDefault();

  console.log('event->',event);

  let msgToSend = $(event.currentTarget).find('.to-msg-input').val();

  let bye = $('.bye-panel');
  bye.addClass('hide');
  hypertyReporter.instance.bye(msgToSend);
  $('.reporter-msg-panel').append('<p>'+msgToSend+'</p>');
}

/**
  * Call back after hyperty is loaded
  */
function hypertyDeployed(result) {
  let hypertyObserver;

  hypertyObserver = result.instance;

  console.log('[HelloWorldDemo.hypertyDeployed] ',hypertyObserver);

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
