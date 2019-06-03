chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
   chrome.declarativeContent.onPageChanged.addRules([{
     conditions: [new chrome.declarativeContent.PageStateMatcher({
       pageUrl: {schemes: ['https', 'http', 'localhost', 'chrome', 'file']},
     })
     ],
         actions: [new chrome.declarativeContent.ShowPageAction()]
   }]);
 });

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.token) {
      console.log(request.token);
      localStorage.setItem("jwt",request.token);
    }
});

  