self.addEventListener("install", (evt) => {
    self.skipWaiting();
    evt.waitUntil(preLoad())

});


let buttonClickCounter = 23;



self.addEventListener("sync", (evt) => {
    console.log("SYNC EVENT", evt.tag);
    // if (evt.tag === "image-fetch") {
    //     evt.waitUntil(fetchImage());
    // }
})

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'news') {
        buttonClickCounter++;
        navigator.setAppBadge(buttonClickCounter);
        console.log('Fetching news in the background!');
        // event.waitUntil(fetchAndCacheNews());
    }
});


self.addEventListener("fetch", (evt) => {
    buttonClickCounter++;
    navigator.setAppBadge(buttonClickCounter).then(() => {
        console.log("Badge set to", buttonClickCounter);
    });
    console.log("HELLO")
    evt.respondWith(
        caches.match(evt.request).then(function (response) {
            if (response) {
                return response;
            } else {
                console.log("RESPONDING FROM FETCH")
                return fetch(evt.request).then(function (response) {
                    return caches.open("offline").then(function (cache) {
                        console.log("CACHING NEW REQUEST")
                        cache.put(evt.request.url, response.clone());
                        return response;
                    });
                });

            }

        })
    );
})


self.addEventListener("push", (evt) => {
    console.log("PUSH NOTIFICATION RECEIVED", evt.data.text());
    self.registration.showNotification("PUSH NOTIFICATION", {
        body: evt.data.text(),
    });
});

var preLoad = function () {
    console.log("INSTALLING WEB APPS...");

    return caches.open("offline").then(function (cache) {
        console.log("CACHING OFFLINE PAGE...");
        return cache.addAll([
            "/offline.html",
            "/styles.css",
            "/script.js",
        ]);
    });
}