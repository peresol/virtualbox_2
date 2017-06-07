// replace these values with those generated in your TokBox Account
var apiKey = 45885442;
var sessionId = '2_MX40NTg4NTQ0Mn5-MTQ5Njg0NDE2ODI3M35aNTBXYWdmS1k5NlZyTU9Ma0xVVTlnUFl-fg';
var token = 'T1==cGFydG5lcl9pZD00NTg4NTQ0MiZzaWc9MmUxZjY3NDI0NTNkNTQzMjk2YzdhZmRkMTNjZTNlMWVkNTVmYjAxYzpzZXNzaW9uX2lkPTJfTVg0ME5UZzROVFEwTW41LU1UUTVOamcwTkRFMk9ESTNNMzVhTlRCWFlXZG1TMWs1TmxaeVRVOU1hMHhWVlRsblVGbC1mZyZjcmVhdGVfdGltZT0xNDk2ODQ0MjE2Jm5vbmNlPTAuNjIzOTkyMDc5NjY2ODcwOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDk2ODQ3ODE1';

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
    var SERVER_BASE_URL = 'https://fast-river-83202.herokuapp.com';
    fetch(SERVER_BASE_URL + '/session').then(function(res) {
      return res.json()
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      initializeSession();
    }).catch(handleError);


function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
