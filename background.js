chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  console.log(JSON.stringify(details));
  return details;
},
{urls: [ "https://mail-attachment.googleusercontent.com/" ]},["requestHeaders", "blocking"]);
