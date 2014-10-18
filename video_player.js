// This is allowed.
chrome.webRequest.onBeforeRequest.addListener(
    function(object details) {

    }, {urls: ["https://mail-attachment.googleusercontent.com/attachment/*"]},
    ["requestHeaders"]);
