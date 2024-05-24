self.addEventListener("push", function (e) {
    console.log(e.data)

    self.registration.showNotification("Hello", {
        body: e.data,
    });
})

let counter = 0;

self.addEventListener("install", (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open("VERSION_1").then((cache) => {
            console.log("Caching Files...")
            return cache.addAll(["index.html", "icon.png", "my_world.html"])
        }).then(() => {
            fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
                return caches.open("VERSION_1").then((cache) => {
                    return cache.put("https://jsonplaceholder.typicode.com/posts", res.clone())
                })
            })


        })

    )

})



self.addEventListener("activate", (e) => {
    console.log("Service Worker Activated")
    // e.waitUntil(
    //     caches.keys().then((cacheNames) => {
    //         return Promise.all(
    //             cacheNames.forEach((cache) => {
    //                 if (cache != "VERSION_1") {
    //                     return caches.delete(cache)
    //                 }
    //             })
    //         )
    //     })
    // )
})

self.addEventListener("fetch", (e) => {

    if (e.request.method === "POST") {
        console.log("WE ARE NOT CACHING AS IT IS NOT A GET REQUEST")
        return;
    }

    counter++;
    console.log(e);
    console.log("INTERCEPTED ", counter);
})


function getAll() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
        })
}


self.addEventListener("sync", (event) => {
    if (event.tags == "sync-event") {
        event.waitUntil(getAll())
    }
})