var webPage = require('webpage');
var page = webPage.create();

var testindex = 0;
var loadInProgress = false;

// Page Settings
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;

// Phantom Settings
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

// Page Events
page.onLoadStarted = function() {
  loadInProgress = true;
};

page.onLoadFinished = function() {
  loadInProgress = false;
};

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

var steps = [
  function() {
    console.log('opening page...');
    page.open("http://troy-servis.arkenus.com/widget", function (status) {
      return status;
    });
  },

  function() {
    page.evaluate(function() {
      console.log('filling form...');

      var serviceNumber = "1611-40475";
      var serialNumber = "FL6RX7KEG8PM";

      document.getElementById("service_no").value = serviceNumber;
      document.getElementById("serial_no").value = serialNumber;
      document.getElementById("form_case_lookup").submit();
    });
  },

  function() {
    page.evaluate(function() {
      console.log('here is the result...');

      var result = document.getElementsByClassName("label")[0].innerHTML;
      console.log(result);

      var report = document.getElementsByClassName("col-md-12")[1].innerHTML;
      console.log(report);
    });
  },
];

function executeRequestsStepByStep() {
  if (loadInProgress == false && typeof steps[testindex] == "function") {
    steps[testindex]();
    testindex++;
  }

  if (typeof steps[testindex] != "function") {
    phantom.exit();
  }
}

interval = setInterval(executeRequestsStepByStep, 50);
