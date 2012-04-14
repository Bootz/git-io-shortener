var GitIOPopup = new (function() {
  var text_field = document.getElementById("shortened-url");
  var message_container = document.getElementById("message");

  this.getShortenedUrl = function() {

    // XXX: tabs.getSelected is a private API.
    // dirty, but works.
    chrome.tabs.getSelected(null, function(tab) {

      var request_data = {
        "command": "generate",
        "params": {
          "url": tab.url
        }
      };

      chrome.extension.sendRequest(request_data, function(data) {
        if (data.status === "OK") {
          setTextField(data.shortened_url);
          setMessage("Generated.");
        } else {
          setMessage(data.error.message);
        }
      });
    });
  };

  var setTextField = function(text) {
    text_field.value = text;
  };

  var setMessage = function(message) {
    message_container.innerText = message;
  };
})();