describe('Initializing Testing Environment', function() {
  it('canary is passing', function() {
    expect(true).to.be.eql(true);
  });
});

describe('geolocation loading tests', function() {

  beforeEach(function() {
      navigator = {
      geolocation: {
        getCurrentPosition: function (locationInfo, locationInfoError) {
          locationInfo = undefined;
          locationInfoError = undefined;
    }}}
  });

  it('getGeoLocation displayLat innerHTML loading before location call', function() {
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);

    expect(displayLat.innerHTML).to.be.eql('loading...');
  });

  it('getGeoLocation displayLong innerHTML loading before location call', function() {
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);

    expect(displayLong.innerHTML).to.be.eql('loading...');
  });

  it('getGeoLocation displayAlt innerHTML loading before location call', function() {
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);

    expect(displayAlt.innerHTML).to.be.eql('loading...');
  });  
});

describe('geolocation hidden-data tests', function() { 
  beforeEach(function() {
    navigator = {
      geolocation: {
        getCurrentPosition: function (locationInfo, locationInfoError) {
          var position = {
            coords: {
              latitude: 95,
              longitude: 40,
              altitude: 0
            }
          }
          locationInfo(position);
    }}}
  });

  it('getGeoLocation hiddenLat returns correct data', function() {
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);
    expect(hiddenLat.value).to.be.eql(95);
  });

  it('getGeoLocation hiddenLong returns correct data', function() {
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);
    expect(hiddenLong.value).to.be.eql(40);
  });

  it('getGeoLocation hiddenAlt returns correct data', function() {
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);
    expect(hiddenAlt.value).to.be.eql(0);
  });
});

describe('geolocation error tests', function() { 
  beforeEach(function() {
    navigator = {
      geolocation: {
        getCurrentPosition: function (locationInfo, locationInfoError) {
          var error = {
            code: 'some error message'
          }
          locationInfoError(error);
    }}}
  });

  it('displayLat innerHTML is set to error received when error happens', function(){
    var displayLat = {innerHTML: 'loading...'};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);
    expect(displayLat.innerHTML).to.be.eql('error receiving location info.');
  });

  it('displayLong innerHTML is set to error received when error happens', function(){
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {innerHTML: 'loading...'};
    var hiddenLong = {};
    var displayAlt = {};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);
    expect(displayLong.innerHTML).to.be.eql('error receiving location info.');
  });

  it('displayLong innerHTML is set to error received when error happens', function(){
    var displayLat = {};
    var hiddenLat = {};
    var displayLong = {};
    var hiddenLong = {};
    var displayAlt = {innerHTML: 'loading...'};
    var hiddenAlt = {};

    getGeoLocation(displayLat, hiddenLat, displayLong, hiddenLong, displayAlt, hiddenAlt);
    expect(displayAlt.innerHTML).to.be.eql('error receiving location info.');
  });
});

describe('localStorage tests', function() {
  it('storeData stores a json object in localStorage', function() {
    var jsonData = {firstName: 'elon', lastName: 'musk', description: 'tony stark'};
    storeData(jsonData, jsonData.firstName + jsonData.lastName + jsonData.description);
    expect(JSON.parse(localStorage.getItem('elonmusktony stark'))).to.be.eql(jsonData);
  });
});

describe('Fill date input with todays date', function() {
  it('initialize date with today', function() {
    var date = {
      value: undefined
    };

    var today = new Date();
    var checkDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    getCurrentDate(date);
    
    expect(date.value).to.be.eql(checkDate);
  });
});


describe('Data caching tests', function() {
  it('sendCachedData makes a function call to $.ajax', function() {
    var functionCalled = false
    $ = {ajax: function(options) {functionCalled = true}};
    localStorage["key"] = "{}"
    sendCachedData("key", {}, {});
    expect(true).to.be.eql(functionCalled);
  });

  it('callSendCache calls sendCachedData', function() {
    var functionCalled = false;
    sendCachedData = function() {functionCalled = true};
    callSendCache("{}", {}, {})
    expect(true).to.be.eql(functionCalled)
  });
});

describe('Offline mode tests', function() {
  it('formatData takes an array of json objects and combines them into one formatted json object', function() {
    var data = [{name: 'firstName', value: 'Elon'}, {name: 'lastName', value: 'Musk'}]
    var formattedData = formatData(data);
    expect(formattedData.firstName).to.be.eql('Elon');
    expect(formattedData.lastName).to.be.eql('Musk');
  });

  it('initiateSuccessFunc returns a function that modifies a spanElement to display a given message', function() {
    var message = 'hello world!';
    var spanElement = {innerHTML: ''};
    $ = function(str) {
      return {val : function(str) {return true},
      html : function(str) {return true}}
    };
    var outputFunc = initiateSuccessFunc(spanElement, {});
    outputFunc(message);
    expect(message).to.be.eql(spanElement.innerHTML);
  });

  it('initiateErrorFunc returns a function that modifies a spanElement to display a the offline message', function() {
    var spanElement = {innerHTML: ''};
    $ = function(str) {
      return {
        val : function(str) {return true},
        html : function(str) {return true},
        ajax: function(options){return true} 
      }
    };
    sendCachedData = function() {};
    var outputFunc = initiateErrorFunc({}, spanElement, {});
    outputFunc('');
    expect('You appear offline. <br> Your work order has been saved locally. <br> Submission of work order will take place as soon as you come back online.').to.be.eql(spanElement.innerHTML);
  });

  it('ajaxCall makes a function call to $.ajax', function() {
    var functionCalled = false
    $ = {ajax: function(options) {functionCalled = true}};
    ajaxCall({}, {}, {});
    expect(true).to.be.eql(functionCalled);
  });
});

