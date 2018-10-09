/* Set up our service worker for the project */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => {
      console.log("Service worker registration successful: " + reg.scope);
    })
    .catch(error => {
      console.log("Registration failed: " + error);
    });
}
