chrome.webRequest.onHeadersReceived.addListener(
    function(response){
        console.log(response);
        var headers = response.responseHeaders;
        var isVideo = false;
        var video = {
            mimeType: '',
            url: '',
            filename: ''
        }
        for(var i = 0; i < headers.length; i++) {
            var header = headers[i];
            switch(header.name) {
            case 'content-type':
                if (/video\//.test(header.value)) {
                    isVideo = true;
                    video.mimeType = header.value;
                } else {
                    return response;
                }
                break;
            case 'content-disposition':
                video.filename = header.value.replace(/.*filename=\"([^\\]+)\".*/, '$1');
            }
        }
        if (isVideo) {
            video.url = response.url;
            // Set as 204 no content, this doesn't curently work, find out another way.
            response.responseHeaders = [{name: 'status', value: '204 No Content'}];
            response.statusLine = 'HTTP/1.1 204 No Content';
            console.log('Modified response', response);
            console.log('Sending tab', response.tabId, 'video request',  video);
            chrome.tabs.sendMessage(response.tabId, video, null);
        }
        return response;
    },
    {
        urls: [ "https://mail-attachment.googleusercontent.com/*" ]
    },
    ["responseHeaders", "blocking"]);
